import React from 'react';
import HomePage from './components/homepage/HomePage'
import PrivateRoutes from './components/customeHooks/PrivateRoute';
import AdminCompsPage from './components/adminControls/compCreation/AdminCompsPage';
import AdminNewCompTemplate from './components/adminControls/compCreation/AdminNewCompTemplate';
import AdminControl from './components/adminControls/AdminContrl';
import AdminUsers from './components/adminControls/adminUserSettings/AdminUsers';
import {BrowserRouter, Routes ,Route} from 'react-router-dom'

function App() { 

  return (
    <div className="App">
      <BrowserRouter>
      
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route element={<PrivateRoutes />}>
          <Route path='/AdminContrls' element={<AdminControl />} />
          <Route path='/AdminContrls/AdminComp' exact element={<AdminCompsPage/>}/>
          <Route path='/AdminComp/NewComp' exact element={<AdminNewCompTemplate />} />
          <Route path='/AdminContrls/AdminUsers' exact element={<AdminUsers />} />
        </Route>
      </Routes>

      </BrowserRouter>
      
    </div>
  );
}

export default App;
