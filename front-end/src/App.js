import React from 'react';
import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import withSplashScreen from './hoc/withSplashScreen/withSplashScreen';

import Navbar from './components/Navbar/Navbar';

import {Route} from 'react-router-dom';

// Pages

import SignUp from './pages/SignUp/SignUp';
import Rate from './pages/Rate/Rate';

function App() {
  return <>
    <Navbar/>
    <div className="App">
      <Route path='/sign-up'component={SignUp}/>
      <Route path='/rate/:journalistId' component={Rate}/>
    </div>
  </>
}

export default withSplashScreen(App);
