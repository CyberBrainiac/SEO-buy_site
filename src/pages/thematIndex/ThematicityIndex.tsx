import React, { FormEvent, useEffect, useState } from 'react';
import { ButtonCommon } from '@/components/buttons/Buttons';
import style from './thematicityIndex.module.scss';
import InputFile from '@/components/inputFile/InputFile';
import fileExcel from '@/utils/fileExcel';
import calcThematicityIndex from '@/pages/thematIndex/calcThematicityIndex';
import fireStore from '@/services/fireStore';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setInformMessage } from '@/containers/reducers/userSlice';
import { AppDispatch } from '@/containers/storeRedux';
import {
  InputData,
  addInputData,
  selectFileName,
  selectInputData,
} from '@/containers/reducers/inputDataSlice';
import {
  selectIndexThematicityRequest,
  selectIndexThematicityStatus,
  setRequestIndexThematicity,
  setStatusIndexThematicity,
  toolStatusValues,
} from '@/containers/reducers/toolsSlice';

const ThematicityIndex: React.FC = () => {
  const [logProgress, setLogProgress] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const dispatch = useDispatch() as AppDispatch;
  const userProfile = useSelector(selectUser);
  const inputData = useSelector(selectInputData) as InputData[];
  const userQuery = useSelector(selectIndexThematicityRequest) as string;
  const toolStatus = useSelector(selectIndexThematicityStatus);
  const loadedFileName = useSelector(selectFileName);

  useEffect(() => {
    document.title = 'Enhance SEO Precision with Thematic Domain Indexing | SEO-Buy';
    const newMetaDescription = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement;

    if (newMetaDescription) {
      newMetaDescription.content = `Empower your SEO strategy with Thematic Domain Indexing – a tool that calculates thematic indices for precise link placements, optimizing your website's visibility and organic growth.`;
    }
  }, []);

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
    if (!inputData.length) {
      alert('Upload your file.xlsx or use Example file');
      return null;
    }

    fileExcel.write({ inputData: inputData, query: userQuery, toolName: 'IndexThematicity' });
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
    setErrorMessage(null);
    setLogProgress(null);

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    let inputKeyword = formData.get('request') as string;
    inputKeyword = inputKeyword.trim();

    if (!inputKeyword) {
      alert('Empty request');
      return;
    }

    //Note: The limit on the length of the search request should be within 2048 characters.
    if (inputKeyword.length > 2000) {
      alert('too many words');
      return null;
    }

    if (!inputData.length) {
      alert('Upload list of url');
      return null;
    }
    if (!userProfile) {
      alert('Need to sign in');
      return null;
    }

    const request = `intitle:"${inputKeyword}"`;
    dispatch(setRequestIndexThematicity(request));
    const currentRequestCount = inputData.length;
    const modifyBalance = await fireStore.calculateBalance({
      userProfile: userProfile,
      requestCount: currentRequestCount,
      toolName: 'ThematicityIndex',
    });

    if (!modifyBalance) return;
    dispatch(setStatusIndexThematicity(toolStatusValues.Working));

    const calculatedData = await calcThematicityIndex({
      inputDataArr: inputData,
      query: request,
      onUpdate: progressHandler,
      onError: errorHandler,
    });

    if (!calculatedData) {
      dispatch(setStatusIndexThematicity(toolStatusValues.Idle));
      return;
    }

    await fireStore.modifyUser(userProfile.uid, modifyBalance);
    dispatch(addInputData(calculatedData));
    dispatch(setStatusIndexThematicity(toolStatusValues.Idle));
    dispatch(setInformMessage('Successfully done'));
  };

  const userInf = userProfile ? (
    <div className={style.userInf}>
      <div className={style.userInf__freeReq}>
        You have: {userProfile.freeRequest} free calculations
      </div>
      <div className={style.userInf__walletBal}>Wallet balance: {userProfile.walletBalance}$</div>
    </div>
  ) : (
    <div className={style.userInf__unAuthMessage}>
      Sign up now and get 20 free thematicity index calculation per day!
    </div>
  );

  return (
    <section className="thematicityIndex">
      <div className={style.container}>
        <h1 className={style.mainHeading}>Thematicity Index Tool</h1>
        {userInf}

        <InputFile onFileUpload={handleFileUpload} />
        <aside className={style.acceptedFiles}>
          <div className={style.acceptedDescription}>
            {loadedFileName ? <p>{`Uploaded file: ${loadedFileName}`}</p> : null}
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
                  : 'Get Thematicity Index'
              }
            />
            <ButtonCommon
              type="button"
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

export default ThematicityIndex;
