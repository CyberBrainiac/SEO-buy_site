import { ButtonLink } from '@/components/buttons/Buttons';
import style from './thematicityIndex.module.scss';
// import InputFile from './inputFile/InputFile';
import React, { useCallback, useState } from 'react';

interface MyCompProps {
  handleClick: () => void;
  value?: number;
}

const buttonStyle = {
  margin: '10px',
  borderRadius: '30%',
  padding: '5px',
};

const ThematicityIndex: React.FC = () => {
  const [count, setCount] = useState(0);
  const [fatherCount, setFatherCount] = useState(0);

  // const handleFileUpload = (file: File): File => {
  //   console.log('Uploaded file:', file);
  //   return file;
  // };

  const handleClick = useCallback(() => {
    setCount(count => count + 1);
  }, []);

  const fatherHandler = () => {
    setFatherCount(fatherCount + 1);
  };

  return (
    <section className={style.container}>
      {/* <InputFile onFileUpload={handleFileUpload} /> */}
      <ButtonLink href="/" text="Home page" />
      <button style={buttonStyle} onClick={fatherHandler}>
        Re render Father {fatherCount}
      </button>
      <p>Value {count}</p>
      <MyComp handleClick={handleClick} />
    </section>
  );
};

const MyComp: React.FC<MyCompProps> = ({ handleClick }) => {
  return (
    <button style={buttonStyle} onClick={handleClick}>
      test
    </button>
  );
};

export default ThematicityIndex;
