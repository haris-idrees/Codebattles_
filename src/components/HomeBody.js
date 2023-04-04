import React, { Component } from 'react';
import '../components/HomeBody.css';

export default class HomeBody extends Component {
  render() {
    return (
        <>
            <div className="body">
                <h1>Join the <span>Battle</span></h1>
                <button>Get Started</button>
            </div>
        </>
    );
  }
}
