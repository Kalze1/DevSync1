// UserDetails.js
import React, { useState, useEffect } from 'react';

const UserDetails = ({ userId }) => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    // Fetch the detailed information for the selected user
    fetch(`/api/reported-users/${userId}`)
      .then(response => response.json())
      .then(data => setUserDetails(data))
      .catch(error => console.error('Error fetching user details:', error));
  }, [userId]);

  const deleteUser = () => {
    // Logic to delete the user
  };

  const banFromGroup = () => {
    // Logic to ban the user from a specific group
  };

  const sendWarning = () => {
    // Logic to send a warning to the user
  };

  const banFromWriting = () => {
    // Logic to ban the user from writing in groups
  };

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{userDetails.name}</h2>
      <p>{userDetails.detailedDescription}</p>
      <h3>Reported Chats</h3>
      <ul>
        {userDetails.reportedChats.map(chat => (
          <li key={chat.id}>{chat.text}</li>
        ))}
      </ul>
      <button onClick={deleteUser}>Delete User</button>
      <button onClick={banFromGroup}>Ban from Group</button>
      <button onClick={sendWarning}>Send Warning</button>
      <button onClick={banFromWriting}>Ban from Writing in Groups</button>
    </div>
  );
};

export default UserDetails;
