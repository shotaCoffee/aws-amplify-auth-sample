import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './page/App';

// NOTE 追加
import Amplify from 'aws-amplify'
import config from './aws-exports'

// NOTE 設定を読み込む
Amplify.configure(config);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
