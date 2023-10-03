import { ButtonLink } from '@/components/buttons/Buttons';
import style from './thematicityIndex.module.scss';
import InputFile from './inputFile/InputFile';
import React, { useCallback } from 'react';

const ThematicityIndex: React.FC = () => {
  const handleFileUpload = (file: File): File => {
    console.log('Uploaded file:', file);
    return file;
  };

  const handleClick = useCallback(() => {
    console.log('Start');
  }, []);

  return (
    <section className={style.container}>
      <InputFile onFileUpload={handleFileUpload} />
      <ButtonLink href="/" text="Home page" />
      <MyComp clickHand={handleClick} />
    </section>
  );
};

const MyComp: React.FC<MyCompProps> = ({ clickHand }) => {
  return <button onClick={clickHand}>Start</button>;
};

interface MyCompProps {
  clickHand: () => void;
}

export default ThematicityIndex;
