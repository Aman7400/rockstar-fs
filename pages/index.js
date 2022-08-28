/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useDropzone } from 'react-dropzone';

const bytesToMegaBytes = (bytes) => Number(bytes / 1024 ** 2).toFixed(2);


const Home = () => {
  const [allFiles, setAllFiles] = React.useState([]);

  const onDrop = React.useCallback((acceptedFiles) => {
    setAllFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });


  const totalUploadSize = allFiles.reduce(
    (total, file) => total + file.size,
    0
  );

  const files = allFiles.map((file, i) => (
    <li
      className='p-1 flex flex-row justify-between font-thin font-sans-serif'
      key={file.path}
    >
      <p className='w-5/6 hover:text-heading'>
        {' '}
        <span className='text-heading font-medium mr-2'>{i + 1}</span>{' '}
        {file.path}
      </p>{' '}
      <span className='w-1/6 text-right text-heading font-semibold'>
        {bytesToMegaBytes(file.size)} mb
      </span>
    </li>
  ));

  const [isSending, setIsSending] = React.useState(false);

  function handleFileSending() {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setAllFiles([]);
    }, 3000);
  }

  return (
    <div>
      {/* Hero */}
      <HeroSection />
      {/* File Drop Zone */}
      {files.length < 1 && (
       <FileDropZone getRootProps={getRootProps} getInputProps={getInputProps} />
      )}
      {/* File Viewer */}
      {files.length > 0 && (
        <FileViewer handleFileSending={handleFileSending} totalUploadSize={totalUploadSize} isSending={isSending} files={files} />
      )}
    </div>
  );
};

function HeroSection() {
  return (
    <section className='mx-auto my-16 flex drop-shadow-lg flex-col w-1/2 justify-center items-center'>
      <h1 className='text-7xl mb-2 text-heading font-sans-serif font-bold'>
        Send Super Big Files
      </h1>
      <p className='text-5xl mb-2 text-white font-sans-serif font-semibold'>
        Simple. Fast. Beautiful.
      </p>
    </section>
  );
}

function FileDropZone({getRootProps,getInputProps}) {
  return (
     <section
          {...getRootProps()}
          className='p-16 my-8 w-2/4 mx-auto rounded-2xl  shadow-lg cursor-pointer flex flex-col justify-center items-center bg-white'
        >
          <input {...getInputProps()} />
          <h1 className='text-3xl text-center text-heading font-sans-serif font-bold'>
            Drop it like its hot !
          </h1>
          <p className='text-lg text-center text-heading font-sans-serif font-medium'>
            No Size Limit*
          </p>
          <img src='/upload.png' alt='upload illustration' />
        </section>
  )
}

function FileViewer({handleFileSending,totalUploadSize,isSending,files}) {
  return (
    <section className='p-16  w-2/4 mx-auto rounded-2xl  shadow-lg cursor-pointer flex flex-col justify-center items-center bg-white'>
          <h4 className='text-3xl font-sans-serif font-bold text-center text-heading'>
            Total Files : {files.length}
          </h4>
          <p className='font-sans-serif'>
            {' '}
            Total Size : {bytesToMegaBytes(totalUploadSize)} mb
          </p>
          <ul className='max-h-40 my-4 overflow-y-scroll'>{files}</ul>
          <button
            disabled={isSending}
            onClick={handleFileSending}
            className='bg-heading text-lg text-white shadow-md p-2 my-4 font-sans-serif font-bold px-8 rounded-md'
          >
            {isSending ? 'Sending...' : 'Start Sending'}
          </button>
        </section>
  )
}

export default Home;
