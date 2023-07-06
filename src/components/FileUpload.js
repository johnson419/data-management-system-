import React, { useState } from 'react';
import './styles.css'

const FileUpload = ({ onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      onFileUpload(selectedFile);
      setSelectedFile(null);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button className='button' onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
