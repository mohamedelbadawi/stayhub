import React, { useState } from 'react'

const AccommodationForm = () => {

    const [previewedImages, setPreviewedImages] = useState([]);


    const updatePreviewedImages = (e) => {
        const files = Array.from(e.target.files);
        const previews = files.map((file) => URL.createObjectURL(file));
        setPreviewedImages([...previews, ...previewedImages])
        console.log(previewedImages)
    }

    const handleDelete = (e, index) => {
        e.preventDefault();
        const updatedImages = [...previewedImages];
        updatedImages.splice(index, 1);
        setPreviewedImages(updatedImages);
    }




    return (
        <div className='flex justify-center items-center w-400'>
            <form className='w-full md:w-1/2 lg:w-1/2 text-left mt-8'>
                <div className='mt-1'>
                    <h2 className='text-2xl  px-2'>Title</h2>
                    <p className='px-2 text-gray-500 text-xs'>Title for your place. should be catchy</p>
                    <input type='text' placeholder='title' className='w-full' />
                </div>
                <div className='mt-1'>
                    <h2 className='text-2xl  px-2'>Address</h2>
                    <p className='px-2 text-gray-500 text-xs'>Address of the place</p>
                    <input type='text' placeholder='address' className='w-full' />
                </div>
                <div className='mt-3 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 items-center gap-1'>
                    {previewedImages && previewedImages.length > 0 ?

                        previewedImages.map((image, index) => {

                            return (
                                <div className='' key={index}>
                                    <button className='relative' onClick={(e) => handleDelete(e, index)} >
                                        <img src={image} alt='img' className='rounded-xl max-w-20 max-h-20' />
                                        <p className='bg-red-700 absolute top-1 right-1 text-center rounded-md px-1 py-0 text-sm text-white '>&times;</p>
                                    </button>
                                </div>
                            )

                        }) : ''

                    }
                    <label className='border px-4 py-8 rounded-2xl flex w-full items-center justify-center cursor-pointer'>
                        <input type='file' className='hidden' multiple name='images' onChange={(e) => updatePreviewedImages(e)} />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                        </svg>
                        Upload
                    </label>
                </div>
                <div className='mt-1 '>
                    <h2 className='text-2xl  px-2'>Description</h2>
                    <p className='px-2 text-gray-500 text-xs'>Description of the place</p>
                    <textarea rows='4' className='mt-1 block resize-none w-full p-2.5  border border-gray-300  rounded-3xl' ></textarea>

                </div>
                <div className='mt-3'>
                    <h2 className='text-2xl  px-2'>Perks</h2>
                    <p className='px-2 text-gray-500 text-xs'>select all the perks of your place</p>
                    <div className='grid lg:grid-cols-3  grid-cols-2 items-center justify-around mt-2 grid-rows-2 gap-1 px-2'>

                        <label className='flex gap-1 p-4 border rounded-2xl items-center text-xs cursor-pointer '>
                            <input type='checkbox' className='cursor-pointer w-4 h-4   checked:bg-blue-500' hidden />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                            </svg>
                            <span className='text-xs'>Wifi</span>
                        </label>
                        <label className='flex  gap-1 p-4 border rounded-2xl items-center text-xs cursor-pointer'>
                            <input type='checkbox' className='cursor-pointer' hidden />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                            </svg>

                            <span className='text-xs '>free parking</span>
                        </label>
                        <label className='flex  gap-1 p-4 border rounded-2xl items-center text-xs cursor-pointer'>
                            <input type='checkbox' className='cursor-pointer' hidden />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
                            </svg>

                            <span className='text-xs'>TV</span>
                        </label>
                        <label className='flex  gap-1 p-4 border rounded-2xl items-center text-xs cursor-pointer'>
                            <input type='checkbox' className='cursor-pointer' hidden />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 7.5 16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 0 0 4.5 21h15a2.25 2.25 0 0 0 2.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0 0 12 6.75Zm-1.683 6.443-.005.005-.006-.005.006-.005.005.005Zm-.005 2.127-.005-.006.005-.005.005.005-.005.005Zm-2.116-.006-.005.006-.006-.006.005-.005.006.005Zm-.005-2.116-.006-.005.006-.005.005.005-.005.005ZM9.255 10.5v.008h-.008V10.5h.008Zm3.249 1.88-.007.004-.003-.007.006-.003.004.006Zm-1.38 5.126-.003-.006.006-.004.004.007-.006.003Zm.007-6.501-.003.006-.007-.003.004-.007.006.004Zm1.37 5.129-.007-.004.004-.006.006.003-.004.007Zm.504-1.877h-.008v-.007h.008v.007ZM9.255 18v.008h-.008V18h.008Zm-3.246-1.87-.007.004L6 16.127l.006-.003.004.006Zm1.366-5.119-.004-.006.006-.004.004.007-.006.003ZM7.38 17.5l-.003.006-.007-.003.004-.007.006.004Zm-1.376-5.116L6 12.38l.003-.007.007.004-.004.007Zm-.5 1.873h-.008v-.007h.008v.007ZM17.25 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm0 4.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                            </svg>

                            <span className='text-xs'>Radio</span>
                        </label>
                        <label className='flex  gap-1 p-4 border rounded-2xl items-center text-xs cursor-pointer'>
                            <input type='checkbox' className='cursor-pointer' hidden />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 7.5 16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 0 0 4.5 21h15a2.25 2.25 0 0 0 2.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0 0 12 6.75Zm-1.683 6.443-.005.005-.006-.005.006-.005.005.005Zm-.005 2.127-.005-.006.005-.005.005.005-.005.005Zm-2.116-.006-.005.006-.006-.006.005-.005.006.005Zm-.005-2.116-.006-.005.006-.005.005.005-.005.005ZM9.255 10.5v.008h-.008V10.5h.008Zm3.249 1.88-.007.004-.003-.007.006-.003.004.006Zm-1.38 5.126-.003-.006.006-.004.004.007-.006.003Zm.007-6.501-.003.006-.007-.003.004-.007.006.004Zm1.37 5.129-.007-.004.004-.006.006.003-.004.007Zm.504-1.877h-.008v-.007h.008v.007ZM9.255 18v.008h-.008V18h.008Zm-3.246-1.87-.007.004L6 16.127l.006-.003.004.006Zm1.366-5.119-.004-.006.006-.004.004.007-.006.003ZM7.38 17.5l-.003.006-.007-.003.004-.007.006.004Zm-1.376-5.116L6 12.38l.003-.007.007.004-.004.007Zm-.5 1.873h-.008v-.007h.008v.007ZM17.25 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm0 4.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                            </svg>
                            <span className='text-xs'>Radio</span>
                        </label>
                        <label className='flex  gap-1 p-4 border rounded-2xl items-center text-xs cursor-pointer'>
                            <input type='checkbox' className='cursor-pointer' hidden />
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" className="w-4 h-4"><path d="M24 0v6h-4.3c.13 1.4.67 2.72 1.52 3.78l.2.22-1.5 1.33a9.05 9.05 0 0 1-2.2-5.08c-.83.38-1.32 1.14-1.38 2.2v4.46l4.14 4.02a5 5 0 0 1 1.5 3.09l.01.25.01.25v8.63a3 3 0 0 1-2.64 2.98l-.18.01-.21.01-12-.13A3 3 0 0 1 4 29.2L4 29.02v-8.3a5 5 0 0 1 1.38-3.45l.19-.18L10 12.9V8.85l-4.01-3.4.02-.7A5 5 0 0 1 10.78 0H11zm-5.03 25.69a8.98 8.98 0 0 1-6.13-2.41l-.23-.23A6.97 6.97 0 0 0 6 21.2v7.82c0 .51.38.93.87 1H7l11.96.13h.13a1 1 0 0 0 .91-.88l.01-.12v-3.52c-.34.04-.69.06-1.03.06zM17.67 2H11a3 3 0 0 0-2.92 2.3l-.04.18-.01.08 3.67 3.1h2.72l.02-.1a4.29 4.29 0 0 1 3.23-3.4zM30 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-3-2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-5 0h-2.33v2H22zm8-2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM20 20.52a3 3 0 0 0-.77-2l-.14-.15-4.76-4.61v-4.1H12v4.1l-5.06 4.78a3 3 0 0 0-.45.53 9.03 9.03 0 0 1 7.3 2.34l.23.23A6.98 6.98 0 0 0 20 23.6z">
                            </path></svg>
                            <span className='text-xs'>Cleaning during stay</span>
                        </label>
                        <label className='flex  gap-1 p-4 border rounded-2xl items-center text-xs cursor-pointer'>
                            <input type='checkbox' className='cursor-pointer' hidden />
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" className="w-4 h-4"><path d="M26 1a5 5 0 0 1 5 5c0 6.39-1.6 13.19-4 14.7V31h-2V20.7c-2.36-1.48-3.94-8.07-4-14.36v-.56A5 5 0 0 1 26 1zm-9 0v18.12c2.32.55 4 3 4 5.88 0 3.27-2.18 6-5 6s-5-2.73-5-6c0-2.87 1.68-5.33 4-5.88V1zM2 1h1c4.47 0 6.93 6.37 7 18.5V21H4v10H2zm14 20c-1.6 0-3 1.75-3 4s1.4 4 3 4 3-1.75 3-4-1.4-4-3-4zM4 3.24V19h4l-.02-.96-.03-.95C7.67 9.16 6.24 4.62 4.22 3.36L4.1 3.3zm19 2.58v.49c.05 4.32 1.03 9.13 2 11.39V3.17a3 3 0 0 0-2 2.65zm4-2.65V17.7c.99-2.31 2-7.3 2-11.7a3 3 0 0 0-2-2.83z">
                            </path></svg>
                            <span className='text-xs'>Kitchen</span>
                        </label>
                        <label className='flex  gap-1 p-4 border rounded-2xl items-center text-xs cursor-pointer'>
                            <input type='checkbox' className='cursor-pointer' hidden />
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" className="w-4 h-4">
                                <path d="M28 2a2 2 0 0 1 2 2v24a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 2H4v15.5h.19c.37-.04.72-.17 1-.38l.14-.11A3.98 3.98 0 0 1 8 18c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.97 3.97 0 0 1 16 18c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.98 3.98 0 0 1 24 18c.99 0 1.94.35 2.67 1 .35.33.83.5 1.33.5v2h-.23a3.96 3.96 0 0 1-2.44-1A1.98 1.98 0 0 0 24 20c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 16 20c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 8 20c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1v3h.19c.37-.04.72-.17 1-.38l.14-.11A3.98 3.98 0 0 1 8 23c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.97 3.97 0 0 1 16 23c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.98 3.98 0 0 1 24 23c.99 0 1.94.35 2.67 1 .35.33.83.5 1.33.5v2h-.23a3.96 3.96 0 0 1-2.44-1A1.98 1.98 0 0 0 24 25c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 16 25c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 8 25c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1V28h24zm-6 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path></svg>

                            <span className='text-xs'>Sea view</span>
                        </label>

                    </div>
                </div>

                <div className='mt-3 '>
                    <h2 className='text-2xl  px-2'>Extra Info</h2>
                    <p className='px-2 text-gray-500 text-xs'>House rules,etc</p>
                    <textarea rows='4' className='mt-1 block resize-none w-full p-2.5  border border-gray-300  rounded-3xl' ></textarea>
                </div>
                <div className='mt-3 '>
                    <h2 className='text-2xl  px-2'>Check in & outs time</h2>
                    <p className='px-2 text-gray-500 text-xs'>Add check in and out time to have some time for cleaning</p>
                    <div className='px-2 mt-1 grid gap-2 sm:grid-cols-3'>
                        <div>
                            <label>Check in time</label>
                            <input type='text' className='rounded-2xl' />
                        </div>

                        <div>
                            <label>Check out time</label>
                            <input type='text' className='rounded-2xl' />
                        </div>

                        <div>
                            <label>Max guest</label>
                            <input type='text' className='rounded-2xl' />
                        </div>


                    </div>
                </div>
                <button className='bg-primary w-full text-white p-2 rounded-2xl mt-2 hover:drop-shadow-md'>Save</button>
            </form>

        </div>
    )
}

export default AccommodationForm