import './App.css';
import React, { Component } from 'react';
import Appbar from './components/Appbar';
import Student from "./components/Student";
import AddStudent from "./components/AddStudent";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditStudent from './components/EditStudent';

function App() {
  return (
    <div className="App">
      <Router>
        <Appbar />
        <Routes>
          <Route exact path='/' element={<Student />}></Route>
          <Route exact path='/addStudent' element={<AddStudent />}></Route>
          <Route exact path='/editStudent/:id' element={<EditStudent />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
