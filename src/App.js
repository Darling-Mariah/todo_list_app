
import Conection from './Conection'
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Inscription from './Inscription';
import Accueil from './Accueil';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Routes>
       <Route path='/' element = {<Conection/>}> </Route>
       <Route path='/inscription' element = {<Inscription/>}> </Route>
       <Route path='/Accueil' element = {<Accueil/>}> </Route>

    </Routes>
      
       
    </BrowserRouter>
   
  
   
  );
}

export default App;
