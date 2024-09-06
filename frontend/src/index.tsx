import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { UploadContextProvider } from './pages/upload/UploadContext.tsx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UploadContextProvider>
        <App />
      </UploadContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
