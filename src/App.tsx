import React from 'react';

import './App.css';
import { HashRouter, Link, Route, Routes } from 'react-router-dom';
import Login from './pages/login/login';
import Dashboard from './pages/dashboard/dashboard';
import Jobs from './pages/jobs/jobs';
import Flow from './pages/flow/flow';
import CodeRecipe from './pages/recipe/coderecipe';
import DataRecipe from './pages/recipe/datarecipe';

function App() {
  return (
    <HashRouter>
      <Routes>
      
        <Route path="/" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/jobs" element={<Jobs/>}/>
        <Route path="/flow" element={<Flow/>}/>
        <Route path="/coderecipe" element={<CodeRecipe/>}/>
        <Route path="/datarecipe" element={<DataRecipe/>}/>
        </Routes>

        </HashRouter>
    
  );
}

export default App;
