import React, { Component } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import '../components/Home.css';
import HomeBody from './HomeBody';


export default class Home extends Component {
  render() {
    return (
      <div className='hero'>
        <Navbar/>
        <div className='body'>
          <HomeBody/>
        </div>
        <Footer/> 
      </div>
    )
  }
}
