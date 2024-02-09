import {
  selectFileName,
  setFileName as setFileName_redux,
} from '@/containers/reducers/inputDataSlice';
import { AppDispatch } from '@/containers/storeRedux';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';

interface InputFileProps {
  onFileUpload: (file: File) => void;
}

const InputFile: React.FC<InputFileProps> = ({ onFileUpload }) => {
  const dispatch = useDispatch() as AppDispatch;
  const [fileName, setFileName] = useState('');
  const savedFileName = useSelector(selectFileName);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) {
        alert("Provide Excel file with correct extension: '.xlsx'");
        return;
      }
      const uploadedFile = acceptedFiles[0];
      setFileName(uploadedFile.name);
      dispatch(setFileName_redux(uploadedFile.name));
      onFileUpload(uploadedFile);
    },
    [onFileUpload, dispatch]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
  });

  const AcceptedFiles =
    savedFileName || fileName ? (
      <div style={fileWrapStyle}>
        <p style={fileParStyle}>
          {`Uploaded file:`} <span style={fileNameStyle}>{savedFileName || fileName}</span>
        </p>
      </div>
    ) : null;

  return (
    <div {...getRootProps()} style={dropzoneStyles}>
      <input {...getInputProps()} />
      <p style={{ textAlign: 'center' }}>
        {isDragActive
          ? 'Drop the file here'
          : 'Drag and drop a file here, or click to select a file'}
      </p>
      <em>(Only *.xlsx file will be accepted)</em>
      {AcceptedFiles}
    </div>
  );
};

const dropzoneStyles: React.CSSProperties = {
  border: '2px dashed #000',
  backgroundColor: '#fff',
  borderRadius: '4px',
  padding: '6px',
  width: '430px',
  textAlign: 'center',
  cursor: 'pointer',
  height: '20vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

const fileWrapStyle: React.CSSProperties = {
  height: '50px',
  marginTop: '20px',
  fontWeight: '600',
};

const fileParStyle: React.CSSProperties = {
  textAlign: 'center',
};

const fileNameStyle: React.CSSProperties = {
  color: '#008000',
};

export default InputFile;
