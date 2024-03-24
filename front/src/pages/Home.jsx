import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPlaces } from '../redux/PlaceSlice'
import Spinner from '../components/Spinner'
const Home = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const [updatedPlaces, setUpdatedPlaces] = useState([]);
    const [maxPages, setMaxPages] = useState(1);
    const [page, setPage] = useState(1)
    const { search } = useSelector((state) => state.placeStore)
    useEffect(() => {
        dispatch(getPlaces({ page: page })).then((res) => {
            setUpdatedPlaces([...updatedPlaces, ...res.payload.places.places]);
            setMaxPages(res.payload.places.pages)
            setLoading(false)

        });
    }, [page]);

    useEffect(() => {

        dispatch(getPlaces({ search: search })).then((res) => {
            setUpdatedPlaces([...res.payload.places.places]);
            setMaxPages(res.payload.places.pages)
            setLoading(false)

        });

    }, [search, dispatch]);


    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight
        ) {
            if (page < maxPages) {
                setPage((page) => page + 1)
                setLoading(true)
            }

        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return (
        <div className='mt-8 mx-9 text-center'>
            {

                (<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-x-6 gap-y-7 grid-rows-1'>
                    {
                        updatedPlaces && updatedPlaces.length > 0 && updatedPlaces.map((place) => {

                            return (<Link to={`place/${place._id}`} className=' ease-in-out duration-500 w-72 max-h-screen' key={place._id}>
                                <div className=' rounded-2xl flex flex-col'>

                                    <img src={place.images[0].url} alt='d' className='object-cover aspect-square  rounded-2xl' />
                                    <div className='text-left px-1'>
                                        <p>{place.title}</p>
                                        <div className='flex justify-between px-4'>
                                            <h3 className='font-bold text-md '>{place.address}</h3>
                                            <p className='text-sm font-semibold'>${place.price} night</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>)
                        })
                    }
                </div>
                )
            }
            {loading ? (<Spinner />) : ''}


        </div>
    )
}

export default Home