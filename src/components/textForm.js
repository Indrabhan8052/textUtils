import React, { useState } from 'react';
import FontPreview from './FontPreview';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ar', name: 'Arabic' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ru', name: 'Russian' },
  { code: 'pt', name: 'Portuguese' },
];

export default function TextForm(props) {
  const { mode } = props;
  const [text, setText] = useState({ placeholder: "Enter the text here", value: "" });
  const [targetLang, setTargetLang] = useState('hi');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translateError, setTranslateError] = useState('');

  const handleUppercase = () => {
    setText({ ...text, value: text.value.toUpperCase() });
  };

  const handleLowercase = () => {
    setText({ ...text, value: text.value.toLowerCase() });
  };

  const handleOnChange = (event) => {
    setText({ ...text, value: event.target.value });
  };

  const handleClear = () => {
    setText({ ...text, value: "" });
    setTranslatedText('');
    setTranslateError('');
  };

  const handleTranslate = async () => {
    if (!text.value.trim()) return;

    setIsTranslating(true);
    setTranslateError('');
    setTranslatedText('');

    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.value)}&langpair=en|${targetLang}`
      );
      const data = await response.json();

      if (data.responseStatus === 200) {
        setTranslatedText(data.responseData.translatedText);
      } else {
        setTranslateError('Translation failed. Try again.');
      }
    } catch (err) {
      setTranslateError('Something went wrong. Check your connection.');
    } finally {
      setIsTranslating(false);
    }
  };

  const wordCount = text.value.trim() === "" ? 0 : text.value.trim().split(/\s+/).length;

  return (
    <>
      <div className="container my-3">
        <div className="mb-3">
          <label htmlFor="myBox" className="form-label">Enter The Text Analyzer</label>
          <textarea
            className="form-control"
            id="myBox"
            rows="8"
            value={text.value}
            onChange={handleOnChange}
            placeholder={text.placeholder}
          ></textarea>

          <button className="btn btn-primary my-3 mx-2" onClick={handleUppercase}>Convert to Uppercase</button>
          <button className="btn btn-primary my-3 mx-2" onClick={handleLowercase}>Convert to Lowercase</button>
          <button className="btn btn-danger my-3 mx-2" onClick={handleClear}>Clear Text</button>
        </div>

        {/* Translate section */}
        <div className="mb-4">
          <h2>Translate</h2>
          <div className="row g-2 align-items-center mb-2">
            <div className="col-auto">
              <select
                className="form-select"
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
            </div>
            <div className="col-auto">
              <button
                className="btn btn-success"
                onClick={handleTranslate}
                disabled={!text.value.trim() || isTranslating}
              >
                {isTranslating ? 'Translating...' : 'Translate'}
              </button>
            </div>
          </div>

          {translateError && <p className="text-danger">{translateError}</p>}

          {translatedText && (
            <div className="p-3 border rounded">
              <strong>Translated ({languages.find(l => l.code === targetLang)?.name}):</strong>
              <p className="mb-0 mt-2">{translatedText}</p>
            </div>
          )}
        </div>
      </div>

      <div className="container">
        <h2>Your Text Summary</h2>
        <p>{wordCount} words and {text.value.length} characters</p>
        <p>{(0.008 * wordCount).toFixed(2)} Minutes Read</p>
        <h2>Preview</h2>
        <p>{text.value}</p>

        <FontPreview text={text.value} mode={mode} />
      </div>
    </>
  );
}