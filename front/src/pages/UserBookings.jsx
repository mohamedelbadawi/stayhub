import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { getUserBookings } from '../redux/BookingSlice'
import { compareAsc, differenceInCalendarDays, format } from "date-fns";
const UserBookings = () => {
    const { userBookings, isLoading } = useSelector((state) => state.bookingStore)
    const dispatch = useDispatch();
    useEffect(() => {

        dispatch(getUserBookings())
    }, [])
    return (
        <div className='flex flex-col items-center justify-center w-full'>
            {isLoading ? (
                <div className='flex justify-center items-center mt-5'>

                    <Spinner />
                </div>
            ) : (
                <div className="mt-4 flex  flex-col items-center gap-3">
                    {userBookings.length > 0 && userBookings.map(booking => (
                        <Link href="#" className={"flex flex-col px-2 py-2 items-center bg-gray-100 border border-gray-200 border-r-8 rounded-lg shadow md:flex-row md:max-w-xl " + (booking.status === 'pending' ? 'border-r-orange-500' : '') + (booking.status === 'canceled' ? 'border-r-red-500' : '') + (booking.status === 'approved' ? 'border-r-green-500' : '')} >
                            <img className="object-cover w-full rounded-t-lg h-24 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={booking.placeId.imagesUrl[0]} alt="" />
                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">{booking.placeId.title}</h5>
                                <p className="mb-3 font-normal text-gray-700 shrink grow-0 flex gap-1"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                </svg>
                                    {format(new Date(booking.checkIn), "yyyy-MM-dd")} --&gt; {format(new Date(booking.checkOut), "yyyy-MM-dd")}
                                </p>
                                <p className='flex items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                                    </svg>
                                    {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} Night | price: {booking.price} $

                                </p>


                            </div>
                        </Link>
                    ))}

                </div>)
            }
        </div >
    )
}

export default UserBookings