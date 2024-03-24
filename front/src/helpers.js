
import toast, { Toaster } from 'react-hot-toast';
import jsCookie from 'js-cookie';
export const notifySuccess = (message) => toast.success(message)
export const notifyError = (errors) => {
    errors.forEach((error) => {

        toast.error(error.message)
    })
}

const today = new Date();
export const currentDate = today.toISOString().split('T')[0];
let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

export const tomorrowDate = tomorrow.toISOString().split('T')[0];
export const getToken = () => {
    let token = jsCookie.get('token');
    if (token) {
        token = token.replace(/^"(.*)"$/, '$1');
        return token;
    }
    return null
}