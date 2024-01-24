import { setFileName } from '@/containers/reducers/inputDataSlice';
import { AppDispatch } from '@/containers/storeRedux';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';

interface InputFileProps {
  onFileUpload: (file: File) => void;
}

const InputFile: React.FC<InputFileProps> = ({ onFileUpload }) => {
  const dispatch = useDispatch() as AppDispatch;

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) {
        alert("Provide Excel file with correct extension: '.xlsx'");
        return;
      }
      const uploadedFile = acceptedFiles[0];
      dispatch(setFileName(uploadedFile.name));
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

  return (
    <div {...getRootProps()} style={dropzoneStyles}>
      <input {...getInputProps()} />
      <p style={{ textAlign: 'center' }}>
        {isDragActive
          ? 'Drop the file here'
          : 'Drag and drop a file here, or click to select a file'}
      </p>
      <em>(Only *.xlsx file will be accepted)</em>
    </div>
  );
};

const dropzoneStyles: React.CSSProperties = {
  border: '2px dashed #ccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
  height: '20vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

export default InputFile;
