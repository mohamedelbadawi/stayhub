import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addSearchQuery, getPlaces } from '../redux/PlaceSlice'

const Header = () => {
    const { user } = useSelector((state) => state.authStore)
    const dispatch = useDispatch();
    const [search, setSearch] = useState('')
    useEffect(() => {

    }, [dispatch])

    return (
        <div>
            <header className='p-1 lg:p-3 md:p-3 gap-2  flex justify-between'>
                <Link to={'/'} href='' className='flex items-center gap-1 ' > <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 sm:w-4 sm:h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
                </svg>
                    <span className='font-bold lg:text-xl md:text-lg text-sm'>Stay<span className='bg-primary text-white p-1 rounded-full '>Hub</span></span>
                </Link>
                <div className='flex gap-1 items-center relative' >
                    <input className=' border border-grey-300 rounded-full py-1 px-2 shadow-md shadow-grey-100 lg:text-xl sm:text-sm' placeholder='search' onChange={(e) => setSearch(e.target.value)} />
                    <button className='bg-primary text-white p-2 rounded-full absolute right-0' onClick={() => dispatch(addSearchQuery(search))} ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 md:w-6 lg:h-6 lg:w-6 lg:h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    </button>
                </div>
                {/* </input> */}


                <Link to={user ? '/account' : '/login'} className='flex gap-1 items-center border border-grey-300 rounded-full px-4 py-1 shadow-md shadow-gray-100 cursor-pointer'>

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                        <path fill-rule="evenodd" d="M3 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 5.25Zm0 4.5A.75.75 0 0 1 3.75 9h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
                    </svg>
                    <span className='hidden md:block lg:block'>
                        {user ? user.name : ''}
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" />
                    </svg>

                </Link>

            </header>
        </div >
    )
}

export default Header