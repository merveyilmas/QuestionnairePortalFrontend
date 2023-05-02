import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from './store/ConfigureStore';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = configureStore()
root.render(
    //<React.StrictMode>
       
       <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
        
    //</React.StrictMode>
);

reportWebVitals();
