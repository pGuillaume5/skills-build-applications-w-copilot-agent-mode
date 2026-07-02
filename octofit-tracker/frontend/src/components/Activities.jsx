import React, { useEffect, useState } from 'react';
import { apiCall, extractData } from '../utils/api';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const data = await apiCall('/activities');
        setActivities(extractData(data));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const getActivityBadgeColor = (type) => {
    const colors = {
      running: 'badge-info',
      cycling: 'badge-success',
      swimming: 'badge-primary',
      walking: 'badge-warning',
      gym: 'badge-danger',
    };
    return colors[type] || 'badge-secondary';
  };

  if (loading) return <div className="container py-4">Loading activities...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container py-4">
      <h1>Activities</h1>
      <div className="row">
        {activities.length > 0 ? (
          <div className="col-md-8">
            <div className="list-group">
              {activities.map((activity) => (
                <div key={activity._id} className="list-group-item">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">
                      <span className={`badge ${getActivityBadgeColor(activity.type)}`}>
                        {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                      </span>
                    </h5>
                    <small>{new Date(activity.date).toLocaleDateString()}</small>
                  </div>
                  <p className="mb-1">
                    <strong>Duration:</strong> {activity.duration} min
                    {activity.distance && ` | Distance: ${activity.distance} km`}
                    {activity.calories && ` | Calories: ${activity.calories}`}
                  </p>
                  <small>Points: {activity.points}</small>
                  {activity.description && <p className="mb-0">{activity.description}</p>}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>No activities found</p>
        )}
      </div>
    </div>
  );
}
