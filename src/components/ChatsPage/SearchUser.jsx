// src/components/SearchUsers.js
import React, { useState } from 'react';
import axios from 'axios';
// import { projectID, userName, userSecret } from '../ChatEngineConfig';

const SearchUsers = ({ onSelectUser }) => {
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(
                `https://api.chatengine.io/users/`,
                {
                    headers: {
                        'Project-ID': import.meta.env.VITE_PROJECT_ID,
                        'PRIVATE-KEY': import.meta.env.VITE_PROJECT_KEY,
                        'User-Name': 'DagiB',
                        'User-Secret': 'Dagi1234',
                    },
                    params: { search: query },
                }
            );
            setUsers(response.data);
        } catch (error) {
            console.error('Error searching users:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search users..."
                />
                <button type="submit">Search</button>
            </form>
            <ul>
                {users.map((user) => (
                    <li key={user.id} onClick={() => onSelectUser(user)}>
                        {user.username}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchUsers;