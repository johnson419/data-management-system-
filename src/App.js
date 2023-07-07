import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Dropzone from 'react-dropzone';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import './App.css'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function App() {
  const [fileContent, setFileContent] = useState(null);
  const [fileType, setFileType] = useState(null); // Set the initial value to null

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
  
    reader.onload = async (event) => {
      const content = event.target.result;
      setFileContent(content);
      setFileType(file.name); // Update the fileType state to the actual file name
    };
  
    reader.readAsArrayBuffer(file);
  };
  

  const handlePdfRenderError = (error) => {
    console.error('Error while rendering PDF:', error);
  };

  const handleFileView = () => {
    setFileContent(null);
  };

  const handleFileRead = () => {
  const fileBlob = new Blob([fileContent], { type: fileType });
  const fileUrl = URL.createObjectURL(fileBlob);
  
  const downloadLink = document.createElement('a');
  downloadLink.href = fileUrl;
  downloadLink.download = fileType;
  downloadLink.click();
};


  return (
    <div className="App">
      <Dropzone onDrop={handleDrop} multiple={false}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>Drag and drop a PDF document here, or click to select a file</p>
          </div>
        )}
      </Dropzone>

      {fileContent && (
        <div className="file-content">
          <h2>File name: {fileType}</h2>
          {fileType.endsWith('.pdf') ? (
              <div className="pdf-container">
              <div className="pdf-buttons">
                <button onClick={handleFileView}>View PDF</button>
                <button onClick={handleFileRead}>Read Text</button>
              </div>
              <Document file={{ data: fileContent }}>
                <Page pageNumber={1} onLoadError={handlePdfRenderError} />
              </Document>
            </div>
          ) : (
            <pre>{fileContent}</pre>
          )}
        </div>
      )}
    </div>
  );
}

export default App;





// import React, { useState } from 'react';
// import FileUpload from './components/FileUpload';
// import FileList from './components/FileList';
// import './App.css'

// const App = () => {
//   const [files, setFiles] = useState([]);

//   const handleFileUpload = async(uploadedFile) => {
//     const newFile = {
//       id: Date.now(),
//       name: uploadedFile.name,
//       url: URL.createObjectURL(uploadedFile),
//     };

//     // Indexing Step: Extract text content from the file
//     const reader = new FileReader();
//     reader.onload = function (event) {
//       const textContent = event.target.result;

//       // Add the extracted text content to the file object
//       newFile.textContent = textContent;

//       // Indexing Step: Add keywords or tags based on the file content
//       const keywords = extractKeywords(textContent);
//       newFile.keywords = keywords;

//       // Update the files state with the new indexed file
//       setFiles((prevFiles) => [...prevFiles, newFile]);
//     };

//     reader.readAsText(uploadedFile);
//   };

//   // Function to extract keywords from the text content
//   const extractKeywords = (textContent) => {
//     console.log('Extracted Text Content: ',textContent);
//     // Remove punctuation and convert text to lowercase
//     const cleanedText = textContent.toLowerCase().replace(/[^\w\s]/g, '');

//     // Split the cleaned text into individual words
//     const words = cleanedText.split(/\s+/);

//     // Count the frequency of each word
//     const wordCounts = {};
//     words.forEach((word) => {
//       if (wordCounts[word]) {
//         wordCounts[word]++;
//       } else {
//         wordCounts[word] = 1;
//       }
//     });

//     // Sort the words by their frequency in descending order
//     const sortedWords = Object.keys(wordCounts).sort(
//       (a, b) => wordCounts[b] - wordCounts[a]
//     );

//     // Return the top 5 most frequent words as keywords
//     return sortedWords.slice(0, 5);
//   };

//   return (
//     <div>
//       <h1>Document Management System</h1>
//       <FileUpload onFileUpload={handleFileUpload} />
//       <FileList files={files} />

     
//     </div>
//   );
// };

// export default App;
