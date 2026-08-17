import React, { useState, useMemo } from 'react'

const fonts = [
  // Sans-serif
  { name: 'Roboto', family: "'Roboto', sans-serif", category: 'Sans-serif' },
  { name: 'Poppins', family: "'Poppins', sans-serif", category: 'Sans-serif' },
  { name: 'Open Sans', family: "'Open Sans', sans-serif", category: 'Sans-serif' },
  { name: 'Lato', family: "'Lato', sans-serif", category: 'Sans-serif' },
  { name: 'Montserrat', family: "'Montserrat', sans-serif", category: 'Sans-serif' },
  { name: 'Inter', family: "'Inter', sans-serif", category: 'Sans-serif' },
  { name: 'Nunito', family: "'Nunito', sans-serif", category: 'Sans-serif' },
  { name: 'Raleway', family: "'Raleway', sans-serif", category: 'Sans-serif' },

  // Serif
  { name: 'Merriweather', family: "'Merriweather', serif", category: 'Serif' },
  { name: 'Playfair Display', family: "'Playfair Display', serif", category: 'Serif' },
  { name: 'Lora', family: "'Lora', serif", category: 'Serif' },
  { name: 'PT Serif', family: "'PT Serif', serif", category: 'Serif' },
  { name: 'Bitter', family: "'Bitter', serif", category: 'Serif' },

  // Display / bold
  { name: 'Oswald', family: "'Oswald', sans-serif", category: 'Display' },
  { name: 'Bebas Neue', family: "'Bebas Neue', sans-serif", category: 'Display' },
  { name: 'Anton', family: "'Anton', sans-serif", category: 'Display' },
  { name: 'Archivo Black', family: "'Archivo Black', sans-serif", category: 'Display' },

  // Handwriting
  { name: 'Lobster', family: "'Lobster', cursive", category: 'Handwriting' },
  { name: 'Pacifico', family: "'Pacifico', cursive", category: 'Handwriting' },
  { name: 'Dancing Script', family: "'Dancing Script', cursive", category: 'Handwriting' },
  { name: 'Caveat', family: "'Caveat', cursive", category: 'Handwriting' },
  { name: 'Great Vibes', family: "'Great Vibes', cursive", category: 'Handwriting' },
  { name: 'Satisfy', family: "'Satisfy', cursive", category: 'Handwriting' },
  { name: 'Shadows Into Light', family: "'Shadows Into Light', cursive", category: 'Handwriting' },

  // Monospace
  { name: 'Roboto Mono', family: "'Roboto Mono', monospace", category: 'Monospace' },
  { name: 'Source Code Pro', family: "'Source Code Pro', monospace", category: 'Monospace' },
  { name: 'JetBrains Mono', family: "'JetBrains Mono', monospace", category: 'Monospace' },
  { name: 'Fira Code', family: "'Fira Code', monospace", category: 'Monospace' },
  { name: 'Space Mono', family: "'Space Mono', monospace", category: 'Monospace' },
];

const categories = ['All', 'Sans-serif', 'Serif', 'Display', 'Handwriting', 'Monospace'];

export default function FontPreview({ text, mode }) {
  const [size, setSize] = useState(24);
  const [color, setColor] = useState('#000000');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [selectedFont, setSelectedFont] = useState(null);

  const isDark = mode === 'dark';

  const filteredFonts = useMemo(() => {
    return fonts.filter(font => {
      const matchesSearch = font.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'All' || font.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const copyCSS = (font) => {
    const css = `font-family: ${font.family};`;
    navigator.clipboard.writeText(css);
    alert(`Copied: ${css}`);
  };

  return (
    <div className="my-4">
      <h2>Font Preview</h2>

      {!text ? (
        <p className="text-muted">Enter some text above to preview fonts.</p>
      ) : (
        <>
          {/* Controls */}
          <div className="row mb-3 g-2 align-items-center">
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                placeholder="Search fonts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <input
                type="color"
                className="form-control form-control-color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                title="Text color"
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="fontSize" className="form-label">Font size: {size}px</label>
            <input
              type="range"
              id="fontSize"
              min="12"
              max="72"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="form-range"
            />
          </div>

          {/* Selected font showcase */}
          {selectedFont && (
            <div
              className="p-4 mb-4 rounded shadow-sm"
              style={{
                backgroundColor: isDark ? '#1e1e1e' : '#f8f9fa',
                border: '2px solid #0d6efd'
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <strong>{selectedFont.name}</strong>
                <button className="btn btn-sm btn-outline-primary" onClick={() => copyCSS(selectedFont)}>
                  Copy CSS
                </button>
              </div>
              <p style={{
                fontFamily: selectedFont.family,
                fontSize: `${size}px`,
                color: isDark ? '#fff' : color,
                margin: 0
              }}>
                {text}
              </p>
            </div>
          )}

          {/* Font grid */}
          <div className="row">
            {filteredFonts.length === 0 && (
              <p className="text-muted">No fonts match your search.</p>
            )}
            {filteredFonts.map((font) => (
              <div key={font.name} className="col-md-6 mb-3">
                <div
                  className={`p-3 border rounded h-100 ${selectedFont?.name === font.name ? 'border-primary border-2' : ''}`}
                  style={{
                    cursor: 'pointer',
                    backgroundColor: isDark ? '#1e1e1e' : '#fff'
                  }}
                  onClick={() => setSelectedFont(font)}
                >
                  <div className="d-flex justify-content-between">
                    <small className="text-muted">{font.name}</small>
                    <small className="text-muted">{font.category}</small>
                  </div>
                  <p style={{
                    fontFamily: font.family,
                    fontSize: `${size}px`,
                    color: isDark ? '#fff' : color,
                    margin: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}