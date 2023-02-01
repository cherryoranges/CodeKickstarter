import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Package for multi-page routing our single web app
import {BrowserRouter} from 'react-router-dom';

// The various pages will be displayed by the `PageSwitcher` component in App.
ReactDOM.render(
  <BrowserRouter>
    	<App />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

