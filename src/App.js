import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home'; // We will create this file
import ShowDetail from './ShowDetail'; // We will create this file
import './App.css'; 

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>My TV Show App</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/show/:id" element={<ShowDetail />} /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;