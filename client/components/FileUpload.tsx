import React, { useRef, useState } from 'react';
import Image from 'next/image';

interface FileUploadProps {
  setFile: Function;
  accept: string;
  file: File;
  type: 'image' | 'audio';
}

const FileUpload: React.FC<FileUploadProps> = ({
  setFile,
  accept,
  children,
  file,
  type,
}) => {
  const ref = useRef<HTMLInputElement>();
  const [selectedFile, setSelectedFile] = useState(file);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  return (
    <div onClick={() => ref.current.click()}>
      <input
        type="file"
        accept={accept}
        style={{ display: 'none' }}
        ref={ref}
        onChange={onChange}
      />
      {type === 'image' && selectedFile && (
        <Image
          src={URL.createObjectURL(selectedFile)}
          alt="Track picture"
          width={200}
          height={200}
        />
      )}
      {type === 'audio' && selectedFile?.name && <h3>{selectedFile.name}</h3>}
      {children}
    </div>
  );
};

export default FileUpload;
