import React from 'react'

export default function Navbar({ mode, toggleMode }) {
  return (
    <nav className={`navbar navbar-expand-lg ${mode === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-primary'}`}>
      <div className="container-fluid">
        <a className="navbar-brand text-white" href="/">TextUtils</a>

        <div className="form-check form-switch text-white">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="themeSwitch"
            checked={mode === 'dark'}
            onChange={toggleMode}
          />
          <label className="form-check-label text-white" htmlFor="themeSwitch">
            {mode === 'dark' ? 'Dark Mode' : 'Light Mode'}
          </label>
        </div>
      </div>
    </nav>
  )
}