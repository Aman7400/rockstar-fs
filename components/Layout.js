import Appbar from './Appbar';
import { ChakraProvider } from '@chakra-ui/react';
import Footer from './Footer';
import React from 'react';

const Layout = ({ children }) => {
  return (
    <ChakraProvider>
      <div className="min-h-screen w-screen bg-[url('/bg.svg')] bg-cover bg-no-repeat">
        <Appbar />
        <div className='px-16'>{children}</div>
        <Footer />
      </div>
    </ChakraProvider>
  );
};

export default Layout;
