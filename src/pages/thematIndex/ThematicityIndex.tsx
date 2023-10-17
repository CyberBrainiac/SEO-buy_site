import { ButtonLink } from '@/components/buttons/Buttons';
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

  return (
    <section className={style.container}>
      <InputFile onFileUpload={handleFileUpload} />
      <aside className={style.acceptedFiles}>
        <div className={style.acceptedDescription}>
          {upLoadedFile ? <p>Uploaded file:</p> : null}
        </div>
        <p className={style.acceptedNames}>{upLoadedFile?.name}</p>
      </aside>
      <ButtonLink href="/" text="Home page" />
      <button onClick={handleCreateExample}>Download Example.xlsx</button>
      <button onClick={handleReadFile}>Read File.xlsx</button>
    </section>
  );
};

export default ThematicityIndex;
