import React from 'react';

const FileItem = ({ file }) => {
  return (
    <li>
      <a href={file.url} target="_blank" rel="noopener noreferrer">
        {file.name}
      </a>
    </li>
  );
};

export default FileItem;
