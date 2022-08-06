import React from 'react';
import ReactDOM from 'react-dom/client';
// import './styles.css';
import './index.css';
import BoardOld from "./Board-old";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/*<BoardOld />*/}
    <App />
  </React.StrictMode>
);
