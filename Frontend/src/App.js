import React  from "react";
import {Link, Routes, Route, BrowserRouter as Router} from 'react-router-dom'
import Home from "./Pages/Home/home";
import Signin from "./Pages/Signin/Signin";
import Signup from "./Pages/Sign-up/Signup"
import Profile from "./Pages/Dashboard/Profile Page/Profile";
import Settings from "./Pages/Settings/Settings";
import Payment from './Pages/Payment/Payment'
import Logout from "./Pages/Logout/Logout";
import MakePayment from "./Pages/MakePayment/MakePayment";
import ListofCreditors from "./Pages/ListofCreditors/ListofCreditors";

function App() {
  return (
    <>
    <Router>
      <Routes>
          <Route exact={true} path='/' element={<Home/>}></Route>
          <Route exact={true} path='signin' element={<Signin/>}></Route>
          <Route exact={true} path='signup' element={<Signup/>}></Route>
          <Route exact={true} path='profile/dashboard' element={<Profile/>}></Route>
          <Route exact={true} path='profile/payment' element={<Payment/>}></Route>
          <Route exact={true} path='profile/settings' element={<Settings/>}></Route>
          <Route exact={true} path='profile/logout' element={<Logout/>}></Route>
          <Route exact={true} path='profile/makepayments' element={<MakePayment/>}></Route>
          <Route exact={true} path='profile/creditors' element={<ListofCreditors/>}></Route>
      </Routes>
    </Router>
    
    </>
  );
}

export default App;
