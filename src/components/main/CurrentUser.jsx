import React, { useState } from 'react';

const UserProfile = () => {
    const [profile, setProfile] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        github: 'johndoe',
        username: 'johndoe123',
        password: 'password123',
        expertise: 'Web Development',
        rating: 8,
        bio: 'Full-stack developer with 5 years of experience in web development.',
        lastSeen: '2 hours ago',
        skills: [
            { language: 'JavaScript', level: 9 },
            { language: 'React', level: 8 },
            { language: 'Node.js', level: 7 },
        ],
    });

    const [editField, setEditField] = useState('');
    const [fieldValue, setFieldValue] = useState('');

    const handleEdit = (field) => {
        setEditField(field);
        setFieldValue(profile[field]);
    };

    const handleChange = (e) => {
        setFieldValue(e.target.value);
    };

    const handleSave = () => {
        setProfile({ ...profile, [editField]: fieldValue });
        setEditField('');
    };

    const addTechStack = () => {
        alert('Add new tech stack');
    };

    return (
        <div className="grid gap-4 h-screen">
            <div className="card card-side bg-base-100 flex flex-row">
                <div className="avatar pt-3 top-1 pl-5">
                    {/* Replace <Avatar /> with an actual avatar image or component */}
                    <div className="rounded-full w-24 h-24 bg-gray-300"></div>
                </div>
                <div className="card-body flex flex-row pb-5">
                    <div className='pr-5'>
                        <h2 className="card-title">{profile.firstName} {profile.lastName}</h2>
                        <h1>Rating {profile.rating}/10</h1>
                    </div>
                    <div>
                        <div className="rating rating-lg"></div>
                    </div>
                </div>
            </div>

            <div className="card card-side bg-base-100 shadow-xl h-full">
                <div className="p-5">
                    <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                        <path d="M12 11.5V16.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M12 7.51L12.01 7.49889" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </div>
                <div className="card-body">
                    {['firstName', 'lastName', 'email', 'username', 'password', 'github', 'bio'].map((field) => (
                        <div key={field} className='mb-4'>
                            <h2 className='text-lg font-bold'>{field.charAt(0).toUpperCase() + field.slice(1)}</h2>
                            {editField === field ? (
                                <div>
                                    <input
                                        type="text"
                                        value={fieldValue}
                                        onChange={handleChange}
                                        className="input input-bordered w-full max-w-xs"
                                    />
                                    <button onClick={handleSave} className="ml-2 btn btn-success">Save</button>
                                </div>
                            ) : (
                                <div>
                                    <p>{profile[field]}</p>
                                    <button onClick={() => handleEdit(field)} className="text-blue-500 hover:text-blue-700">Edit</button>
                                </div>
                            )}
                        </div>
                    ))}

                    <div className="mb-4">
                        <h2 className='text-lg font-bold'>Field of Expertise</h2>
                        {profile.skills.map((skill, index) => (
                            <div key={index} className='flex flex-row mb-2'>
                                <h1 className='pr-5'>{skill.language}</h1>
                                <h1>{skill.level}/10</h1>
                            </div>
                        ))}
                        <button onClick={addTechStack} className="text-blue-500 hover:text-blue-700">Add new tech stack</button>
                    </div>

                    <div>
                        <h2 className='text-lg font-bold'>Contact Info</h2>
                        <p>Github: github.com/{profile.github}</p>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default UserProfile;
