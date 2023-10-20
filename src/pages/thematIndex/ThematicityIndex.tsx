import { ButtonCommon } from '@/components/buttons/Buttons';
import style from './thematicityIndex.module.scss';
import InputFile from '@/components/inputFile/InputFile';
import React, { FormEvent, useState } from 'react';
import fileExcel, { FileExcelProperties } from '@/utils/fileExcel';
import calcThematicityIndex from '@/utils/calcThematicityIndex';
import UnvalidValueError from '@/utils/errorHandlers/unvalidValueError';

const ThematicityIndex: React.FC = () => {
  const [upLoadedFile, setUpLoadedFile] = useState<File | null>(null);
  const [fileBinaryData, setFileBinaryData] = useState<ArrayBuffer | null>(null);
  const [xlsxFileData, setXlsxFileData] = useState<FileExcelProperties | null>(null);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();

    /**Create binary ArrayBuffer*/
    reader.onload = onReady => {
      const buffer = onReady.target?.result as ArrayBuffer;
      setFileBinaryData(buffer);
    };
    reader.onerror = error => {
      console.error('Error in File Reader', error);
    };

    if (!file) {
      alert("Please, provide Excel file with correct extension: 'example.xlsx'");
    }

    setUpLoadedFile(file);
    reader.readAsArrayBuffer(file);
  };

  const handleCreateExample = () => {
    fileExcel.createExample();
  };

  const handleReadFile = async () => {
    if (fileBinaryData) {
      const excelData = await fileExcel.read(fileBinaryData);
      setXlsxFileData(excelData);
    } else {
      setXlsxFileData(null);
    }
  };

  const formHandler = async (event: FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const errorContainer = document.querySelector(`.${style.errorContainer}`) as HTMLDivElement;

    let inputKeyword = formData.get('request');
    if (!inputKeyword) {
      alert('Empty request detected');
      return;
    }
    if (typeof inputKeyword !== 'string') {
      throw new UnvalidValueError("expected type for user inputKeyword is 'string'");
    }

    inputKeyword = inputKeyword.trim();
    formData.set('request', `intitle:"${inputKeyword}"`);

    if (xlsxFileData) {
      console.log(xlsxFileData);
    } else {
      alert('First upload your file.xlsx you can use example.xlsx for correct data structure');
    }

    // const thematicityIndex = await calcThematicityIndex({ arrURL_objects, formData, onUpdate, errorContainer });
  };

  return (
    <section className="thematicityIndex">
      <div className={style.container}>
        <InputFile onFileUpload={handleFileUpload} />
        <aside className={style.acceptedFiles}>
          <div className={style.acceptedDescription}>
            {upLoadedFile ? <p>Uploaded file:</p> : null}
          </div>
          <p className={style.acceptedNames}>{upLoadedFile?.name}</p>
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
            <ButtonCommon type="submit" text="Get Thematicity Index" />
          </div>
        </form>

        <div className={style.errorContainer}></div>
        <ButtonCommon onClick={handleCreateExample} text={'Download Example'} />
        <ButtonCommon onClick={handleReadFile} text={'Read File'} />
      </div>
    </section>
  );
};

export default ThematicityIndex;
