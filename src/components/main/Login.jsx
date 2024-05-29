import React, { useContext } from 'react'
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import Context from '../../contexts/AuthContext'

const Login = () => {

    const [formData, setFormData] = useState({

        username: '',
        password: '',


    });

    const { username, setUsername, password, setPassword } = useContext(Context)

    const [validationErrors, setValidationErrors] = useState({});

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
        const { name, value } = event.target;

        if (name === 'username') {
            setUsername(value);
        } else if (name === 'password') {
            setPassword(value);
        }
        setValidationErrors({}); // Clear errors on change
    };


    const validateField = async (fieldName) => {
        try {
            await Yup.reach(validationSchema, fieldName).validate(formData[fieldName]);
            setValidationErrors({ ...validationErrors, [fieldName]: undefined }); // Clear error for this field
        } catch (error) {
            setValidationErrors({ ...validationErrors, [fieldName]: error.message });
        }
    };

    const validationSchema = Yup.object({

        username: Yup.string().required('username is required'),
        password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),


    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await validationSchema.validate(formData, { abortEarly: false }); // Validate all fields at once

            const response = await axios.post('http://localhost:3001/api/users', formData);
            console.log('Form Submitted Successfully:', response.data);
            // Handle successful submission (e.g., clear form, show success message)
        } catch (error) {
            if (error.name === 'ValidationError') {
                console.error('Validation Errors:', error.errors);
                // You can display these errors to the user (e.g., show error messages next to each field)
            } else {
                console.error('Error submitting form:', error);
                // Handle other errors
            }
        }
    };

    return (
        <>
            <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
                    Login
                </div>
                <form onSubmit={handleSubmit} className="py-4 px-6" action method="POST">


                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="time">
                            username
                        </label>
                        <input
                            type="text"
                            name="username"
                            placeholder="username"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={handleChange}
                            onBlur={() => validateField('username')}
                            value={formData.username}
                        />
                        {validationErrors.username && (
                            <span className="text-red-500 text-xs">{validationErrors.username}</span>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={handleChange}
                            onBlur={() => validateField('password')}
                            value={formData.password}
                        />

                        {validationErrors.password && (
                            <span className="text-red-500 text-xs">{validationErrors.password}</span>
                        )}                </div>




                    <div className="">
                        <button type="submit" className=" w-full bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
                        >Login</button>
                        <div className="flex gap-2 pt-5">
                            <p className="text-gray-600 text-sm">Don't have an account?</p><a className="text-gray-600 text-sm underline" href="/register">Register here</a>
                        </div>

                    </div>
                </form>
            </div>




        </>
    )
}

export default Login