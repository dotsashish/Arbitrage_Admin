import React from 'react'
import Header from "./Header";
import SideBar from "./SideBar";
import Footer from "./Footer";
import { Outlet } from 'react-router-dom';

export default function Home() {
  return (
    <React.Fragment>
        <Header/>
        <SideBar/>
        <main id="main" className="main">
        <Outlet/>
        </main>
        <Footer/>
    </React.Fragment>
  )
}
