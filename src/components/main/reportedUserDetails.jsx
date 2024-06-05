import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams for accessing route parameters

const ReportedUserDetails = () => {
  const { id } = useParams(); // Extract user ID from route parameter
  const [reportedUser, setReportedUser] = useState(null);
  const [reportedChats, setReportedChats] = useState([]);

  // Fetch user details and reported chats based on ID (replace with your API call logic)
  useEffect(() => {
    const fetchUserDetails = async () => {
      const response = await fetch(`/api/reported-users/${id}`);
      const data = await response.json();
      setReportedUser(data.user);
      setReportedChats(data.chats);
    };

    fetchUserDetails();
  }, [id]);

  // ... display user details and reported chats (logic based on your data structure)

  return (
    <div className="container mx-auto px-4 py-2">
      {reportedUser ? (
        <>
          <h1>Reported User Details</h1>
          {/* Display user details (username, reportedBy, etc.) */}
          <h2>Reported Chats</h2>
          {/* Display list of reported chats (content, timestamp, etc.) */}
          <h2>Actions</h2>
          {/* Display buttons for potential actions (warn, suspend, etc.) */}
        </>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default ReportedUserDetails;
