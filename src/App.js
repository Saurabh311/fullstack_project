import './App.css';
import React, { Component } from 'react';
import Appbar from './components/Appbar';
import Student from "./components/Student";
import AddStudent from "./components/AddStudent";
import Register from "./components/Register";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditStudent from './components/EditStudent';
import Login from './components/Login';
 
function App() {
  return (
    <div className="App">
      <Router>
        <Appbar />
        <Routes>    
        <Route exact path='/' element={<Login />}></Route>
          <Route exact path='/student' element={<Student />}></Route>
          <Route exact path='/addStudent' element={<AddStudent />}></Route>
          <Route exact path='/editStudent/:id' element={<EditStudent />}></Route>
          <Route exact path='/register' element={<Register />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
