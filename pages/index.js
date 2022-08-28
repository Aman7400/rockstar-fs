/* eslint-disable @next/next/no-img-element */
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast
} from '@chakra-ui/react';

import { Icon } from '@iconify/react';
import React from 'react';
import { useDropzone } from 'react-dropzone';

const bytesToMegaBytes = (bytes) => Number(bytes / 1024 ** 2).toFixed(2);

const Home = () => {
  const [allFiles, setAllFiles] = React.useState([]);

  const toast = useToast()

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
      generateToast("Files Uploaded for Sharing ✅")
    }, 3000);
  }

  function generateToast(message) {
     toast({
      position: 'bottom-right',
      render: () => (
        <div className='bg-white p-2 font-bold px-4 rounded-sm font-sans-serif shadow-lg text-heading'>
          <p>{message}</p>
        </div>
      ),
    });
  }

  function handleClearAllFiles() {
    setAllFiles([]);
    generateToast("All Files Removed")
  }
  function handleFileRemove(index) {
    setAllFiles((prev) => {
      return prev.filter((f, i) => i !== index);
    });
    generateToast('File removed');
  }


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
      className='p-16 my-8 w-[900px] mx-auto rounded-2xl  shadow-lg cursor-pointer flex flex-col justify-center items-center bg-white'
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
    <section className='p-16 w-[900px] max-h-[480px] mx-auto rounded-2xl  shadow-lg cursor-pointer flex flex-col justify-center items-center bg-white'>
      <FileViewerMeta
        {...{
          totalUploadSize,
          handleClearAllFiles,
          handleFileSending,
          isSending,
          files,
        }}
      />
      <FileTableView handleFileRemove={handleFileRemove} files={files} />
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
    <section className='w-full  mb-8 p-2 flex flex-row justify-between items-center'>
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

function FileTableView({ files, handleFileRemove }) {
  return (
    <TableContainer overflowY='scroll'>
      <Table size='md' variant='simple'>
        <Thead>
          <Tr>
            <Th ></Th>
            <Th >File Name</Th>
            <Th >Type</Th>
            <Th  isNumeric>Size</Th>
            <Th isNumeric></Th>
          </Tr>
        </Thead>
        <Tbody>
          {files.map((file, i) => (
            <Tr key={i}>
              <Td >{i + 1}.</Td>
              <Td title={file.path} >{file.path.length > 48 ? `${file.path.slice(0,44)}...` : file.path}</Td>
              <Td >{file.path.split('.').pop()}</Td>
              <Td isNumeric>
                {bytesToMegaBytes(file.size)} mb
              </Td>
              <Td>
                <Icon
                  className='mx-auto text-heading'
                  icon='ant-design:delete-filled'
                  onClick={() => handleFileRemove(i)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}


export default Home;
