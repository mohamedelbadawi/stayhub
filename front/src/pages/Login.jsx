import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { loginSchema } from '../validation/AuthValidation';
import { clearErrors, clearMessage, login } from '../redux/AuthSlice';
import { notifyError, notifySuccess } from '../helpers';
import Spinner from '../components/Spinner';
const Login = () => {
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((state) => state.authStore)
  const navigate = useNavigate();
  const formController = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      dispatch(login(values))

    }
  })
  useEffect(() => {

    if (user) {
      navigate('/')

    }
  })


  return (

    <div className=' mt-4 grow flex items-center  justify-around'>
      <div className='mb-32'>
        <h1 className='text-4xl font-md text-center mb-4'>Login</h1>
        <form className='max-w-md mx-auto ' onSubmit={formController.handleSubmit}>

          <input type='email' name='email' placeholder='Your@gmail.com' className={formController.errors.email && formController.touched.email ? 'border-2 border-rose-500' : ''} value={formController.values.email} onChange={formController.handleChange} onBlur={formController.handleBlur} />
          {formController.touched.email && formController.errors.email ? (<p className="text-rose-500 text-xs text-left w-100">{formController.errors.email}</p>) : ''}

          <input type='password' name='password' placeholder='Password' className={formController.errors.password && formController.touched.password ? 'border-2 border-rose-500' : ''} value={formController.values.password} onChange={formController.handleChange} onBlur={formController.handleBlur} />

          {formController.touched.password && formController.errors.password ? (<p className="text-rose-500 text-xs text-left mb-1">{formController.errors.password}</p>) : ''}

          <Link to={'/forget-password'} className='flex justify-end pr-5 text-sm py-1  text-gray-500'>ForgetPassword?</Link>
          <button className='bg-primary text-white w-full rounded-full py-2 flex justify-center' type='submit'>
            {
              isLoading ? (<Spinner />) : 'Login'
            }

          </button>
          <div className='text-gray-500'>
            Don't have an account yet? <span> </span>
            <Link className="text-primary " to={'/register'}>Register now</Link>
          </div>
        </form>
      </div>
      <Toaster position='top-right' reverseOrder={false} />
    </div>

  )
}

export default Login