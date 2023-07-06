import React from 'react';

const FileItem = ({ file }) => {
  return (
    <li>
      <a href={file.url} target="_blank" rel="noopener noreferrer">
        {file.name}
      </a>
      <p>Text Content: {file.textContent}</p>
      <p>Keywords: {file.keywords.join(', ')}</p>
    </li>
  );
};

export default FileItem;
