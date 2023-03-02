import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './app/store.js';
import App from './app/App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './features/context/AuthProvider.js';

const root = createRoot(document.getElementById('app'));

root.render(
  <Router>
    {/* <AuthProvider> */}
      <Provider store={store}>
        <App />
      </Provider>
    {/* </AuthProvider> */}
  </Router>
);
