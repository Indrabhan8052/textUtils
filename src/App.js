import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TextForm from './components/textForm';
import './App.css';

function App() {
  const [mode, setMode] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
    localStorage.setItem('theme', mode);
  }, [mode]);

  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <Navbar mode={mode} toggleMode={toggleMode} />
      <div className="container my-3">
        <TextForm mode={mode} />
      </div>
    </>
  );
}

export default App;