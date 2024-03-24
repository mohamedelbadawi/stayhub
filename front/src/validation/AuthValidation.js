import { string, object, number } from 'yup';
const phoneRegExp = /^01[0125][0-9]{8}$/
const passwordRegExp = /^(?=.*?[0-9])(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[^\w\s]).{8,20}$/


export const registerSchema = object().shape({
    email: string().email().required(),
    name: string().required(),
    phone: string().matches(phoneRegExp, 'Phone number is not valid').required(),
    password: string().matches(passwordRegExp, 'Password must at least have 1 digit,1 upper character, 1 lower character and symbol').required()
}).required();
export const loginSchema = object().shape({
    email: string().email().required(),
    password: string().matches(passwordRegExp, 'Password must at least have 1 digit,1 upper character, 1 lower character and symbol').required()
}).required();
export const forgetPasswordSchema = object().shape({
    email: string().email().required(),
}).required();
export const resetPasswordSchema = object().shape({
    password: string().matches(passwordRegExp, 'Password must at least have 1 digit,1 upper character, 1 lower character and symbol').required(),
    token: string().length(6)
}).required();
