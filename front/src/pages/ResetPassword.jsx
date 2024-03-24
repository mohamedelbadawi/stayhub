import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/Spinner'
import { useFormik } from 'formik';
import { resetPasswordSchema } from '../validation/AuthValidation';
import { resetPassword } from '../redux/AuthSlice';
import { useParams } from 'react-router-dom'
const ResetPassword = () => {

    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.authStore)
    const { id } = useParams();
    const formController = useFormik({
        initialValues: {
            token: '',
            id: id,
            password: ''
        },
        validationSchema: resetPasswordSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (values, { resetForm }) => {
            dispatch(resetPassword(values))
            resetForm();
        }
    })
    return (
        <div className=' mt-4 grow flex items-center  justify-around'>
            <div className='mb-32'>
                <h1 className='text-4xl font-md text-center mb-4'>update password</h1>
                <form className='max-w-md mx-auto ' onSubmit={formController.handleSubmit}>
                    <input type='text' placeholder='Code' name='token' value={formController.values.token} onChange={formController.handleChange} onBlur={formController.handleBlur} />
                    {formController.touched.token && formController.errors.token ? (<p className="text-rose-500 text-xs text-left mb-1">{formController.errors.token}</p>) : ''}
                    <input type='password' name='password' placeholder='Password' className={formController.errors.password && formController.touched.password ? 'border-2 border-rose-500' : ''} value={formController.values.password} onChange={formController.handleChange} onBlur={formController.handleBlur} />
                    {formController.touched.password && formController.errors.password ? (<p className="text-rose-500 text-xs text-left mb-1">{formController.errors.password}</p>) : ''}

                    <button className='bg-primary text-white w-full rounded-full py-2 flex justify-center' type='submit'>
                        {
                            isLoading ? (<Spinner />) : 'update password'
                        }

                    </button>

                </form>
            </div>
        </div>
    )
}

export default ResetPassword