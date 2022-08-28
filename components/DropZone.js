/* eslint-disable @next/next/no-img-element */
import React, { useCallback } from 'react';

import { useDropzone } from 'react-dropzone';

export function MyDropzone() {
  const [files, setFiles] = React.useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {};
        setFiles(prev => {
          return [...prev,file]
      });
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });


  return (
    <>
      <div {...getRootProps({ className: 'bg-gray-300' })}>
        <input {...getInputProps()} />

        <p>Drag n drop some files here, or click to select files</p>
      </div>
      {files.length > 0 && (
        <div>
          {
            <ul>
              {files.map((file, i) => (
                <li className='mb-2' key={i}>
                  {JSON.stringify(file)}
                </li>
              ))}
            </ul>
          }
        </div>
      )}
    </>
  );
}
