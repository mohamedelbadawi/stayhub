import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/AuthSlice';
import { Navigate, useNavigate } from 'react-router-dom'
import { getRequests, updateRequest } from '../redux/BookingSlice';
import Spinner from '../components/Spinner';
import { differenceInCalendarDays } from 'date-fns'
const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.authStore)
    const { userRequests, isLoading } = useSelector((state) => state.bookingStore)
    const [refresh, setRefresh] = useState(false)
    useEffect(() => {
        dispatch(getRequests())
    }, [dispatch, navigate, refresh])
    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate])



    return (
        <div className='container p-5 '>
            <h3 className='text-xl font-mono font-bold my-8 '>Booking Requests</h3>
            <div className='flex flex-col items-center justify-center'>
                {isLoading && <Spinner />}
                {
                    (userRequests && userRequests.length > 0) ? userRequests.map((request) => {

                        return (<div class="block  justify-between w-3/4 rounded-lg bg-gray-100 p-6 shadow-secondary-1  text-surface" key={request._id.toString()}>
                            <div>
                                <h5 className='text-lg text-center'>Request for: {request.placeId.title}</h5>
                            </div>
                            <div>
                                <h5 class="mb-2 text-xl font-medium leading-tight">
                                    Fullname: {request.fullName} : phone: {request.phone}
                                </h5>
                                <p class="mb-4 text-base">
                                    {differenceInCalendarDays(new Date(request.checkOut), new Date(request.checkIn))} Night
                                </p>
                            </div>
                            <div className=' flex items-center justify-center gap-2'>

                                <button type="button" className='rounded-full bg-green-600  px-2 py-1 text-white ' onClick={() => { dispatch(updateRequest({ id: request._id, status: 'approved' })); setRefresh(true) }}>&#10003;</button>
                                <button type="button" className='rounded-full bg-red-600  px-2 py-1 text-white ' onClick={() => { dispatch(updateRequest({ id: request._id, status: 'canceled' })); setRefresh(true) }}  >&#10005;</button>
                            </div>
                        </div>)
                    }) : <p>No requests</p>


                }
            </div>
            <div className='text-center mt-8'>
                <h3>Welcome {user?.name}</h3>
                <h3>Your are logged in with {user?.email}</h3>
                <button className='bg-primary text-white rounded-full px-4 py-1 mt-4 w-40 text-lg hover:drop-shadow-xl ' onClick={() => { dispatch(logout()) }}>logout</button>
            </div>
        </div>
    )

}

export default Profile