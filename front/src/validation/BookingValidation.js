import { string, object, number, array, date } from 'yup';
const phoneRegExp = /^01[0125][0-9]{8}$/
export const bookingValidationSchema = object().shape({
    fullName: string().required('full name is required'),
    phone: string().matches(phoneRegExp, 'Phone number is not valid').required(),
    checkIn: string().required('Check-in time is required'),
    checkOut: string().required('Check-out time is required'),
    guests: number().required('Guests number is required')

})