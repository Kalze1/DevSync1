import React, { useState, useEffect } from 'react';
import axios from 'axios';

const programmingLanguages = [
  'JavaScript',
  'Python',
  'Java',
  'C++',
  'Ruby',
  'Go',
  'Swift',
  'TypeScript',
  'PHP',
  'C#',
];

const ChannelManagement = () => {
    const [channels, setChannels] = useState([]); // Ensure channels is an array
    const [newChannelName, setNewChannelName] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState(programmingLanguages[0]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch existing channels and users
        fetchChannels();
        fetchUsers();
    }, []);

    const fetchChannels = async () => {
        try {
            const response = await axios.get('/api/channels');
            if (Array.isArray(response.data)) {
                setChannels(response.data);
            } else {
                console.error('Unexpected response format:', response.data);
                setChannels([]); // Set channels to empty array if response is not an array
            }
        } catch (error) {
            console.error('Error fetching channels:', error);
            setChannels([]); // Set channels to empty array on error
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/users');
            if (Array.isArray(response.data)) {
                setUsers(response.data);
            } else {
                console.error('Unexpected response format:', response.data);
                setUsers([]); // Set users to empty array if response is not an array
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            setUsers([]); // Set users to empty array on error
        }
    };

    const handleCreateChannel = async () => {
        if (newChannelName.trim() === '') return;

        try {
            const response = await axios.post('/api/channels', { name: newChannelName, language: selectedLanguage });
            setChannels([...channels, response.data]);
            setNewChannelName('');
        } catch (error) {
            console.error('Error creating channel:', error);
        }
    };

    const handleAssignUsersToChannel = async (channelId, language) => {
        const eligibleUsers = users.filter(user => user.languages.includes(language) && user.hasTakenQuiz);
        try {
            await axios.post(`/api/channels/${channelId}/assign-users`, { users: eligibleUsers });
        } catch (error) {
            console.error('Error assigning users to channel:', error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Channel Management</h2>
            <div className="mb-4">
                <input 
                    type="text" 
                    value={newChannelName} 
                    onChange={(e) => setNewChannelName(e.target.value)} 
                    placeholder="Channel Name" 
                    className="border p-2 rounded w-full"
                />
            </div>
            <div className="mb-4">
                <select 
                    value={selectedLanguage} 
                    onChange={(e) => setSelectedLanguage(e.target.value)} 
                    className="border p-2 rounded w-full"
                >
                    {programmingLanguages.map((language) => (
                        <option key={language} value={language}>
                            {language}
                        </option>
                    ))}
                </select>
            </div>
            <button 
                onClick={handleCreateChannel} 
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
                Create Channel
            </button>
            <ul className="mt-6">
                {channels.map(channel => (
                    <li key={channel.id} className="mb-2">
                        <div className="flex justify-between items-center p-2 border rounded">
                            <span>{channel.name} ({channel.language})</span>
                            <button 
                                onClick={() => handleAssignUsersToChannel(channel.id, channel.language)} 
                                className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                            >
                                Assign Users
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChannelManagement;
