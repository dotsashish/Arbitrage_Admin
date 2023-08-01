import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Components/Login/Login';
import ForgotPassword from './Components/Login/ForgotPassword';
import ResetPassword from './Components/Login/RestPassword';
import Dashboard from './Layout/Dashboard'
import Contact from "./Components/Contact/Contact";
import Profile from "./Components/Profile/Profile";
import EditProfile from "./Components/Profile/EditProfile";
import TermsConditions from "./Components/Term/Term";
import Banners from "./Components/Banner/Banners";
import Platform from "./Components/Platform/Platform";
import AboutUs from "./Components/About/AboutUs";
import PrivacyPolicy from "./Components/Privacy/PrivacyPolicy";
import Notification from "./Components/Notification/Notification";
import TradeFee from "./Components/TradeFee/TradeFee";
import TradeCurrency from "./Components/TradeCurrency/TradeCurrency";
import User from "./Components/User/User";
// import Report from "./Components/Report/Report";
import Loader from "./Components/Loader/Loader";
import ChangePassword from "./Components/ChangePassword/ChangePassword";
import PrivateRoutes from './utils/PrivateRoutes';
import Error from './Components/Error/Error';


function App() {
  return (
    <BrowserRouter basename='/admin'> 
     <ToastContainer />
      <Loader />
      <Routes>
      
        <Route path = '/' element={<Login/>}/>
        <Route path = '/ForgotPassword' element={<ForgotPassword/>}/>
        <Route path = '/ResetPassword/:token' element={<ResetPassword/>} />

        <Route element={<PrivateRoutes />}>
          <Route path = '/Home' element={<Dashboard/>}/>
          <Route path = '/CONTACT' element={<Contact/>}/>
          <Route path = '/PROFILE/:id' element={<Profile/>}/>
          <Route path = '/EDITPROFILE' element={<EditProfile/>}/>
          <Route path = '/TERMSCONDITIONS' element={<TermsConditions/>}/>
          <Route path = '/Banners' element={<Banners/>}/>
          <Route path = '/Platform' element={<Platform/>}/>
          <Route path = '/AboutUs' element={<AboutUs/>}/>
          <Route path = '/PrivacyPolicy' element={<PrivacyPolicy/>}/>
          <Route path = '/Notification' element={<Notification/>}/>
          <Route path = '/TradeFee' element={<TradeFee/>}/>
          <Route path = '/TradeCurrency' element={<TradeCurrency/>}/>
          <Route path = '/User' element={<User/>}/>
          {/* <Route path = '/Report' element={<Report/>}/> */}
          <Route path = '/ChangePassword' element={<ChangePassword/>}/>
          <Route path = '/*' element={<Error/>}/>
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
