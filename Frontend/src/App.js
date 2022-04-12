import React  from "react";
import {Link, Routes, Route, BrowserRouter as Router} from 'react-router-dom'
import Home from "./Pages/Home/home";
import Signin from "./Pages/Signin/Signin";
import Signup from "./Pages/Sign-up/Signup"
import Profile from "./Pages/Dashboard/Profile Page/Profile";
import Settings from "./Pages/Settings/Settings";
import Payment from './Pages/Payment/Payment'
function App() {
  return (
    <>
    <Router>
      <Routes>
          <Route exact={true} path='/' element={<Home/>}></Route>
          <Route exact={true} path='signin' element={<Signin/>}></Route>
          <Route exact={true} path='signup' element={<Signup/>}></Route>
          <Route exact={true} path='profile' element={<Profile/>}></Route>
          <Route exact={true} path='profile/payment' element={<Payment/>}></Route>
          <Route exact={true} path='profile/settings' element={<Settings/>}></Route>
      </Routes>
    </Router>
    
    </>
  );
}

export default App;
