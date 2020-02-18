import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import "./App.css";
import Navbar from './Navbar'
import Footer from './Footer'
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
        </div>
        {/* {localStorage.user ?
          <div className='footer'>
            <Footer />
          </div>
          : null} */}
      </BrowserRouter>
    );
  }
}
export default App;
