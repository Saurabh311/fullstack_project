import './App.css';
import React, { Component }  from 'react';
import Appbar from './components/Appbar';
import Student from "./components/Student";

function App() {
  return (
    <div className="App">      
       <Appbar/> 
       <Student />     
    </div>
  );
}

export default App;
