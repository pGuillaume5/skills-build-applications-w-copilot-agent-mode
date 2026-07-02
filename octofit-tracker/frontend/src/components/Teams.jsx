import React, { useEffect, useState } from 'react';
import { apiCall, extractData } from '../utils/api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const data = await apiCall('/teams');
        setTeams(extractData(data));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return <div className="container py-4">Loading teams...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container py-4">
      <h1>Teams</h1>
      <div className="row">
        {teams.length > 0 ? (
          teams.map((team) => (
            <div key={team._id} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text">
                    <strong>Members:</strong> {team.members?.length || 0}<br />
                    <strong>Total Points:</strong> {team.totalPoints}<br />
                    <strong>Rank:</strong> #{team.rank}
                  </p>
                  {team.description && <p className="card-text">{team.description}</p>}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No teams found</p>
        )}
      </div>
    </div>
  );
}
