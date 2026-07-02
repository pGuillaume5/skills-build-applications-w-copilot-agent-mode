import React, { useEffect, useState } from 'react';
import { apiCall, extractData, getApiBaseUrl } from '../utils/api';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [leaderboardType, setLeaderboardType] = useState('user');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        // Codespaces URL: https://effective-space-fiesta-4jjxxv665q4whv5-8000.app.github.dev/api/leaderboard/
        const url = `${getApiBaseUrl()}/api/leaderboard/`;
        const data = await apiCall(url);
        const allEntries = extractData(data);
        
        // Filter by type
        const filtered = allEntries.filter(entry => entry.type === leaderboardType);
        setLeaderboard(filtered);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [leaderboardType]);

  const handleTypeChange = (type) => {
    setLeaderboardType(type);
  };

  if (loading) return <div className="container py-4">Loading leaderboard...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container py-4">
      <h1>Leaderboard</h1>
      
      <div className="btn-group mb-4" role="group">
        <button
          type="button"
          className={`btn ${leaderboardType === 'user' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => handleTypeChange('user')}
        >
          Users
        </button>
        <button
          type="button"
          className={`btn ${leaderboardType === 'team' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => handleTypeChange('team')}
        >
          Teams
        </button>
      </div>

      {leaderboard.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Rank</th>
                <th>{leaderboardType === 'user' ? 'User' : 'Team'}</th>
                <th>Total Points</th>
                <th>Activities</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry) => (
                <tr key={entry._id}>
                  <td>
                    <strong>#{entry.rank}</strong>
                  </td>
                  <td>
                    {leaderboardType === 'user'
                      ? `User ${entry.userId?.slice(-6) || 'N/A'}`
                      : `Team ${entry.teamId?.slice(-6) || 'N/A'}`}
                  </td>
                  <td>{entry.totalPoints}</td>
                  <td>{entry.activitiesCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No leaderboard entries found</p>
      )}
    </div>
  );
}
