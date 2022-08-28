/* eslint-disable @next/next/no-img-element */
import { Icon } from '@iconify/react';
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

  const [isSending, setIsSending] = React.useState(false);

  function handleFileSending() {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setAllFiles([]);
    }, 3000);
  }

  function handleClearAllFiles() {
    setAllFiles([]);
  }
  function handleFileRemove(index) {
    setAllFiles((prev) => {
      return prev.filter((f, i) => i !== index);
    });
  }

  console.log(allFiles);

  return (
    <div>
      {/* Hero */}
      <HeroSection />
      {/* File Drop Zone */}
      {allFiles.length < 1 && (
        <FileDropZone
          getRootProps={getRootProps}
          getInputProps={getInputProps}
        />
      )}
      {/* File Viewer */}
      {allFiles.length > 0 && (
        <FileViewer
          handleFileRemove={handleFileRemove}
          handleClearAllFiles={handleClearAllFiles}
          handleFileSending={handleFileSending}
          totalUploadSize={totalUploadSize}
          isSending={isSending}
          files={allFiles}
        />
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

function FileDropZone({ getRootProps, getInputProps }) {
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
  );
}

function FileViewer({
  handleFileRemove,
  handleFileSending,
  handleClearAllFiles,
  totalUploadSize,
  isSending,
  files,
}) {
  return (
    <section className='p-16  w-2/4 mx-auto rounded-2xl  shadow-lg cursor-pointer flex flex-col justify-center items-center bg-white'>
      <FileViewerMeta {...{totalUploadSize,handleClearAllFiles,handleFileSending,isSending,files}} />
      <FileListTableView handleFileRemove={handleFileRemove} files={files} />
    </section>
  );
}

function FileViewerMeta({
  totalUploadSize,
  handleClearAllFiles,
  handleFileSending,
  isSending,
  files,
}) {
  return (
    <section className='w-full my-2 p-2 flex flex-row justify-between items-center'>
      <section>
        <h4 className='text-3xl font-sans-serif font-bold text-center text-heading'>
          Total Files : {files.length}
        </h4>
        <p className='font-sans-serif'>
          {' '}
          Total Size : {bytesToMegaBytes(totalUploadSize)} mb
        </p>
      </section>
      <section>
        <button
          disabled={isSending}
          onClick={handleFileSending}
          className='bg-heading mr-2 text-md text-white shadow-md p-2 font-sans-serif font-bold px-8 rounded-md'
        >
          {isSending ? 'Sending...' : 'Send'}
        </button>
        <button
          onClick={handleClearAllFiles}
          className='bg-white text-md text-heading shadow-md p-2 font-sans-serif font-bold px-8 rounded-md'
        >
          Clear All
        </button>
      </section>
    </section>
  );
}

function FileListTableView({ files, handleFileRemove }) {
  return (
    <table className=' bg-pink-300 rounded-lg'>
      <thead>
        <tr className='font-sans-serif'>
          <th></th>
          <th className='text-start'>File Name</th>
          <th>Type</th>
          <th className='text-right'>Size</th>
          <th></th>
        </tr>
      </thead>
      <tbody className='w-full'>
        {files.map((file, i) => (
          <tr className='w-full mb-1 bg-white p-2' key={file.path}>
            <td className='w-1/12 text-heading font-medium text-center'>
             {i + 1}.
            </td>
            <td className='w-3/6 hover:text-heading text-start'>
              {' '}
              {file.path}
            </td>{' '}
            <td className='w-1/6 text-heading text-center'>
              {file.path.split('.').pop()}
            </td>
            <td className='w-1/6 text-right text-heading font-bold'>
              {bytesToMegaBytes(file.size)} mb
            </td>
            <td className='w-1/12'>
              <Icon
                className='mx-auto'
                icon='ant-design:delete-filled'
                onClick={() => handleFileRemove(i)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Home;
