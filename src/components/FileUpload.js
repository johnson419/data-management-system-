import React, { useState } from 'react';
import { pdfjs} from 'pdfjs-dist';
import './styles.css'



const handleFileUpload = async (uploadedFile) => {
  const file = uploadedFile instanceof File ? uploadedFile : uploadedFile.target.files[0];

  // Check if the uploaded file is a PDF
  if (file.type !== 'application/pdf') {
    console.log('Please upload a PDF file.');
    return;
  }

  // Load the PDF file
  const loadingTask = pdfjs.getDocument(URL.createObjectURL(file));
  try {
    const pdf = await loadingTask.promise;
    const numPages = pdf.numPages;

    // Iterate through each page and extract the text content
    for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);
      const content = await page.getTextContent();
      const text = content.items.map((item) => item.str).join(' ');

      // Process the extracted text content (e.g., indexing, storage, etc.)
      console.log(`Page ${pageNumber}: ${text}`);
    }
  } catch (error) {
    console.log('Error loading PDF:', error);
  }
};

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
      <input type="file" onChange={handleFileUpload} />
      <button className='button' onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
