import React, { useEffect } from 'react'
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const Account = () => {
    const navigate = useNavigate();
    const route = useLocation();
    const { user } = useSelector((state) => state.authStore)
    useEffect(() => {
        if (!user) {
            navigate('/login')
        }

    }, [navigate, user])

    function activeRoute(location) {

        let baseClasses = 'py-3 md:py-2 lg:py-2 px-1 md:px-4 lg:px-4 inline-flex gap-1 items-center bg-gray-300 rounded-full ease-in duration-500 text-xs  md:text-lg lg:text-xl'
        if (location === route.pathname.split('/')[2] || (location === 'profile' && route.pathname.split('/')[2] === undefined)) {
            return baseClasses += ' active-route'
        }
        return baseClasses
    }


    return (
        <>
            <nav className='w-full flex justify-center mt-8 gap-2 md:gap-4 lg:gap-4 '>
                <Link className={activeRoute('profile')} to={''}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 md:w-6 md:h-6 lg:w-6 lg:h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    My Profile

                </Link>
                <Link className={activeRoute('bookings')} to={'bookings'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 md:w-6 md:h-6 lg:w-6 lg:h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    My Bookings
                </Link>
                <Link className={activeRoute('accommodations')} to={'accommodations'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 md:w-6 md:h-6 lg:w-6 lg:h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
                    </svg>
                    My Accommodations
                </Link>
            </nav>
            <Outlet />

        </>

    )
}

export default Account