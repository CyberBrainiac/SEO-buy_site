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
    const newMetaDescription = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement;

    if (newMetaDescription) {
      newMetaDescription.content = `Discover optimal spaces for your links seamlessly with our Link Insertion Locator. Save time and pinpoint strategic placements, integrating seamlessly with Google's SERPs for enhanced visibility.`;
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
        <h1>Link Insertion Locator</h1>
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

        <div className={style.content}>
          <h2>Navigating Your Path to Relevant Link Placements</h2>
          <p>
            In the ever-evolving world of digital marketing, strategic link placements are paramount
            to establishing and fortifying your online presence. At SEO-Buy, our Link Insertion
            Locator emerges as a powerful ally, simplifying the intricate process of finding ideal
            spaces for your valuable links. Let`s explore the nuances of this online tool and how it
            can revolutionize your link-building strategy.
          </p>

          <h2>Effortless Discovery of Link Placement Opportunities</h2>
          <p>
            The Link Insertion Locator is a game-changer for digital marketers seeking efficient and
            targeted link placements. Say goodbye to endless hours spent manually scouring the
            internet for suitable websites; our tool automates the process, allowing you to focus on
            what truly matters – crafting compelling content and building your brand.
          </p>

          <h2>User-Friendly Interface</h2>
          <p>
            The process is seamless. Upload your database of websites and input your desired
            keywords or phrases. The Link Insertion Locator swiftly sifts through your repository,
            identifying websites whose content aligns perfectly with your specified criteria.
          </p>

          <h2>Precision in Matching</h2>
          <p>
            Our tool goes beyond basic keyword matching. It analyzes the content of each website in
            your database, ensuring not only topical relevance but also contextual suitability for
            link insertions. This meticulous approach guarantees that your links seamlessly
            integrate into the fabric of each website, maximizing their impact.
          </p>

          <h2>Google SERP Integration</h2>
          <p>
            But we don`t stop there. The Link Insertion Locator taps into the vast wealth of
            information available on Google`s Search Engine Results Pages (SERPs). By providing you
            with the exact number of pages and a list of top-ranking pages from Google`s results
            that precisely match your query, you gain unparalleled insights into the potential reach
            and influence of your link placements.
          </p>

          <h2>Time-Efficient and Result-Driven</h2>
          <p>
            Imagine the hours saved as the Link Insertion Locator streamlines the process,
            presenting you with a curated list of websites where your links will thrive. By
            eliminating the guesswork and minimizing the search time, our tool empowers you to focus
            on the strategic aspects of your link-building campaign.
          </p>

          <h2>Strategic Advantage</h2>
          <p>
            In the competitive landscape of digital marketing, every minute counts. The Link
            Insertion Locator at SEO-Buy not only saves you time but also provides a strategic
            advantage by ensuring that your links find a natural and impactful home in the digital
            realm.
          </p>

          <p>
            Welcome to a new era of efficiency in link building. Let the Link Insertion Locator be
            your guide as you navigate the vast landscape of online opportunities, one relevant link
            placement at a time. Elevate your strategy with precision and purpose!
          </p>
        </div>
      </div>
    </section>
  );
};

export default LinkInsertion;

// NotServedByPagesError
