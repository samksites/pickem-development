import React from 'react';
import HomePage from './components/homepage/HomePage';
import SignInPage from './components/accountLogin/SignInPage';
import CompetitionsPage from './components/competitionsPage/CompetitionsPage.js';
import AdminPage from './components/adminPage/AdminPage';
import {BrowserRouter, Routes ,Route} from 'react-router-dom';


function App() { 

  return (
    <div className="App">
      <BrowserRouter>
      
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/SignInPage' element={<SignInPage/>} />
        <Route path='/competitionsPage' element={<CompetitionsPage page={'competition'} />} />
        <Route path='/adminPage' exact element={<AdminPage/>}/>

      </Routes>

      </BrowserRouter>
      
    </div>
  );
}

export default App;
