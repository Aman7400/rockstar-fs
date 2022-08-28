import Appbar from './Appbar';
import Footer from './Footer';
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen w-screen bg-[url('/bg.svg')] bg-cover bg-no-repeat">
      <Appbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
