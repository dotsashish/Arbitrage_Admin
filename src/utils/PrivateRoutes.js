import React from 'react';
import Home from '../Layout/Home'
import { JWT } from '../Components/Shared/'

import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    const isValidToken = JWT.isValidToken();
    return(
        isValidToken? <Home> <Outlet/> </Home>  : <Navigate to="/"/>
    )
}

export default PrivateRoutes