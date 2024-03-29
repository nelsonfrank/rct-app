import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import reportWebVitals from './reportWebVitals';
import App from './app';
// import Chats from './app/users/components/chat';
import { Provider } from 'react-redux';
import store from './redux/configureStore';
import AuthProvider from './auth/Auth';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
