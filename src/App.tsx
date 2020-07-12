import React from 'react';
import './App.css';

import {BrowserRouter as Router, Route} from 'react-router-dom';
import SignUp from './SignUp';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path={'/signup'} component={SignUp} />
      </Router>
    </div>
  );
}

// NOTE 追加
export default App;
