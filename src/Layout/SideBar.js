import React from 'react'
import { Routes } from '../Constants';
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function SideBar() {

  const { pathname } = useLocation();
  const splitLocation = pathname.split("/");

  const id = localStorage.getItem("UserId");
  const navigate = useNavigate();

  const handleDrop = (e) => {
    e.preventDefault();
    const list1 = document.getElementById("submenu").classList;
    if (!list1.contains("show")) {
      list1.add("show");
    } else if(list1.contains("show")) {
      list1.remove("show");
    }
  };

  // const redirectProfileHandle = (e) => {
  //   e.preventDefault();
  //   const id = localStorage.getItem("UserId");
  //   if(id != null){
  //     navigate(`/Profile/${id}`);
  //   }
  //   else {
  //     navigate(`/Profile/${Id}`);
  //   }
    
  //};


  return (
    <React.Fragment>
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <Link className={`nav-link ${pathname === "/Home" ? "collapsed active" : ""} `} to={Routes.DASHBOARD}>
            <i className={`fa-solid fa-dashboard ${pathname === "/Home" ? "collapsed active" : ""} `}/>
            <span>Dashboard</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${splitLocation[1] === "User" ? "collapsed active" : ""} `} to={Routes.USER}>
            <i className={`fa-solid fa-users ${splitLocation[1] === "User" ? "collapsed active" : ""} `}></i>
            <span>Users</span>
          </Link>
        </li>
        {/*  <li className="nav-item">
          <Link className={`nav-link ${splitLocation[1] === "Report" ? "collapsed active" : ""} `} to={Routes.REPORT}>
          <i className={`fa-solid fa-user-lock  ${splitLocation[1] === "Report" ? "collapsed active" : ""} `}></i>
            <span>Reports</span>
          </Link>
        </li> */}
        <li className="nav-item">
          <Link className={`nav-link ${splitLocation[1] === "Profile" ? "collapsed active" : ""} `} to={`/Profile/${id}`}>
          <i className={`fa-solid fa-user  ${splitLocation[1] === "Profile" ? "collapsed active" : ""} `}></i>
            <span>Profile</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${splitLocation[1] === "contact" ? "collapsed active" : ""} `} to={Routes.CONTACT}>
            <i className={`fa-solid fa-address-book  ${splitLocation[1] === "contact" ? "collapsed active" : ""} `}></i>
            <span>Contacts</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${splitLocation[1] === "TradeFee" ? "collapsed active" : ""} `} to={Routes.TRADEFEE}>
            <i className={`fa-solid fa-money-check-dollar ${splitLocation[1] === "TradeFee" ? "collapsed active" : ""} `}></i>
            <span>Trade Fee</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${splitLocation[1] === "TradeCurrency" ? "collapsed active" : ""} `} to={Routes.TRADECURRENCY}>
            <i className={`fa-solid fa-money-check-dollar ${splitLocation[1] === "TradeCurrency" ? "collapsed active" : ""} `}></i>
            <span>Trade Currency</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${splitLocation[1] === "Notification" ? "collapsed active" : ""} `} to={Routes.NOTIFICATION}>
            <i className={`fa-sharp fa-solid fa-bell ${splitLocation[1] === "Notification" ? "collapsed active" : ""} `}></i>
            <span>Notifications</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${splitLocation[1] === "ChangePassword" ? "collapsed active" : ""} `} to={Routes.CHANGEPASSWORD}>
          <i className={`fa-solid fa-unlock ${splitLocation[1] === "ChangePassword" ? "collapsed active" : ""} `}></i>
            <span>Change Password</span>
          </Link>
        </li>
        {/*  */}
        <li className="nav-item">
          <Link className="nav-link dropdown-toggle"
             data-bs-toggle="collapse" data-target="#submenu" aria-controls="submenu" aria-expanded="true" onClick={handleDrop}>
            <i className="fa-solid fa-list-check"></i>
            Content Management
          </Link>
          <div id="submenu" className="collapse submenu">
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link className={`nav-link ${splitLocation[1] === "Platform" ? "collapsed active" : ""} `} to={Routes.PLATFORM}>
                  <i className={`fa fa-info-circle ${splitLocation[1] === "Platform" ? "collapsed active" : ""} `}></i>
                  <span>Platform Description</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${splitLocation[1] === "AboutUs" ? "collapsed active" : ""} `} to={Routes.ABOUTUS}>
                  <i className={`fa-solid fa-address-card ${splitLocation[1] === "AboutUs" ? "collapsed active" : ""} `}></i>
                  <span>About Us</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${splitLocation[1] === "PrivacyPolicy" ? "collapsed active" : ""} `} to={Routes.PRIVACYPOLICY}>
                <i className={`fa-solid fa-lock ${splitLocation[1] === "PrivacyPolicy" ? "collapsed active" : ""} `}></i>
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${splitLocation[1] === "TermsConditions" ? "collapsed active" : ""} `} to={Routes.TERMSCONDITIONS}>
                  <i className={`fa-solid fa-money-check-dollar ${splitLocation[1] === "TermsConditions" ? "collapsed active" : ""} `} ></i>
                  <span>Terms & Conditions</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${splitLocation[1] === "Banners" ? "collapsed active" : ""} `} to={Routes.BANNERS}>
                  <i className={`fa-solid fa-image ${splitLocation[1] === "Banners" ? "collapsed active" : ""} `}></i>
                  <span>Banners</span>
                </Link>
              </li>
            </ul>
          </div>
         
        </li>
      </ul>
    </aside>
  </React.Fragment>
  )
}
