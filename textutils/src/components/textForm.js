import React from 'react'
import { useState } from 'react';

export default function TextForm() {
  const [text, setText] = useState({placeholder: "Enter the text here", value: ""});

  const handleUppercase = () => {
    setText({...text, value: text.value.toUpperCase()});
  };
  const handleOnChange = (event) => {
    setText({...text, value: event.target.value});
  }

    const handleLowercase = () => {
        setText({...text, value: text.value.toLowerCase()});
    }
  return (
    <>
    <div className="container my-3">
      <div className="mb-3">
        <label htmlFor="myBox" className="form-label">Enter The Text Analyzer</label>
        <textarea className="form-control" id="myBox" rows="8" value={text.value} onChange={handleOnChange} placeholder={text.placeholder}></textarea>
        <button className="btn btn-primary my-3" onClick={handleUppercase}>Convert to Uppercase</button>
        <button className="btn btn-primary my-3" onClick={handleLowercase}>Convert to Lowercase</button>
      </div>
    </div>

    <div className="container">
      <h2>Your Text Summary</h2>
      <p>{text.value.split(" ").length} words and {text.value.length} characters</p>
      <p>{0.008 * text.value.split(" ").length} Minutes Read</p>
      <h2>Preview</h2>
      <p>{text.value}</p>
    </div>

   </>   
  )
}

  
