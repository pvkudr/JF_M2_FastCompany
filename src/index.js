import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './app/App';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from './app/store/createStore';
import { Provider } from 'react-redux';

const store = createStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>

    <BrowserRouter>
        <React.StrictMode>
                <App />
        </React.StrictMode>
    </BrowserRouter>
        </Provider>
);

reportWebVitals();
