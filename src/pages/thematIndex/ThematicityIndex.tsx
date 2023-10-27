import { ButtonCommon } from '@/components/buttons/Buttons';
import style from './thematicityIndex.module.scss';
import styleBtns from '@components/buttons/buttons.scss';
import InputFile from '@/components/inputFile/InputFile';
import React, { FormEvent, useState, useReducer, useEffect, useRef } from 'react';
import fileExcel from '@/utils/fileExcel';
import calcThematicityIndex from '@/utils/calcThematicityIndex';
import UnvalidValueError from '@/utils/errorHandlers/unvalidValueError';
import reducerExelData from './reducerExelData';
import locStorage from '@/utils/localStorage';

const ThematicityIndex: React.FC = () => {
  const [upLoadedFile, setUpLoadedFile] = useState<File | null>(null);
  const [fileBinaryData, setFileBinaryData] = useState<ArrayBuffer | null>(null);
  const [excelData, dispatchExcelData] = useReducer(reducerExelData, null);
  const [logProgress, setLogProgress] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const wasUserUploadFile = useRef(false);
  const isToolRun = useRef(false);

  //
  useEffect(() => {
    const storageKey = 'TI_userExcelData';

    if (!excelData) {
      const data = locStorage.get(storageKey);

      if (!data) return;
      dispatchExcelData({ type: 'SET', excelData: data });
      return;
    }

    if (!wasUserUploadFile.current) return; // check 1 load, if data empty this is first load and not need to set data in storage
    locStorage.set(storageKey, excelData);
    isToolRun.current = false;
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
    if (!data) {
      console.error('Can not read buffer data');
      return null;
    }
    wasUserUploadFile.current = true;
    dispatchExcelData({ type: 'SET', excelData: data });
  };

  //
  const handleLoadResult = async () => {
    if (!fileBinaryData || !excelData) {
      alert("First click on the 'Get Thematicity Index button");
      return null;
    }

    // fileExcel.write({
    //   file: fileBinaryData,
    //   excelData: excelData,
    // });
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

    if (!excelData) {
      alert('First upload your file.xlsx \n\rYou can use example.xlsx for correct data structure');
      return null;
    }

    isToolRun.current = true;
    const resultURLObjects = await calcThematicityIndex({
      arrURL_objects: excelData.urlObjects,
      query: request,
      onUpdate: progressHandler,
      onError: errorHandler,
    });

    dispatchExcelData({ type: 'MODIFY', urlObjects: resultURLObjects });
  };

  return (
    <section className="thematicityIndex">
      <div className={style.container}>
        <InputFile onFileUpload={handleFileUpload} />
        <aside className={style.acceptedFiles}>
          <div className={style.acceptedDescription}>
            {upLoadedFile ? <p>{`Uploaded file: ${upLoadedFile?.name}`}</p> : null}
          </div>
        </aside>

        <form onSubmit={formHandler} className={style.form}>
          <div className={style.form_container}>
            <label htmlFor="request">Write keyword or theme</label>
            <input
              name="request"
              type="text"
              className={style.form_input}
              placeholder="koala"
              required
            />
            <ButtonCommon 
            // className={(() => {
            //   if (!isToolRun.current) return '';

            //   return `${style.buttonCommon_working}`;
            // })()} 
            className={styleBtns.buttonCommon_working}
            type="submit" text="Get Thematicity Index" />
          </div>
        </form>

        <div className={style.errorContainer}>{errorMessage}</div>
        <div className={style.logContainer}>{logProgress}</div>
        <ButtonCommon onClick={handleCreateExample} text={'Download Example'} />
        <ButtonCommon onClick={handleLoadResult} text={'Load Result'} />
      </div>
    </section>
  );
};

export default ThematicityIndex;
