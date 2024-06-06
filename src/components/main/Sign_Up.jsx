import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import Select from 'react-select';
const Sign_Up = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        confirmPassword: '',
        techStacks: [],
        email: '',
        github: '',
    });

    const [validationErrors, setValidationErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const options = [
        { value: 'react', label: 'react' },
        { value: 'node', label: 'node' },
        { value: 'express', label: 'express' },
        { value: 'mongoDB', label: 'mongoDB' },
    ];

    const handleTechStack = (selected) => {
        const selectedValues = selected ? selected.map(option => option.value) : [];
        setFormData({ ...formData, techStacks: selectedValues });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
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
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        username: Yup.string().required('Username is required'),
        password: Yup.string()
            .required('Password is required')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                'Password must contain at least one uppercase letter, one symbol, and be at least 8 characters long'
            ),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        techStacks: Yup.array().of(Yup.string()).required('Tech Stacks are required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        github: Yup.string(),
    });

    const addUserToChat = async (chatId, username) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                `https://api.chatengine.io/chats/${chatId}/people/`,
                { username },
                {
                    headers: {
                        'Private-Key': import.meta.env.VITE_PROJECT_KEY, // Replace with your actual key
                    },
                }
            );
            console.log(`User ${username} invited to chat ${chatId}`);
        } catch (error) {
            setError(error);
            console.error('Error inviting user to chat:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            // Validate form data
            await validationSchema.validate(formData, { abortEarly: false });

            // ChatEngine API call to create user
            const userResponse = await axios.post(
                'https://api.chatengine.io/users/',
                {
                    username: formData.username,
                    secret: formData.password,
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    email: formData.email
                },
                {
                    headers: {
                        'Private-Key': import.meta.env.VITE_PROJECT_KEY, // Replace with your actual key
                    },
                }
            );

            console.log('User created:', userResponse.data);

            // ChatEngine API call to fetch chats
            const response = await axios.get(
                'https://api.chatengine.io/chats/',
                {
                    headers: {
                        'Private-Key': import.meta.env.VITE_PROJECT_KEY, // Replace with your actual key
                    },
                }
            );

            console.log('Chats fetched successfully:', response.data);

            // Iterate through tech stacks and add user to corresponding chats
            for (const techStack of formData.techStacks) {
                for (const chat of response.data) {
                    if (chat.title === techStack) {
                        await addUserToChat(chat.id, formData.username);
                        console.log(`User added to chat with title: ${techStack} and ID: ${chat.id}`);
                    }
                }
            }

            // Localhost server call
            const localResponse = await axios.post('http://localhost:3001/api/users', formData);
            console.log('Form Submitted Successfully:', localResponse.data);

            // Handle successful submission (e.g., clear form, show success message)
        } catch (error) {
            if (error.name === 'ValidationError') {
                console.error('Validation Errors:', error.errors);
            } else {
                console.error('Error submitting form:', error);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
                Create Account
            </div>
            <form onSubmit={handleSubmit} className="py-4 px-6" method="POST">
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <div className="flex space-x-4">
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            onChange={handleChange}
                            onBlur={() => validateField('firstName')}
                            value={formData.firstName}
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={handleChange}
                            onBlur={() => validateField('lastName')}
                            value={formData.lastName}
                        />
                    </div>
                    <div className="flex justify-between">
                        {validationErrors.firstName && (
                            <span className="text-red-500 text-xs">{
                                validationErrors.firstName}</span>
                        )}
                        {validationErrors.lastName && (
                            <span className="text-red-500 text-xs">{validationErrors.lastName}</span>
                        )}
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
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
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={handleChange}
                            onBlur={() => validateField('password')}
                            value={formData.password}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 px-4 py-2 bg-gray-200 text-gray-700"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    {validationErrors.password && (
                        <span className="text-red-500 text-xs">{validationErrors.password}</span>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={handleChange}
                            onBlur={() => validateField('confirmPassword')}
                            value={formData.confirmPassword}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 px-4 py-2 bg-gray-200 text-gray-700"
                            onClick={toggleConfirmPasswordVisibility}
                        >
                            {showConfirmPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    {validationErrors.confirmPassword && (
                        <span className="text-red-500 text-xs">{validationErrors.confirmPassword}</span>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
                        Tech Stacks
                    </label>
                    <Select
                        options={options}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        isMulti
                        value={options.filter(option => formData.techStacks.includes(option.value))}
                        onChange={handleTechStack}
                    />
                    {validationErrors.techStacks && (
                        <span className="text-red-500 text-xs">{validationErrors.techStacks}</span>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="time">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={handleChange}
                        onBlur={() => validateField('email')}
                        value={formData.email}
                    />
                    {validationErrors.email && (
                        <span className="text-red-500 text-xs">{validationErrors.email}</span>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="service">
                        Github
                    </label>
                    <input
                        type="text"
                        name="github"
                        placeholder="Github Username (optional)"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={handleChange}
                        onBlur={() => validateField('github')}
                        value={formData.github}
                    />
                    {validationErrors.github && (
                        <span className="text-red-500 text-xs">{validationErrors.github}</span>
                    )}
                </div>
                <div className="flex items-center justify-center mb-4">
                    <button
                        className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign up
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Sign_Up



