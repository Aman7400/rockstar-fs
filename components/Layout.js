import Appbar from './Appbar';
import Footer from './Footer';
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="h-screen w-screen bg-[url('/bg.svg')] bg-cover bg-no-repeat">
      <Appbar />
      <div className="px-16">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
