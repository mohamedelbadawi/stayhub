import React, { useEffect } from 'react'
import Auth from './AuthMiddleware'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AuthRoute = () => {

    const { user } = useSelector((state) => state.authStore)
    const isLoggedIn = user;

    return (
        <>
            <Auth />
            {isLoggedIn ? <Outlet /> : <Navigate to={'/login'} />}
        </>
    )
}

export default AuthRoute