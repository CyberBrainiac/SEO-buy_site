import React, { FormEvent, useState } from 'react';
import style from './linkInsertion.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectLinkInsertionRequest,
  selectLinkInsertionStatus,
  setRequestLinkInsertion,
  setStatusLinkInsertion,
  toolStatusValues,
} from '@/containers/reducers/toolsSlice';
import { AppDispatch } from '@/containers/storeRedux';
import { InputData, addInputData, selectInputData } from '@/containers/reducers/inputDataSlice';
import { selectUser, setInformMessage } from '@/containers/reducers/userSlice';
import { ButtonCommon } from '@/components/buttons/Buttons';
import InputFile from '@/components/inputFile/InputFile';
import fileExcel from '../../utils/fileExcel';
import fireStore from '@/services/fireStore';
import getLinkInsertion from './getLinkInsertion';

const LinkInsertion: React.FC = () => {
  const dispatch = useDispatch() as AppDispatch;
  const inputData = useSelector(selectInputData) as InputData[];
  const userProfile = useSelector(selectUser);
  const toolStatus = useSelector(selectLinkInsertionStatus);
  const userQuery = useSelector(selectLinkInsertionRequest);
  const [upLoadedFile, setUpLoadedFile] = useState<File | null>(null);
  const [logProgress, setLogProgress] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  //
  const handleFileUpload = (file: File) => {
    const reader = new FileReader();

    //Create binary ArrayBuffer
    reader.onload = onReady => {
      const buffer = onReady.target?.result as ArrayBuffer;
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

  //Read Excel file
  const readBuffer = async (buffer: ArrayBuffer) => {
    const data = await fileExcel.read(buffer);

    if (!data) {
      console.error('Can`t read buffer data');
      return null;
    }
    dispatch(addInputData(data));
  };

  //Write new Excel file
  const handleLoadResult = async () => {
    if (!inputData) {
      alert('Upload your file.xlsx or use Example file');
      return null;
    }

    fileExcel.write({ inputData: inputData, query: userQuery, toolName: 'LinkInsertion' });
  };

  //
  const handleCreateExample = () => {
    fileExcel.createExample();
  };

  const formHandler = async (event: FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    let inputKeyword = formData.get('request') as string;
    inputKeyword = inputKeyword.trim();

    if (!inputData) {
      alert('First upload your file.xlsx \n\rYou can use example.xlsx for correct data structure');
      return null;
    }
    if (!userProfile) {
      alert('First you need to register');
      return null;
    }
    if (!inputKeyword) {
      alert('Empty request detected');
      return;
    }

    //Note: The limit on the length of the search request should be within 2048 characters.
    if (inputKeyword.length > 2000) {
      alert('too many words');
      return null;
    }

    const request = `"${inputKeyword}"`;
    dispatch(setRequestLinkInsertion(request));
    const currentRequestCount = inputData.length;
    dispatch(setStatusLinkInsertion(toolStatusValues.Working));

    const modifyResult = await fireStore.modifyUserBalance({
      userProfile: userProfile,
      requestCount: currentRequestCount,
      toolName: 'LinkInsertion',
    });

    if (!modifyResult) {
      return null;
    }

    const calculatedData = await getLinkInsertion({
      inputDataArr: inputData,
      query: request,
      onUpdate: progressHandler,
      onError: errorHandler,
    });

    if (!calculatedData) return undefined;
    dispatch(addInputData(calculatedData));
    dispatch(setStatusLinkInsertion(toolStatusValues.Idle));
    dispatch(setInformMessage('Successfully done'));
  };

  //
  const progressHandler = (value: string) => {
    setLogProgress(value);
  };

  //
  const errorHandler = (errorMessage: string) => {
    setErrorMessage(errorMessage);
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
    <section className="linkInsertion">
      <div className={style.container}>
        <h1 className={style.mainHeading}>Link Insertion Tool</h1>
        <div className={style.userInf}>{userInf}</div>

        <InputFile onFileUpload={handleFileUpload} />
        <aside className={style.acceptedFiles}>
          <div className={style.acceptedDescription}>
            {upLoadedFile ? <p>{`Uploaded file: ${upLoadedFile?.name}`}</p> : null}
          </div>
          <ButtonCommon
            className={style.exampleBtn}
            onClick={handleCreateExample}
            text={'Load Example'}
          />
        </aside>

        <form onSubmit={formHandler} className={style.form}>
          <div className={style.formContainer}>
            <label className={style.formLabel} htmlFor="ThemIndRequest">
              Write keyword
            </label>
            <input
              id="ThemIndRequest"
              name="request"
              type="text"
              className={style.formInput}
              placeholder="koala"
              required
            />
            <ButtonCommon
              className={toolStatus === toolStatusValues.Working ? style.formBtn_active : ''}
              type="submit"
              text={
                toolStatus === toolStatusValues.Working
                  ? 'Index Is Calculated'
                  : 'Get Link Insertion'
              }
            />
            <ButtonCommon
              type='button'
              className={style.loadBtn}
              id="buttonLoadIndexThemat"
              onClick={handleLoadResult}
              text="Load Result"
            />
          </div>
        </form>
        <div className={style.logContainer}>{logProgress}</div>
        <div className={style.errorContainer}>{errorMessage}</div>
      </div>
    </section>
  );
};

export default LinkInsertion;

// NotServedByPagesError
