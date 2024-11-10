import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Create a root element
const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot

// Render the app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register the service worker to enable offline functionality and faster loading
serviceWorker.register();
