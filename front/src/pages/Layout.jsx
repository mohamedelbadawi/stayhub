import React, { useEffect } from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';


const Layout = () => {

    return (
        <div className='p-4 flex flex-col min-h-screen'>
            <Header />
            <Toaster position='top-right' reverseOrder={false} />
            <Outlet />

        </div>
    )
}

export default Layout