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
import Calculator from '@/components/calculator/Calculator';
import price from '@/services/config/price';

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
        Free calculations: <p>{userProfile.freeRequest} url{(userProfile.freeRequest === 1) ? '' : 's'}</p>
      </div>
      <div className={style.userInf__walletBal}>Wallet balance: <p>{userProfile.walletBalance}$</p></div>
    </div>
  ) : (
    <div className={style.userInf}>
      <div className={style.userInf__unAuthMessage}>
        <div>Sign in now, get <p style={{fontSize: '26px', color: 'rgb(4, 129, 4)'}}>20 free</p> thematicity index calculation per day!</div>
      </div>
    </div>
  );

  return (
    <section className="thematicityIndex">
      <div className={style.container}>
        <h1 className={style.mainHeading}>Thematic Domain Indexing</h1>

        <div className={style.column}>
          <div className={style.columnLeft}>
            {userInf}
            <Calculator pricePerRequest={price.indexThematiicityRequest} />
          </div>

          <div className={style.columnRight}>
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
        </div>

        <div className={style.content}>
          <h2>Unveiling Relevance in the Digital Tapestry</h2>

          <p>
            In the dynamic landscape of digital content, relevance is the key to unlocking the full
            potential of your website. At SEO-Buy, our Thematic Domain Indexing (TDI) tool serves as
            a beacon, guiding you through the intricate maze of online visibility. Let`s delve into
            the intricacies of how TDI can revolutionize your approach to link building and search
            engine optimization.
          </p>

          <h2>How Thematic Domain Indexing Works</h2>
          <p>
            Thematic Domain Indexing is a sophisticated mechanism that evaluates the alignment
            between a website and the thematic essence of a specific user query. Recognizing that
            websites cover diverse thematic realms, TDI enables you to assess which domains from
            your user`s database resonate most effectively with their content goals.
          </p>

          <h2>Precision in Matching</h2>
          <p>
            By assigning a thematic index to each domain, our tool provides a quantitative measure
            of how well a website aligns with a particular user query. This not only streamlines the
            link building process but also empowers you to make informed decisions based on
            data-driven insights.
          </p>

          <h2>Optimizing for Google`s Affinity</h2>
          <p>
            In the realm of search engine optimization, Google values relevance. Thematic Domain
            Indexing equips you with the ability to identify domains that are not only thematically
            aligned with the user`s query but also possess a high likelihood of enhancing search
            engine rankings.
          </p>

          <h2>Strategic Link Placements</h2>
          <p>
            Armed with the insights from TDI, you can strategically place links on websites that not
            only share thematic relevance but also increase the probability of Google recognizing
            the synergy. This synergy, in turn, boosts your website`s chances of climbing the ranks
            in Google`s search results.
          </p>

          <h2>Enhancing User Experience</h2>
          <p>
            Thematic Domain Indexing isn`t just about appeasing search engines; it`s about enhancing
            the user experience. By connecting users with content that precisely aligns with their
            interests, you`re not only increasing visibility but also fostering a more engaging
            online experience.
          </p>

          <p>
            In a nutshell, Thematic Domain Indexing at SEO-Buy isn`t just a tool; it`s a compass
            navigating you through the vast sea of digital content. Elevate your link building
            strategy, enhance thematic relevance, and ascend the ranks of search engine results with
            the precision of Thematic Domain Indexing. Welcome to a new era of targeted online
            visibility!
          </p>
        </div>
      </div>
    </section>
  );
};

export default ThematicityIndex;
