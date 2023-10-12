import { ButtonLink } from '@/components/buttons/Buttons';
import style from './thematicityIndex.module.scss';
import InputFile from './inputFile/InputFile';
import React, { useState } from 'react';

const ThematicityIndex: React.FC = () => {
  const [upLoadedFile, setUpLoadedFile] = useState<File | null>(null);
  const handleFileUpload = (file: File): File => {
    console.log('Uploaded file:', file);
    setUpLoadedFile(file);
    return file;
  };

  return (
    <section className={style.container}>
      <InputFile onFileUpload={handleFileUpload} />
      <aside className={style.displayFiles}>
        <h4>Uploaded file:</h4>
        <p>{upLoadedFile?.name}</p>
      </aside>
      <ButtonLink href="/" text="Home page" />
    </section>
  );
};

export default ThematicityIndex;
