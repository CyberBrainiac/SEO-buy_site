import { ButtonLink } from '@/components/buttons/Buttons';
import style from './thematicityIndex.module.scss';
import InputFile from '@/components/inputFile/InputFile';
import React, { useState } from 'react';
import fileExcel from '@/utils/fileExcel';

const ThematicityIndex: React.FC = () => {
  const [upLoadedFile, setUpLoadedFile] = useState<File | null>(null);
  const handleFileUpload = (file: File): File => {
    console.log('Uploaded file:', file);
    setUpLoadedFile(file);
    return file;
  };
  const handleCreateFile = () => {
    fileExcel.createExample();
  };

  return (
    <section className={style.container}>
      <InputFile onFileUpload={handleFileUpload} />
      <aside className={style.acceptedFiles}>
        <p className={style.acceptedDescription}>Uploaded file:</p>
        <p className={style.acceptedNames}>{upLoadedFile?.name}</p>
      </aside>
      <ButtonLink href="/" text="Home page" />
      <button onClick={handleCreateFile}>Download Example.xlsx</button>
    </section>
  );
};

export default ThematicityIndex;
