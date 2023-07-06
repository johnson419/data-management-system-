import React from 'react';
import './FileItem.css'

const FileItem = ({ file }) => {
  return (
    <li className='custom-list' orientation='vertical'>
      <div className="custom-item">
    <div className="custom-item-content">
      <div className="custom-item-info">
        <img
          className="custom-item-icon"
          src="images/img_file_1.svg"
          alt="file Two"
        />
        <p className="custom-item-title">File Name: {file.name}</p>
      </div>
    </div>
    <p className="custom-item-text">File Content: {file.textContent}</p>
   <a href={file.url}><button>Open file</button></a> 
  </div>
      <a href={file.url} target="_blank" rel="noopener noreferrer">
        {file.name}
      </a>
      
      <p>Text Content: {file.textContent}</p>
    </li>
  );
};

export default FileItem;
