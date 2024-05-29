import React from 'react'
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import Select from "react-select"

const Sign_Up = () => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        techStacks: [],
        rating: '',
        email: '',
        github: '',
    });


    const [chatTitles, setChatTitles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [chatIds, setChatIds] = useState([])
    const [selectedOptions, setSelectedOptions] = useState([]);

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

    // console.log(selectedOptions);

    const selectedValues = options.filter(option => selectedOptions.includes(option.value));



    const createChats = async () => {
        setIsLoading(true);
        setError(null);

        try {
            // Chatengine API call
            for (const title of formData.techStacks) {
                await axios.post(
                    'https://api.chatengine.io/chats/',
                    { title },
                    {
                        headers: {
                            'Private-Key': '7c08cb66-85b5-489b-a0d1-1ff26f7f1e5d', // Replace with your actual key
                        },
                    }
                );
                console.log(`Chat created: ${title}`); // Optional: Log success message
            }

            // Localhost server call
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
        } finally {
            setIsLoading(true);
        }
    };

    const [validationErrors, setValidationErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'techStacks') {
            const techStackList = value.split(/[, ]+/).filter(Boolean); // Split on commas and spaces, remove empty entries
            setFormData({ ...formData, [name]: techStackList });
        } else {
            setFormData({ ...formData, [name]: value });
        }
        console.log(formData);
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
        password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
        techStacks: Yup.array().of(Yup.string()).required('Tech Stacks are required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        github: Yup.string(),
    });


    const addUserToChat = async (chatId, username) => {
        setIsLoading(true); // Assuming you have an isLoading state for tracking request status
        setError(null);

        try {
            const response = await axios.post(
                `https://api.chatengine.io/chats/${chatId}/people/`,
                { username },
                {
                    headers: {
                        'Private-Key': '7c08cb66-85b5-489b-a0d1-1ff26f7f1e5d', // Replace with your actual key
                    },
                }
            );
            console.log(`User ${username} invited to chat ${chatId}`); // Optional: Log success message
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
            // Chatengine API call

            const userResponse = await axios.post(
                'https://api.chatengine.io/users/',
                { username: formData.username, secret: formData.password, first_name: formData.firstName, last_name: formData.lastName, email: formData.email },
                {
                    headers: {
                        'Private-Key': "7c08cb66-85b5-489b-a0d1-1ff26f7f1e5d", // Replace with your actual key
                    },
                }
            ).then(
                alert("user Registered successfully!")
            )

            console.log('User created:', userResponse.data); // Optional: Log user data

            try {
                const response = await axios.get(
                    'https://api.chatengine.io/chats/',
                    {
                        headers: {
                            'Private-Key': '7c08cb66-85b5-489b-a0d1-1ff26f7f1e5d', // Replace with your actual key
                        },
                    }
                );

                if (response.status === 200) {
                    console.log('Chats fetched successfully:', response.data);

                    // Iterate through the array of tech stack names
                    for (const techStack of formData.techStacks) {
                        // Iterate through the array of chat objects
                        for (const chat of response.data) {
                            // Compare chat title with each tech stack name
                            if (chat.title === techStack) {
                                // Call the addUserToChat function with chat id and username
                                await addUserToChat(chat.id, formData.username); // Adding await here to ensure the function completes
                                console.log(`User added to chat with title: ${techStack} and ID: ${chat.id}`);
                            }
                        }
                    }
                } else {
                    console.error('Error fetching chats:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching chats:', error);
            }






            // Localhost server call
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
        } finally {
            setIsLoading(true);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
                Create Account
            </div>
            <form onSubmit={handleSubmit} className="py-4 px-6" action method="POST">
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
                            <span className="text-red-500 text-xs">{validationErrors.firstName}</span>
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

                <div className='mb-4'>

                    <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
                        Tech Stacks
                    </label>
                    <Select
                        options={options}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
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
                        className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline" type="submit">
                        Sign up
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Sign_Up