import React, { useState } from 'react';

const ReportedUsersPage = () => {
  // Mock reported users data for visualization
  const [reportedUsers] = useState([
    { id: 1, username: 'user1', reason: 'Inappropriate behavior' },
    { id: 2, username: 'user2', reason: 'Spamming' },
    { id: 3, username: 'user3', reason: 'Harassment' },
    // Add more mocked reported users as needed
  ]);

  // State to manage which report is currently expanded
  const [expandedReport, setExpandedReport] = useState(null);

  // Function to handle report click and toggle expanded state
  const handleReportClick = (reportId) => {
    setExpandedReport(expandedReport === reportId ? null : reportId);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Reported Users</h1>
      <ul className="space-y-4">
        {/* Map through the mocked reported users array and display each reported user */}
        {reportedUsers.map((user) => (
          <li key={user.id} className="border p-4 rounded-md">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => handleReportClick(user.id)}>
              <div>
                <strong>User ID:</strong> {user.id}
              </div>
              <div>
                <strong>Username:</strong> {user.username}
              </div>
              <div>
                <strong>Reason:</strong> {user.reason}
              </div>
            </div>
            {/* Show additional details and actions if report is expanded */}
            {expandedReport === user.id && (
              <div className="mt-4">
                {/* Additional details or actions here */}
                <button className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2">Warn User</button>
                <button className="bg-red-500 text-white py-2 px-4 rounded-md">Ban User</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportedUsersPage;
