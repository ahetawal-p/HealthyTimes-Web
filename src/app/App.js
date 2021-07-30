import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {Header} from '../components/Header';

import { CircularProgress } from '@material-ui/core';

import './App.css';
import { Fragment } from 'react';

function App() {
const loadingElement = (
    <div className="loading">
      <CircularProgress />
      <p>One moment please...</p>
    </div>
  );

  return (
    <BrowserRouter>
      <Fragment>
        <Suspense fallback={loadingElement}>
          <Header />
        </Suspense>
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
