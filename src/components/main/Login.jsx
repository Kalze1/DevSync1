import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import bcrypt from 'bcrypt'
import * as Yup from 'yup';
import axios from 'axios';

const Login = ({ setUser }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
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
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // console.log("amshdgvjhb")
            await validationSchema.validate(formData, { abortEarly: false }); // Validate all fields at once
            const filteredData = formData;
            console.log(filteredData)

            const response = await axios.post('http://localhost:3001/api/login', filteredData);
            console.log(filteredData)
            console.log('user found successfully use id:', response.data.user);
            if (response.data.user.username === formData.username){
                setUser(response.data.user);
                navigate('/chats');
                console.log("ullllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllser")
                console.log("loading ...")
            }
      // Use GET request with query parameters
            // console.log(response.data.user.length);
            // const i = 0;
            // for (i ; i > response.data.user.length;i++ ) {
            //     if(response.data.user[i].username && response.data.username) {
            //         setUser(response.data.user[i]);
            //         console.log("user found")
            //         navigate('/chats');
            //     } else {
            //         console.error('Invalid login credentials');
            //     }
            // }
        } catch (error) {
            if (error.name === 'ValidationError') {
                console.error('Validation Errors:', error.errors);
                setValidationErrors(error.inner.reduce((acc, curr) => {
                    acc[curr.path] = curr.message;
                    return acc;
                }, {}));
            } else {
                console.error('Error logging in:', error);
                // Handle other errors (e.g., display error message)
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
                Login
            </div>
            <form onSubmit={handleSubmit} className="py-4 px-6" method="POST">
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
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
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
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
                    )}
                </div>

                <div className="">
                    <button type="submit" className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline">
                        Login
                    </button>
                    <div className="flex gap-2 pt-5">
                        <p className="text-gray-600 text-sm">Don't have an account?</p><a className="text-gray-600 text-sm underline" href="/register">Register here</a>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
