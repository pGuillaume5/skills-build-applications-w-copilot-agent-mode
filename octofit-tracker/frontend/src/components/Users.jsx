import React, { useEffect, useState } from 'react';
import { apiCall, extractData } from '../utils/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await apiCall('/api/users/');
        setUsers(extractData(data));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="container py-4">Loading users...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container py-4">
      <h1>Users</h1>
      <div className="row">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{user.firstName} {user.lastName}</h5>
                  <p className="card-text">
                    <strong>Username:</strong> {user.username}<br />
                    <strong>Points:</strong> {user.totalPoints}<br />
                    <strong>Rank:</strong> #{user.rank}
                  </p>
                  {user.bio && <p className="card-text">{user.bio}</p>}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  );
}
