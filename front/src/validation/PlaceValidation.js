import { string, object, number, array } from 'yup';
export const placeValidationSchema = object().shape({
    title: string().required('Title is required'),
    address: string().required('Address is required'),
    description: string().required('Description is required'),
    extraInfo: string().required('Extra info is required'),
    checkIn: number().required('Check-in time is required'),
    checkOut: number().required('Check-out time is required'),
    maxGuest: number().required('Max guest count is required').min(1, 'At least 1 guest is required'),
    // images: array()
    //     .min(3, 'At least one image is required')
    //     .max(5, 'Maximum of 5 images allowed')

}).required();
