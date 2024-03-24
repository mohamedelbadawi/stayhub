import { useFormik } from 'formik'
import React from 'react'
import { Link } from 'react-router-dom'
import { forgetPassword } from '../redux/AuthSlice'
import { forgetPasswordSchema } from '../validation/AuthValidation'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/Spinner'

const ForgetPassword = () => {
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.authStore)
    const formController = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: forgetPasswordSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (values, { resetForm }) => {
            dispatch(forgetPassword(values))
            resetForm();
        }
    })
    return (
        <div className=' mt-4 grow flex items-center  justify-around'>
            <div className='mb-32'>
                <h1 className='text-4xl font-md text-center mb-4'>Forget password</h1>
                <form className='max-w-md mx-auto ' onSubmit={formController.handleSubmit}>
                    <input type='email' name='email' placeholder='Your@gmail.com' className={formController.errors.email && formController.touched.email ? 'border-2 border-rose-500' : ''} value={formController.values.email} onChange={formController.handleChange} onBlur={formController.handleBlur} />
                    {formController.touched.email && formController.errors.email ? (<p className="text-rose-500 text-xs text-left w-100">{formController.errors.email}</p>) : ''}
                    <button className='bg-primary text-white w-full rounded-full py-2 flex justify-center' type='submit'>
                        {
                            isLoading ? (<Spinner />) : ' forget password'
                        }

                    </button>
                </form>
            </div>



        </div>
    )
}

export default ForgetPassword