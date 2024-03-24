import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserPlaces } from '../redux/PlaceSlice'
import Spinner from '../components/Spinner'
const UserAccommodations = () => {
    const { user } = useSelector((state) => state.authStore)
    const { userPlaces, isLoading } = useSelector((state) => state.placeStore)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserPlaces(user.id))
    }, [dispatch, user.id])
    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='mt-8 '>
                <Link className='bg-primary  text-white rounded-full px-4 py-2 inline-flex gap-1 items-center hover:drop-shadow-xl' to={'add'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                    Add Accommodation
                </Link>

            </div>
            {isLoading ? (
                <div className='flex justify-center items-center mt-5'>

                    <Spinner />
                </div>
            ) : (
                <div className="mt-4 flex  flex-col items-center">
                    {userPlaces.length > 0 && userPlaces.map(place => (
                        <Link className="flex flex-col  lg:flex-row cursor-pointer gap-2 bg-gray-100 p-4 rounded-2xl w-9/12 my-2 overflow-hidden" to={`${place._id}`}>
                            <div className="flex w-full justify-center lg:w-32  h-32 shrink-0   ">
                                <img src={`${place.images[0].url}`} alt='d' className='rounded-lg' />
                            </div>
                            <div className="">
                                <h2 className="text-l text-center">{place.title}</h2>
                                <p className="text-xs  text-left ">
                                    {place.description}
                                </p>

                            </div>
                        </Link>
                    ))}
                </div>)}
        </div>
    )
}

export default UserAccommodations