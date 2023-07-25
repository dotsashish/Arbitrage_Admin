import React from 'react';
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Routes } from '../Constants';

export default function Header() {

  const userFirstName =   localStorage.getItem("UserFristName");
  const userLastName =   localStorage.getItem("UserLastName");

  const handleLogOut = () => {
    let email = localStorage.getItem('RememberMeEmail');
    let password= localStorage.getItem('Password');
    localStorage.clear();
    if(email != null && password != null) {
      localStorage.setItem("RememberMeEmail", email);
      localStorage.setItem("Password", password);
    }
    toast.success("Logged out successfully!", {
      position: toast.POSITION.TOP_CENTER,
    });
        
  };

  const handleToggle = () => {
    const list = document.querySelector("body").classList;
    if (list.contains("toggle-sidebar")) {
      list.remove("toggle-sidebar");
    } else {
      list.add("toggle-sidebar");
    }
  };
  
  // const handleDrop = (e) => {
  //   e.preventDefault();
  //   const list = document.getElementById("header-user-drop-down").classList;
  //   if (list.contains("open")) {
  //     list.remove("open");
  //   } else {
  //     list.add("open");
  //   }
  // };

  return (
    <React.Fragment>
      <header id="header" className="header fixed-top d-flex align-items-center">
        <div className="d-flex align-items-center justify-content-between">
          <a href="/Home" className="header-logo d-flex align-items-center">
            <img src={`/assets/img/arbitrage.svg`} alt="logo" />
          </a>
          <i className="fa-solid fa-bars toggle-sidebar-btn" onClick={handleToggle}></i>
        </div>
        {/* <i className="fa-solid fa-bars toggle-sidebar-btn" onClick={handleToggle}></i> */}
        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            {/* <li className="nav-item dropdown">
              <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                <i className="fa-regular fa-bell" />
                <span className="badge  badge-number">4</span>
              </a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                <li className="dropdown-header">
                  You have 4 new notifications
                  <a href="#"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="notification-item">
                  <i className="bi bi-exclamation-circle text-warning" />
                  <div>
                    <h4>Lorem Ipsum</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>30 min. ago</p>
                  </div>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="notification-item">
                  <i className="bi bi-x-circle text-danger" />
                  <div>
                    <h4>Atque rerum nesciunt</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>1 hr. ago</p>
                  </div>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="notification-item">
                  <i className="bi bi-check-circle text-success" />
                  <div>
                    <h4>Sit rerum fuga</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>2 hrs. ago</p>
                  </div>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="notification-item">
                  <i className="bi bi-info-circle text-primary" />
                  <div>
                    <h4>Dicta reprehenderit</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>4 hrs. ago</p>
                  </div>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="dropdown-footer">
                  <a href="#">Show all notifications</a>
                </li>
              </ul>
            </li> */}
            <li className="nav-item dropdown pe-3">
              <a className="nav-link nav-icon nav-profile d-flex align-items-center pe-0" href="/Home" data-bs-toggle="dropdown">
                <i className="fa-regular fa-user"/>
              </a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6>{userFirstName} {userLastName}</h6>
                  <span>Admin</span>
                  <Link className="nav-link" to={Routes.DEFAULT} onClick={handleLogOut}>
                    <i className="fa-solid fa-arrow-right-to-bracket" />
                    <span> Logout</span>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
    </React.Fragment>
  )
}
