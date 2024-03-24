import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode"
import { useDispatch } from 'react-redux'
import { clearUser, refreshToken } from '../redux/AuthSlice';
import { useEffect } from 'react';
const Auth = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const token = Cookies.get('token');
        if (!token || token === undefined) {
            console.log(token)
            localStorage.removeItem("userData");
            dispatch(clearUser())
        }

        if (token) {

            const payload = jwtDecode(token)
            const expirationTime = payload.exp
            const currentTime = Date.now() / 1000;
            if (expirationTime < currentTime) {
                dispatch(refreshToken())
                Cookies.remove('token')
                localStorage.removeItem("userData");
                dispatch(clearUser())
            }
        }

    }, [dispatch])
    return null
}


export default Auth;