











// // ReportedUsers.js
// import React, { useState, useEffect } from 'react';

// const ReportedUsers = ({ onSelectUser }) => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     // Fetch the list of reported users from the backend
//     fetch('/api/reported-users')
//       .then(response => response.json())
//       .then(data => setUsers(data))
//       .catch(error => console.error('Error fetching reported users:', error));
//   }, []);

//   return (
//     <div>
//       <h2>Reported Users</h2>
//       <ul>
//         {users.map(user => (
//           <li key={user.id} onClick={() => onSelectUser(user.id)}>
//             <p>{user.name}</p>
//             <p>{user.shortDescription}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ReportedUsers;
import React from 'react';
import { Link } from 'react-router-dom';

const ReportedUser = ({ username, reportedBy, description,id }) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className="px-4 py-2">{username}</td>
      <td className="px-4 py-2">{reportedBy}</td>
      <td className="px-4 py-2 truncate">{description}</td>
      <td className="px-4 py-2">
      <Link to={`/reported-users/${id}`} className="text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 px-2 py-1 rounded">
          View Details
        </Link> 
      </td>
    </tr>
  );
};

const ReportedUsers = () => {
  const reportedUsers = [
    { username: 'johndoe', reportedBy: 'janesmith', description: 'Inappropriate comments in forum post.', id : "111" },
    { username: 'alicesmith', reportedBy: 'bobjohnson', description: 'Spamming the chat room.' , id : "222" },
  ];

  return (
    <div className="container mx-auto px-4 py-2">
      <h1 className="text-2xl font-bold mb-4">Reported Users</h1>
      <table className="w-full border border-gray-200 shadow rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-medium">
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Reported By</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reportedUsers.map((user) => (
            <ReportedUser key={user.username} {...user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportedUsers;
