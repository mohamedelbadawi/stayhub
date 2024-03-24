import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, } from 'react-redux'
import { getPlace } from '../redux/PlaceSlice';
import { currentDate, getToken, notifyError, tomorrowDate } from '../helpers';
import Spinner from '../components/Spinner';
import { differenceInDays } from 'date-fns'
import { findIconByPerkName } from '../components/perkData';
import { useFormik } from 'formik';
import { bookingValidationSchema } from '../validation/BookingValidation';
import toast from 'react-hot-toast';
import { addBooking } from '../redux/BookingSlice';

const PlaceDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [place, setPlace] = useState();
    const [loading, setLoading] = useState(true);
    const [allImages, setShowAllImages] = useState(false);

    let nights;


    const formController = useFormik({
        initialValues: {
            checkIn: '',
            checkOut: '',
            fullName: '',
            phone: null,
            guests: 1,
            price: null
        },
        validationSchema: bookingValidationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values, { resetForm }) => {
            values.place = id;
            if (!getToken()) {
                toast.error("you must be logged in")
                navigate('/login')
            }
            dispatch(addBooking({ data: values }))
            resetForm();
        }

    })
    const checkIn = formController.values.checkIn;
    const checkOut = formController.values.checkOut;

    const { isSubmitting, errors } = formController;

    useEffect(() => {
        if (errors && isSubmitting) {
            for (const key in errors) {
                toast.error(errors[key]);
            }
        }
    }, [errors, isSubmitting, place]);

    useEffect(() => {
        dispatch(getPlace(id)).then((res) => {
            setPlace(res.payload)
            setLoading(false)
        }).catch((value) => {
            notifyError(value.error)
        })
    }, [])
    useEffect(() => {
        if (checkIn && checkOut) {
            nights = differenceInDays(new Date(checkOut), new Date(checkIn));

            formController.setFieldValue('price', nights * place.price)
        }
    }, [checkIn, checkOut, place])


    if (allImages) {
        return (
            <div className="absolute inset-0 bg-black text-white min-h-screen">
                <div className="bg-black p-8 grid gap-4">
                    <div>
                        <button onClick={() => setShowAllImages(false)} className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                            </svg>
                            Close photos
                        </button>
                    </div>
                    <div className='flex flex-col text-center gap-3 items-center'>
                        <h2 className="text-3xl mr-48 mb-5">Photos of {place.title}</h2>

                        {
                            place.images.map((image) => {
                                return <img src={image.url} alt='' className='rounded-lg' />
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }




    return (


        <div className=' mt-8  py-4 rounded-lg bg-gray-100 max-h-max'>
            {loading && <Spinner />}
            {place ? (
                <>
                    <div className='text-left px-5'>
                        <h1 className='text-2xl font-bold'>{place.title}</h1>
                        <h1 className='text-l text-gray-500'>{place.address}</h1>
                    </div>
                    <div className='flex gap-2 rounded-lg mt-1 p-7 md:p-12 relative '>
                        <button onClick={() => setShowAllImages(true)} className='absolute bg-white border  p-2  rounded-2xl bottom-14 right-14  flex gap-1 items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                            Show All Images
                        </button>
                        <div className='basis-2/3'>
                            <img src={place?.images[0].url} className='rounded-lg  cursor-pointer' alt="First " />
                        </div>
                        <div className='flex flex-col basis-1/3 gap-1 '>
                            <img src={place?.images[1].url} className='rounded-lg cursor-pointer basis-1/2' alt="Second " />
                            <img src={place?.images[2].url} className='rounded-lg cursor-pointer basis-1/2' alt="Third " />
                        </div>
                    </div>
                    <div className='text-left px-2 -mt-5 mb-4 bg-gray-100'>
                        <div className='flex flex-col items-center gap-6 md:flex-row justify-between px-10 mt-5'>
                            <div className='mb-5'>

                                <h2 className='text-xl font-bold'>Description</h2>
                                <p className=''>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in nisl vel nisi aliquet bibendum ac eget erat. Aliquam in tincidunt est. Mauris justo ligula, pretium at iaculis eu, suscipit a nisi. Phasellus aliquam libero vel tincidunt viverra. Maecenas ornare hendrerit arcu. Praesent at arcu purus. Mauris tincidunt, massa quis tincidunt dignissim, ligula orci faucibus diam, in euismod dui nibh vitae lorem. Quisque ut dapibus turpis, et lobortis nisl. Nunc consequat justo urna. Aliquam dictum venenatis lacus vitae iaculis.
                                </p>

                                <div>

                                    <h3><span className='font-bold text-xl mt-8'>Check in : </span >  {place.checkIn} </h3>
                                    <h3><span className='font-bold text-xl mt-8'>Check out : </span>  {place.checkOut} </h3>
                                    <h3><span className='font-bold text-xl mt-8'>Max guest : </span> {place.maxGuest} </h3>
                                    <div>
                                        <h3 className='font-bold text-2xl'>Extra Info</h3>
                                        <p>{place.extraInfo}</p>
                                    </div>
                                    <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2 mt-2'>
                                        {place.perks.map((perk) => {
                                            return (<p className='bg-primary px-1 py-1 text-white rounded-xl flex gap-1 items-center text-sm'><span>{findIconByPerkName(perk)} </span> {perk}</p>)
                                        })}
                                    </div>

                                </div>
                            </div>

                            <form on className='bg-white px-12 shadow py-4 rounded-xl  flex items-center flex-col' onSubmit={formController.handleSubmit}>
                                <h2 className='text-2xl'>
                                    Price per/night :{place.price} $
                                </h2>
                                <div className='m-1 text-left border p-2 rounded-lg flex items-center'>

                                    <div className='m-1'>
                                        <label className='font-semibold'>check in</label>
                                        <input type='date' min={currentDate} value={formController.values.checkIn} onChange={formController.handleChange} name='checkIn' className='cursor-pointer' />
                                    </div>
                                    <div className='m-1'>
                                        <label className='font-semibold'>check out</label>
                                        <input type='date' min={tomorrowDate} value={formController.values.checkOut} onChange={formController.handleChange} name='checkOut' className='cursor-pointer' />
                                    </div>
                                </div>
                                <div className='mt-2 flex flex-col w-full'>
                                    <label className=''>Number of guests</label>
                                    <input type='number' className='p-2  border rounded-xl mt-2' name='guests' value={formController.values.guests} onChange={formController.handleChange} onBlur={formController.handleBlur} />
                                </div>
                                {
                                    checkIn && checkOut ?
                                        <div className='w-full'>
                                            <div className='mt-2 flex flex-col w-full'>
                                                <label className=''>full name</label>
                                                <input type='text' className='p-2  border rounded-xl mt-2' name='fullName' value={formController.values.fullName} onChange={formController.handleChange} onBlur={formController.handleBlur} />
                                            </div>
                                            <div className='mt-2 flex flex-col w-full'>
                                                <label className=''>phone number</label>
                                                <input type='text' className='p-2  border rounded-xl mt-2' name='phone' value={formController.values.phone} onChange={formController.handleChange} onBlur={formController.handleBlur} />
                                            </div>
                                            <h3 className='text-xl font-bold'>total price : $ {formController.values.price} </h3>
                                        </div>
                                        : ''}

                                <button className=' mt-2 bg-primary text-white p-2 rounded-lg w-full' type='submit'>Book now</button>
                            </form>
                        </div>

                    </div>
                </>
            ) : <h1>Not found</h1>
            }
        </div>
    );




}

export default PlaceDetails