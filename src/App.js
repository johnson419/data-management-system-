import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Dropzone from 'react-dropzone';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import './App.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function App() {
  const [files, setFiles] = useState([]);
  const [displayPdf, setDisplayPdf] = useState(false);

  const handleDrop = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onload = async (event) => {
        const content = event.target.result;
        setFiles((prevFiles) => [...prevFiles, { name: file.name, content }]);
      };

      reader.readAsArrayBuffer(file);
    });
  };

  const handleFileView = (index) => {
    const file = files[index];
    const fileUrl = URL.createObjectURL(new Blob([file.content], { type: 'application/pdf' }));

    window.open(fileUrl, '_blank');
  };

  const handleFileRead = (index) => {
    const file = files[index];
    const arrayBuffer = file.content;
    const pdfData = new Uint8Array(arrayBuffer);
    const loadingTask = pdfjs.getDocument({ data: pdfData });

    loadingTask.promise.then((pdf) => {
      pdf.getPage(1).then((page) => {
        page.getTextContent().then((textContent) => {
          const text = textContent.items.map((item) => item.str).join(' ');
          setFiles((prevFiles) => {
            const updatedFiles = [...prevFiles];
            updatedFiles[index].content = text;
            return updatedFiles;
          });
          setDisplayPdf(true);
        });
      });
    });
  };

  return (
    <div className="App">
      <Dropzone onDrop={handleDrop} multiple={true}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>Drag and drop PDF files here, or click to select files</p>
          </div>
        )}
      </Dropzone>

      <div className="file-content">
        <h2>Files:</h2>
        {files.length > 0 ? (
          <table className="file-table">
            <thead>
              <tr>
                <th>File Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td>{file.name}</td>
                    <td>
                      <button onClick={() => handleFileView(index)}>View PDF</button>
                      <button onClick={() => handleFileRead(index)}>Read Text</button>
                    </td>
                  </tr>
                  {displayPdf && (
                    <tr>
                      <td colSpan="2">
                        <div className="pdf-container">
                          <Document file={{ data: files[index].content }}>
                            <Page pageNumber={1} />
                          </Document>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No files uploaded</p>
        )}
      </div>
    </div>
  );
}

export default App;


// import React, { useState } from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';
// import Dropzone from 'react-dropzone';
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
// import './App.css';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// function App() {
//   const [files, setFiles] = useState([]);
//   const [displayPdf, setDisplayPdf] = useState(false);

//   const handleDrop = (acceptedFiles) => {
//     acceptedFiles.forEach((file) => {
//       const reader = new FileReader();

//       reader.onload = async (event) => {
//         const content = event.target.result;
//         setFiles((prevFiles) => [...prevFiles, { name: file.name, content }]);
//       };

//       reader.readAsArrayBuffer(file);
//     });
//   };

//   const handleFileView = (index) => {
//     const file = files[index];
//     const fileUrl = URL.createObjectURL(new Blob([file.content], { type: 'application/pdf' }));

//     window.open(fileUrl, '_blank');
//   };

//   const handleFileRead = (index) => {
//     const file = files[index];
//     const arrayBuffer = file.content;
//     const pdfData = new Uint8Array(arrayBuffer);
//     const loadingTask = pdfjs.getDocument({ data: pdfData });
  
//     loadingTask.promise.then((pdf) => {
//       pdf.getPage(1).then((page) => {
//         page.getTextContent().then((textContent) => {
//           const text = textContent.items.map((item) => item.str).join(' ');
//           setFiles((prevFiles) => {
//             const updatedFiles = [...prevFiles];
//             updatedFiles[index].content = text;
//             return updatedFiles;
//           });
//           setDisplayPdf(true);
//         });
//       });
//     });
//   };

//   return (
//     <div className="App">
//       <Dropzone onDrop={handleDrop} multiple={true}>
//         {({ getRootProps, getInputProps }) => (
//           <div {...getRootProps()} className="dropzone">
//             <input {...getInputProps()} />
//             <p>Drag and drop PDF files here, or click to select files</p>
//           </div>
//         )}
//       </Dropzone>

//       <div className="file-content">
//         <h2>Files:</h2>
//         {files.length > 0 ? (
//           <table className="file-table">
//             <thead>
//               <tr>
//                 <th>File Name</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {files.map((file, index) => (
//                 <tr key={index}>
//                   <td>{file.name}</td>
//                   <td>
//                     <button onClick={() => handleFileView(index)}>View PDF</button>
//                     <button onClick={() => handleFileRead(index)}>Read Text</button>
//                   </td>
                  
//                   {displayPdf && (
//   <div className="pdf-container">
//     <Document file={{ data: files[index].content }}>
//       <Page pageNumber={1}/>
//     </Document>
//   </div>
// )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p>No files uploaded</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;




