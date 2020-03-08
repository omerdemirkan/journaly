import React from 'react';
import logo from './logo.svg';
import './App.css';

import {Route} from 'react-router-dom';

// Pages

import SignUp from './pages/SignUp/SignUp';
import Rate from './pages/Rate/Rate';
import FormDataComponent from './components/form-data.component';

function App() {
  return (
    <div className="App">
      <Route path='/sign-up' component={SignUp}/>
      <Route path='/rate/:journalistId'/>
     
    </div>
  );
}

export default App;
