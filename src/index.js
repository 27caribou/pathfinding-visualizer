import React from 'react';
import ReactDOM from 'react-dom/client';
// import './styles.css';
import Board from "./Board";
import './index.css';
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/*<Board />*/}
    <App />
  </React.StrictMode>
);
