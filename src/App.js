import React, { useState } from 'react';

import { getWeather } from './infrastructure/api';
import { AppProvider } from './ui/context';

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { MainView } from './ui/views/Main';

export const App = () => {
  const [state, setState] = useState();

  return (
    <AppProvider state={state} setState={setState}>
        <MainView />
    </AppProvider>
  );
};
