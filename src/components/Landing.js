import './css/App.css';
import Card from './Card';
import Scan from './Scan';
import React from 'react';
import NavBar from './NavBar'
import AllTab from "./AllTab";
import Footer from './Footer'
function Landing() {
  
  return (
    <div className="App">
      <NavBar />
      <AllTab />
      <Card />
      <Scan />
      <Footer />
    </div>
  );
}


export default Landing;
