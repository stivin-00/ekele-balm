import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import App from './App';
import { GoogleOAuthProvider } from "@react-oauth/google";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <GoogleOAuthProvider clientId="79486496815-n56u6j58qcohk5gl5q547m8n4brotpop.apps.googleusercontent.com">
        
      
        <App />
      </GoogleOAuthProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
