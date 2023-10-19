import { ButtonCommon } from '@/components/buttons/Buttons';
import style from './thematicityIndex.module.scss';
import InputFile from '@/components/inputFile/InputFile';
import React, { useState } from 'react';
import fileExcel from '@/utils/fileExcel';

const ThematicityIndex: React.FC = () => {
  const [upLoadedFile, setUpLoadedFile] = useState<File | null>(null);
  const [fileBinaryData, setFileBinaryData] = useState<ArrayBuffer | null>(null);

  const handleFileUpload = (file: File): File => {
    setUpLoadedFile(file);

    /**Create binary ArrayBuffer*/
    const reader = new FileReader();

    reader.onload = onReady => {
      const buffer = onReady.target?.result as ArrayBuffer;
      setFileBinaryData(buffer);
    };
    if (file) reader.readAsArrayBuffer(file);

    return file;
  };

  const handleCreateExample = () => {
    fileExcel.createExample();
  };

  const handleReadFile = async () => {
    if (fileBinaryData) {
      const res = await fileExcel.read(fileBinaryData);
      console.log(res);
    } else {
      alert('First upload your file.xlsx');
    }
  };

  // const formHandler = (event: Event) => {
  //   const form = document.getElementById('thematicityIndex__form')!;
  //   form.preventDefault();
  // };

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

        <form id="thematicityIndex__form" className={style.form}>
          <div className={style.form_container}>
            <input className={style.form_input} type="text" placeholder="write keyword or theme" />
            {/* <ButtonCommon onClick={formHandler} text="Get Thematicity Index" /> */}
          </div>
        </form>

        <ButtonCommon onClick={handleCreateExample} text={'Download Example'} />
        <ButtonCommon onClick={handleReadFile} text={'Read File'} />
      </div>
    </section>
  );
};

export default ThematicityIndex;
