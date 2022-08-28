import React from 'react';

const Footer = () => {
  return (
    <div className='p-5 flex flex-col justify-center items-center'>
      <h1 className='font-sans-serif text-xl text-white '>
        A Product of {' '}
        <span className='font-bold cursor-pointer drop-shadow-sm text-heading'>
          Rockstar Technologies
        </span>
      </h1>
      <p className='font-sans-serif text-md font-semibold text-white'>
        All rights reserved. &copy; {new Date().getFullYear()}
      </p>
    </div>
  );
};

export default Footer;
