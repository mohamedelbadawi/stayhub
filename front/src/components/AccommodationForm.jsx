import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { placeValidationSchema } from '../validation/PlaceValidation';
import { perkOptions } from './perkData';
import { useDispatch, useSelector } from "react-redux"
import { addPlace, deleteImage, getPlace, updatePlace, uploadImages } from '../redux/PlaceSlice';
import { useParams, useNavigate } from 'react-router-dom'
import { notifySuccess } from '../helpers';
const AccommodationForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [previewedImages, setPreviewedImages] = useState([]);
    const [images, setImages] = useState([]);
    const { user } = useSelector((state) => state.authStore)
    const [place, setPlace] = useState({});


    const initialValues =
    {
        title: '',
        address: '',
        description: '',
        perks: [],
        extraInfo: '',
        checkIn: null,
        checkOut: null,
        maxGuest: null,
        price: null,
    }

    useEffect(() => {
        if (id && place) {
            setFieldValue("title", place.title)
            setFieldValue("address", place.address)
            setFieldValue("description", place.description)
            setFieldValue("perks", place.perks)
            setFieldValue("checkIn", place.checkIn)
            setFieldValue("checkOut", place.checkOut)
            setFieldValue("maxGuest", place.maxGuest)
            setFieldValue("extraInfo", place.extraInfo)
            setFieldValue("perks", place.perks)
            setFieldValue("price", place.price)
            setPreviewedImages(place.imagesUrl)
            setImages(place.images)

        }

    }, [id, place])

    const formController = useFormik({
        initialValues: initialValues,
        validationSchema: placeValidationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values, { resetForm }) => {
            if (id) {
                values.userId = user.id
                if (images.length < 3) {
                    return toast.error("please upload more images")
                }
                values.images = images
                dispatch(updatePlace({ data: values, id: id }))
            } else {

                values.userId = user.id
                values.images = images

                dispatch(addPlace(values));
                localStorage.clear('images')
                resetForm();
            }

        },
    });
    const { isSubmitting, errors, setFieldValue, values, handleBlur, handleChange } = formController;
    const handleDelete = (ev, image) => {
        dispatch(deleteImage({ path: image, id })).then((res) => {
            setImages([...images.filter((img) => img !== image)])
            localStorage.setItem('images', [...images.filter((img) => img !== image)])
            notifySuccess(res.payload.message)
        })
    };

    const updatePreviewedImages = (e) => {
        const files = Array.from(e.target.files);
        setImages(files)
        formController.setFieldValue('images', files);

        const formData = new FormData();
        files.map((file) => {

            formData.append('images', file);
        }
        )
        dispatch(uploadImages(formData)).then((data) => {
            setImages([...images, ...data.payload.images])
            localStorage.setItem('images', [...images, ...data.payload.images])
        })

    };

    useEffect(() => {
        if (localStorage.getItem('images')) {
            setImages(localStorage.getItem('images').split(','));
        }
        if (id) {

            dispatch(getPlace(id)).then((value) => {
                setPlace(value.payload);
                if (value.payload.userId !== user.id) {
                    navigate('/')
                }
            })
        }

    }, [dispatch, id, navigate, user])


    useEffect(() => {
        if (errors && isSubmitting) {
            for (const key in errors) {
                toast.error(errors[key]);
            }
        }
    }, [errors, isSubmitting, place, navigate, user]);

    const handlePerkToggle = (perk) => {
        const updatedPerks = formController.values.perks.includes(perk)
            ? formController.values.perks.filter((p) => p !== perk)
            : [...formController.values.perks, perk];

        formController.setFieldValue('perks', updatedPerks);
    };

    return (
        <div className='flex justify-center items-center w-400'>
            <form className='w-full md:w-1/2 lg:w-1/2 text-left mt-8' onSubmit={formController.handleSubmit}  >
                <div className='mt-1'>
                    {/* Title Field */}
                    <h2 className='text-2xl px-2'>Title</h2>
                    <p className='px-2 text-gray-500 text-xs'>Title for your place. should be catchy</p>
                    <input
                        type='text'
                        placeholder='title'
                        name='title'
                        value={formController.values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={'w-full' + (formController.errors.title && formController.touched.title ? ' border-red-500' : '')}
                    />
                    {/* Address Field */}
                    <h2 className='text-2xl px-2 mt-3'>Address</h2>
                    <p className='px-2 text-gray-500 text-xs'>Address of the place</p>
                    <input
                        type='text'
                        placeholder='address'
                        name='address'
                        value={formController.values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={'w-full' + (formController.errors.address && formController.touched.address ? ' border-red-500' : '')}
                    />
                </div>
                <div className='mt-3 grid grid-cols-3  lg:grid-cols-6 items-center gap-1'>
                    {images && images.length > 0 ?

                        images.map((image, index) => {

                            return (
                                <div className='' key={index}>
                                    <button type='button' className='relative' onClick={(e) => handleDelete(e, image)} >
                                        <img src={`${image.url}`} alt='img' className='rounded-xl max-w-30 max-h-20 md:' />
                                        <p className='bg-red-700 bg-opacity-50 hover:bg-opacity-100 absolute top-1 right-1 text-center rounded-md px-1 py-0 text-sm text-white '>&times;</p>
                                    </button>
                                </div>
                            )

                        }) : ''

                    }
                    <div>

                        <label className='border px-4 py-8 rounded-2xl flex w-full items-center justify-center cursor-pointer'>
                            <input type='file' className='hidden' accept="image/*" multiple name='images' onChange={(e) => {
                                updatePreviewedImages(e)
                            }

                            } />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                            </svg>
                            Upload
                        </label>
                        <p className='text-xs pl-2 text-gray-600'>** min 3 images</p>
                    </div>

                </div>
                <div className='mt-1'>
                    <h2 className='text-2xl px-2 mt-3'>Description</h2>
                    <p className='px-2 text-gray-500 text-xs'>Description of the place</p>
                    <textarea
                        rows='4'
                        className={
                            'mt-1 block resize-none w-full p-2.5 border ' +
                            (formController.errors.description && formController.touched.description ? ' border-red-500' : 'border-gray-300') +
                            ' rounded-3xl'
                        }
                        value={formController.values.description}
                        name='description'
                        onChange={handleChange}
                        onBlur={handleBlur}
                    ></textarea>
                </div>
                {/* Perks */}
                <div className='mt-3'>
                    <h2 className='text-2xl px-2'>Perks</h2>
                    <p className='px-2 text-gray-500 text-xs'>Select all the perks of your place</p>
                    <div className='grid lg:grid-cols-3 grid-cols-2 items-center justify-around mt-2 grid-rows-2 gap-1 px-2'>
                        {perkOptions.map((perk, index) => (
                            <label key={index} className='flex  gap-1 p-4 border rounded-2xl items-center text-xs cursor-pointer'>
                                <input
                                    type='checkbox'
                                    id={`perk-${index}`}
                                    name='perks'
                                    value={perk.name}
                                    checked={formController.values.perks?.includes(perk.name)}
                                    onChange={() => handlePerkToggle(perk.name)}
                                    className=''
                                    hidden
                                />

                                {perk.icon}   {perk.name}

                            </label>
                        ))}
                    </div>
                </div>
                <div className='mt-3 '>
                    <h2 className='text-2xl  px-2'>Extra Info</h2>
                    <p className='px-2 text-gray-500 text-xs'>House rules,etc</p>
                    <textarea rows='4' className={'mt-1 block resize-none w-full p-2.5  border ' + (formController.errors.extraInfo && formController.touched.extraInfo ? ' border-red-500' : 'border-gray-300') +
                        ' rounded-3xl'} name='extraInfo' value={values.extraInfo} onChange={handleChange} onBlur={handleBlur}></textarea>
                </div>
                <div className='mt-3 '>
                    <h2 className='text-2xl  px-2'>Check in & outs time</h2>
                    <p className='px-2 text-gray-500 text-xs'>Add check in and out time to have some time for cleaning</p>
                    <div className=' mt-1 grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center'>
                        <div className='flex flex-col mt-2'>
                            <label className='pl-2'>Check in time</label>
                            <input type='number' className={'rounded-2xl remove-arrow border p-2.5 ' + (formController.errors.checkIn && formController.touched.checkIn ? ' border-red-500' : 'border-gray-300') +
                                ' rounded-3xl'} name='checkIn' value={values.checkIn} onChange={handleChange} onBlur={handleBlur} />
                        </div>
                        <div className='flex flex-col mt-2'>
                            <label className='pl-2'>Check out time</label>
                            <input type='number' className={'rounded-2xl remove-arrow border p-2.5 ' + (formController.errors.checkOut && formController.touched.checkOut ? ' border-red-500' : 'border-gray-300') +
                                ' rounded-3xl'} name='checkOut' value={values.checkOut} onChange={handleChange} onBlur={handleBlur} />
                        </div>
                        <div className='flex flex-col mt-2'>
                            <label className='pl-2'>max guest</label>
                            <input type='number' className={'rounded-2xl remove-arrow border p-2.5 ' + (formController.errors.maxGuest && formController.touched.maxGuest ? ' border-red-500' : 'border-gray-300') +
                                ' rounded-3xl'} name='maxGuest' value={values.maxGuest} onChange={handleChange} onBlur={handleBlur} />
                        </div>
                        <div className='flex flex-col mt-2'>
                            <label className='pl-2'>Price per night</label>
                            <input type='number' className={'rounded-2xl remove-arrow border p-2.5 ' + (formController.errors.price && formController.touched.price ? ' border-red-500' : 'border-gray-300') +
                                ' rounded-3xl'} name='price' value={values.price} onChange={handleChange} onBlur={handleBlur} />
                        </div>



                    </div>
                </div>
                <button
                    className={'bg-primary w-full text-white p-2 rounded-2xl mt-2 hover:drop-shadow-md '}
                    type='submit'
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default AccommodationForm;
