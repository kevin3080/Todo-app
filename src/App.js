import React from 'react';
import './App.scss';
import { useSelector } from 'react-redux';
import {selectDarkMode } from './features/slices/themeSlice';


import { Todos } from './Components/Todos';

function App() {
  const darkMode = useSelector(selectDarkMode);


  return (
    <div className={`app ${darkMode ? 'whiteBg' : ''}`}>
      <div className={`header ${darkMode ? 'whiteBg' : ''}`}></div>
      <Todos />
    </div>
  );
}

export default App;
