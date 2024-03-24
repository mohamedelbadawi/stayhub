import React from 'react'
import Auth from './AuthMiddleware'
import { Outlet, Navigate } from 'react-router-dom'

const GuestRoute = () => {
    const isLoggedIn = Auth();
    return (isLoggedIn ? <Navigate replace to={'/'} /> : <Outlet />)
}

export default GuestRoute