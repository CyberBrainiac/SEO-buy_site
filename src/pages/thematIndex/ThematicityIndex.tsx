import React, { FormEvent, useState, useReducer, useEffect, useRef } from 'react';
import { ButtonCommon } from '@/components/buttons/Buttons';
import style from './thematicityIndex.module.scss';
import InputFile from '@/components/inputFile/InputFile';
import fileExcel from '@/pages/thematIndex/fileExcel';
import calcThematicityIndex from '@/pages/thematIndex/calcThematicityIndex';
import UnvalidValueError from '@/utils/errorHandlers/unvalidValueError';
import reducerExelData from './reducerExelData';
import locStorage, { locKeys } from '@/utils/localStorage';
import fireStore from '@/services/fireStore';
import { useSelector } from 'react-redux';
import { selectUser } from '@/containers/reducers/userSlice';

const ThematicityIndex: React.FC = () => {
  const userProfile = useSelector(selectUser);
  const [excelData, dispatchExcelData] = useReducer(reducerExelData, null);

  const [upLoadedFile, setUpLoadedFile] = useState<File | null>(null);
  const [fileBinaryData, setFileBinaryData] = useState<ArrayBuffer | null>(null);
  const [logProgress, setLogProgress] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isToolRun, setToolRun] = useState(false);

  const isUserUseTool = useRef(false);
  const userQuery = useRef('');

  //get previous calculation result
  useEffect(() => {
    if (!excelData) {
      const data = locStorage.get(locKeys.excelData);
      let savedQuery = locStorage.get(locKeys.userQuery);

      if (!data) return;
      if (!savedQuery) savedQuery = { query: '' };

      dispatchExcelData({ type: 'SET', excelData: data });
      userQuery.current = savedQuery.query;
      return;
    }

    setToolRun(false);
    if (!isUserUseTool.current) return; // check 1 load, if data empty this is first load and not need to set data in storage
    locStorage.set(locKeys.excelData, excelData);
    locStorage.set(locKeys.userQuery, { query: userQuery.current });
  }, [excelData]);

  //
  const handleFileUpload = (file: File) => {
    const reader = new FileReader();

    //Create binary ArrayBuffer
    reader.onload = onReady => {
      const buffer = onReady.target?.result as ArrayBuffer;
      setFileBinaryData(buffer);
      readBuffer(buffer);
    };
    reader.onerror = error => {
      console.error('Error in File Reader', error);
    };

    if (!file) {
      alert("Please, provide Excel file with correct extension: 'example.xlsx'");
      return null;
    }

    setUpLoadedFile(file);
    reader.readAsArrayBuffer(file);
  };

  //
  const readBuffer = async (buffer: ArrayBuffer) => {
    const data = await fileExcel.read(buffer);
    console.log(data);

    if (!data) {
      console.error('Can`t read buffer data');
      return null;
    }
    dispatchExcelData({ type: 'SET', excelData: data });
  };

  //Create new Excel file
  const handleLoadResult = async () => {
    if (!excelData) {
      alert('Upload your file.xlsx or use Example file');
      return null;
    }
    if (!fileBinaryData) {
      alert(
        'Upload Example.xlsx or similar file to load previous result index thematicity calculation'
      );
      return null;
    }

    if (!isUserUseTool.current) {
      fileExcel.write({
        file: fileBinaryData,
        excelData: locStorage.get(locKeys.excelData),
        query: userQuery.current,
      });
      return;
    }

    fileExcel.write({
      file: fileBinaryData,
      excelData: excelData,
      query: userQuery.current,
    });
  };

  //
  const handleCreateExample = () => {
    fileExcel.createExample();
  };

  //
  const progressHandler = (value: string) => {
    setLogProgress(value);
  };

  //
  const errorHandler = (errorMessage: string) => {
    setErrorMessage(errorMessage);
  };

  //Calculate Thematicity Index
  const formHandler = async (event: FormEvent) => {
    event.preventDefault();
    setErrorMessage('');

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    let inputKeyword = formData.get('request');

    if (typeof inputKeyword !== 'string') {
      throw new UnvalidValueError("expected type for user inputKeyword is 'string'");
    }
    inputKeyword = inputKeyword.trim();

    if (!inputKeyword) {
      alert('Empty request detected');
      return;
    }

    //Note: The limit on the length of the search request should be within 2048 characters.
    if (inputKeyword.length > 2000) {
      alert('too many words');
      return null;
    }
    const request = `intitle:"${inputKeyword}"`;

    if (!excelData || !fileBinaryData) {
      alert('First upload your file.xlsx \n\rYou can use example.xlsx for correct data structure');
      return null;
    }

    if (!userProfile) {
      alert('First you need to register');
      return null;
    }

    const currentRequestCount = (() => {
      return excelData.urlObjects.reduce((sum, urlObj) => {
        if (urlObj.url === '') return sum;
        return ++sum;
      }, 0);
    })();

    const modifyResult = await fireStore.modifyUserBalance({
      userProfile: userProfile,
      requestCount: currentRequestCount,
    });

    if (!modifyResult) {
      return null;
    }

    setToolRun(true);
    isUserUseTool.current = true;
    userQuery.current = inputKeyword;

    const resultURLObjects = await calcThematicityIndex({
      arrURL_objects: excelData.urlObjects,
      query: request,
      onUpdate: progressHandler,
      onError: errorHandler,
    });

    dispatchExcelData({ type: 'MODIFY', urlObjects: resultURLObjects });
  };

  const userInf = userProfile ? (
    <>
      <div className={style.userInf__freeReq}>
        You have: {userProfile.freeRequest} free calculations
      </div>
      <div className={style.userInf__walletBal}>Wallet balance: {userProfile.walletBalance}$</div>
    </>
  ) : (
    <div className={style.userInf__unAuthMessage}>
      Sign up now and get 20 free thematicity index calculation per day!
    </div>
  );

  return (
    <section className="thematicityIndex">
      <div className={style.container}>
        <div className={style.userInf}>{userInf}</div>

        <InputFile onFileUpload={handleFileUpload} />
        <aside className={style.acceptedFiles}>
          <div className={style.acceptedDescription}>
            {upLoadedFile ? <p>{`Uploaded file: ${upLoadedFile?.name}`}</p> : null}
          </div>
        </aside>

        <form onSubmit={formHandler} className={style.form}>
          <div className={style.formContainer}>
            <label htmlFor="ThemIndRequest">Write keyword or theme</label>
            <input
              id="ThemIndRequest"
              name="request"
              type="text"
              className={style.formInput}
              placeholder="koala"
              required
            />
            <ButtonCommon
              className={isToolRun ? style.formBtn_active : ''}
              type="submit"
              text={isToolRun ? 'Index Is Calculated' : 'Get Thematicity Index'}
            />
          </div>
        </form>

        <div className={style.errorContainer}>{errorMessage}</div>
        <div className={style.logContainer}>{logProgress}</div>
        <div className={style.loadBtnContainer}>
          <ButtonCommon onClick={handleCreateExample} text={'Download Example'} />
          {isUserUseTool.current ? (
            <ButtonCommon
              id="buttonLoadIndexThemat"
              onClick={handleLoadResult}
              text="Load Result"
            />
          ) : !locStorage.get(locKeys.excelData) ? null : (
            <ButtonCommon
              id="buttonLoadIndexThemat"
              onClick={handleLoadResult}
              text="Load Previous Result"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default ThematicityIndex;
