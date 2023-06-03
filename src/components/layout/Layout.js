import React from 'react';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import Dashboard from '../../pages/dashboard/Dashboard';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div style={{ minHeight: '20vh' }} className="--pad">
        {children}
      </div>
      <Dashboard/>
      <Footer />
    </>
  );
};

export default Layout;
