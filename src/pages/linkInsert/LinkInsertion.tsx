import React, { FormEvent, useEffect, useState } from 'react';
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
import {
  InputData,
  addInputData,
  selectFileName,
  selectInputData,
} from '@/containers/reducers/inputDataSlice';
import { selectUser, setInformMessage } from '@/containers/reducers/userSlice';
import { ButtonCommon } from '@/components/buttons/Buttons';
import InputFile from '@/components/inputFile/InputFile';
import fileExcel from '../../utils/fileExcel';
import fireStore from '@/services/fireStore';
import getLinkInsertion from './getLinkInsertion';

const LinkInsertion: React.FC = () => {
  const dispatch = useDispatch() as AppDispatch;
  const inputData = useSelector(selectInputData) as InputData[];
  const loadedFileName = useSelector(selectFileName);
  const userProfile = useSelector(selectUser);
  const toolStatus = useSelector(selectLinkInsertionStatus);
  const userQuery = useSelector(selectLinkInsertionRequest);
  const [logProgress, setLogProgress] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSettingVisible, setSettingVisible] = useState(false);

  useEffect(() => {
    document.title = 'Effortless Link Placement with Our Locator Tool | SEO-Buy';

    const newMetaDescription = document.createElement('meta');
    newMetaDescription.name = 'description';
    newMetaDescription.content = `Discover optimal spaces for your links seamlessly with our Link Insertion Locator. Save time and pinpoint strategic placements, integrating seamlessly with Google's SERPs for enhanced visibility.`;
    document.head.appendChild(newMetaDescription);
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
      alert('Upload your file.xlsx with URLs or use Example file');
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
    setErrorMessage(null);
    setLogProgress(null);

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    let inputKeyword = formData.get('request') as string;
    inputKeyword = inputKeyword.trim();

    if (!inputData.length) {
      alert('Upload list of url');
      return null;
    }
    if (!userProfile) {
      alert('Need to sign in');
      return null;
    }
    if (!inputKeyword) {
      alert('Empty request');
      return;
    }

    //Note: The limit on the length of the search request should be within 2048 characters.
    if (inputKeyword.length > 2000) {
      alert('too many words');
      return null;
    }

    let inputLocation = formData.get('location') as string;
    inputLocation = inputLocation?.trim();

    const request = `"${inputKeyword}"`;
    dispatch(setRequestLinkInsertion(request));
    const currentRequestCount = inputData.length;
    const modifyBalance = await fireStore.calculateBalance({
      userProfile: userProfile,
      requestCount: currentRequestCount,
      toolName: 'LinkInsertion',
    });

    if (!modifyBalance) return;
    dispatch(setStatusLinkInsertion(toolStatusValues.Working));

    const calculatedData = await getLinkInsertion({
      inputDataArr: inputData,
      query: request,
      keyWord: inputKeyword,
      location: inputLocation,
      onUpdate: progressHandler,
      onError: errorHandler,
    });

    if (!calculatedData) {
      dispatch(setStatusLinkInsertion(toolStatusValues.Idle));
      return undefined;
    }

    await fireStore.modifyUser(userProfile.uid, modifyBalance);
    dispatch(addInputData(calculatedData));
    dispatch(setStatusLinkInsertion(toolStatusValues.Idle));
    dispatch(setInformMessage('Successfully done'));
  };

  function hadnleSettingToggle(event: React.ChangeEvent<HTMLInputElement>) {
    setSettingVisible(event.target.checked);
  }

  //
  const progressHandler = (value: string) => {
    setLogProgress(value);
  };

  //
  const errorHandler = (errorMessage: string) => {
    setErrorMessage(errorMessage);
  };

  const userInf = userProfile ? (
    <div className={style.userInf}>
      <div className={style.userInf__freeReq}>
        You have: {userProfile.freeRequest} free calculations
      </div>
      <div className={style.userInf__walletBal}>Wallet balance: {userProfile.walletBalance}$</div>
    </div>
  ) : (
    <div className={style.userInfNonAuth}>
      Sign up now and get 20 free thematicity index calculation per day!
    </div>
  );

  return (
    <section className="linkInsertion">
      <div className={style.container}>
        <h1 className={style.mainHeading}>Link Insertion Tool</h1>
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
            <div className={style.formGridInput}>
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
            </div>

            <div className={style.formSetting}>
              <div className={style.formSettingToggle} onChange={hadnleSettingToggle}>
                <span>Show Settings</span>
                <input type="checkbox" name="checkbox-group" />
              </div>
              {isSettingVisible ? (
                <div className={style.formSettingContent}>
                  <div className={style.formSettingElem}>
                    <p>Location:</p>
                    <input type="text" name="location" placeholder="United States  OR  us" />
                  </div>
                </div>
              ) : null}
            </div>

            <div className={style.formBtnWrap}>
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
                type="button"
                className={style.loadBtn}
                id="buttonLoadIndexThemat"
                onClick={handleLoadResult}
                text="Load Result"
              />
            </div>
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
