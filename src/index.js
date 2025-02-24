import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { MapsProvider } from './context/MapsContext';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <MapsProvider>
        <App />
      </MapsProvider>
    </Provider>
  </React.StrictMode>
);