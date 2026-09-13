import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Core Design Foundation & Section Stylesheets
import './styles/variables.css';
import './styles/base.css';
import './styles/hero.css';
import './styles/section2-handoff.css';
import './styles/bounties-map.css';
import './styles/section4-field-table.css';
import './styles/showdown.css';
import './styles/expedition-trail.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
