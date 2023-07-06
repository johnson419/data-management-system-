import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';
import './App.css'

const App = () => {
  const [files, setFiles] = useState([]);

  const handleFileUpload = (uploadedFile) => {
    const newFile = {
      id: Date.now(),
      name: uploadedFile.name,
      url: URL.createObjectURL(uploadedFile),
    };

    // Indexing Step: Extract text content from the file
    const reader = new FileReader();
    reader.onload = function (event) {
      const textContent = event.target.result;

      // Add the extracted text content to the file object
      newFile.textContent = textContent;

      // Indexing Step: Add keywords or tags based on the file content
      const keywords = extractKeywords(textContent);
      newFile.keywords = keywords;

      // Update the files state with the new indexed file
      setFiles((prevFiles) => [...prevFiles, newFile]);
    };

    reader.readAsText(uploadedFile);
  };

  // Function to extract keywords from the text content
  const extractKeywords = (textContent) => {
    console.log('Extracted Text Content: ',textContent);
    // Remove punctuation and convert text to lowercase
    const cleanedText = textContent.toLowerCase().replace(/[^\w\s]/g, '');

    // Split the cleaned text into individual words
    const words = cleanedText.split(/\s+/);

    // Count the frequency of each word
    const wordCounts = {};
    words.forEach((word) => {
      if (wordCounts[word]) {
        wordCounts[word]++;
      } else {
        wordCounts[word] = 1;
      }
    });

    // Sort the words by their frequency in descending order
    const sortedWords = Object.keys(wordCounts).sort(
      (a, b) => wordCounts[b] - wordCounts[a]
    );

    // Return the top 5 most frequent words as keywords
    return sortedWords.slice(0, 5);
  };

  return (
    <div>
      <h1>Document Management System</h1>
      <FileUpload onFileUpload={handleFileUpload} />
      <FileList files={files} />

      {/* test code here */}
     
      <div className="flex flex-col gap-6 items-center justify-start w-full">
  <div className="custom-container">
    <img
      className="custom-icon"
      src="images/img_file_26X26.svg"
      alt="file One"
    />
    <p className="custom-text" size="txtGilroyMedium18">
      Add a File Here or
    </p>
    <button className="custom-button">
      <div className="custom-button-content">
        <img
          className="custom-button-icon"
          src="images/img_upload.svg"
          alt="upload"
        />
        <div className="custom-button-label">Upload</div>
      </div>
    </button>
  </div>
</div>

    </div>
  );
};

export default App;
