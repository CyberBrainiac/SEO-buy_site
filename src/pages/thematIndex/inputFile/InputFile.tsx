import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface InputFileProps {
  onFileUpload: (file: File) => void;
}

const InputFile: React.FC<InputFileProps> = ({ onFileUpload }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const uploadedFile = acceptedFiles[0];
      onFileUpload(uploadedFile);
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={dropzoneStyles}>
      <input {...getInputProps()} />
      <p>
        {isDragActive
          ? 'Drop the file here'
          : 'Drag and drop a file here, or click to select a file'}
      </p>
    </div>
  );
};

const dropzoneStyles: React.CSSProperties = {
  border: '2px dashed #ccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

export default InputFile;
