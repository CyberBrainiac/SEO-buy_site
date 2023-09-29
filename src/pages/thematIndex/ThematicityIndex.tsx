import { ButtonLink } from '@/components/buttons/Buttons';
import style from './thematicityIndex.module.scss';
import InputFile from './inputFile/InputFile';

const ThematicityIndex: React.FC = () => {
  const handleFileUpload = (file: File) => {
    console.log('Uploaded file:', file);
  };

  return (
    <section className={style.container}>
      <InputFile onFileUpload={handleFileUpload} />
      <ButtonLink href="/" text="Home page" />
    </section>
  );
};

export default ThematicityIndex;
