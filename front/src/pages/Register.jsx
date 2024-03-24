import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { registerSchema } from '../validation/AuthValidation'
import { useDispatch, useSelector } from 'react-redux'
import { register, clearErrors, clearMessage } from '../redux/AuthSlice'
import { notifyError, notifySuccess } from '../helpers'
import Spinner from '../components/Spinner'


const Register = () => {
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.authStore)


    const formController = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            password: ''
        },
        validationSchema: registerSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (values, { resetForm }) => {
            dispatch(register(values))
            resetForm();
        }
    })



    return (
        <div className=' mt-4 grow flex items-center  justify-around '>
            <div className='mb-32'>
                <h1 className='text-4xl font-md text-center mb-4'>Register</h1>
                <form className='max-w-md mx-auto' onSubmit={formController.handleSubmit}>

                    <input type='text' name='name' placeholder='Name' className={formController.errors.name && formController.touched.name ? 'border-2 border-rose-500' : ''} value={formController.values.name} onChange={formController.handleChange} onBlur={formController.handleBlur} />

                    {formController.touched.name && formController.errors.name ? (<p className="text-rose-500 text-xs text-left">{formController.errors.name}</p>) : ''}


                    <input type='email' name='email' placeholder='Your@gmail.com' className={formController.errors.email && formController.touched.email ? 'border-2 border-rose-500' : ''} value={formController.values.email} onChange={formController.handleChange} onBlur={formController.handleBlur} />

                    {formController.touched.email && formController.errors.email ? (<p className="text-rose-500 text-xs text-left">{formController.errors.email}</p>) : ''}



                    <input type='text' name='phone' placeholder='Phone' value={formController.values.phone} className={formController.errors.phone && formController.touched.phone ? 'border-2 border-rose-500' : ''} onChange={formController.handleChange} onBlur={formController.handleBlur} />
                    {formController.touched.phone && formController.errors.phone ? (<p className="text-rose-500 text-xs text-left">{formController.errors.phone}</p>) : ''}


                    <input type='password' name='password' placeholder='Password' className={formController.errors.password && formController.touched.password ? 'border-2 border-rose-500' : ''} value={formController.values.password} onChange={formController.handleChange} onBlur={formController.handleBlur} />

                    {formController.touched.password && formController.errors.password ? (<p className="text-rose-500 text-xs text-left mb-1">{formController.errors.password}</p>) : ''}


                    <button className='bg-primary text-white w-full rounded-full py-2 flex justify-center' type='submit'>
                        {
                            isLoading ? (<Spinner />) : 'Register'
                        }

                    </button>


                    <div className='text-gray-500'>
                        Have account ? <span> </span> <Link className="text-primary " to={'/login'}>Login now</Link>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Register