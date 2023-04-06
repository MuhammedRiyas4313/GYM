import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));

let persistor = persistStore(store)

root.render(
<BrowserRouter>
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}></PersistGate>
     <App />
    </Provider>
  </React.StrictMode>
</BrowserRouter>
);
