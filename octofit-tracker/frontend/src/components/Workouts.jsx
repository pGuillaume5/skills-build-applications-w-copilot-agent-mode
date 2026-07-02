import React, { useEffect, useState } from 'react';
import { apiCall, extractData } from '../utils/api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        const data = await apiCall('/workouts');
        setWorkouts(extractData(data));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const getDifficultyBadge = (difficulty) => {
    const badges = {
      beginner: 'badge-success',
      intermediate: 'badge-warning',
      advanced: 'badge-danger',
    };
    return badges[difficulty] || 'badge-secondary';
  };

  if (loading) return <div className="container py-4">Loading workouts...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container py-4">
      <h1>Workouts</h1>
      <div className="row">
        {workouts.length > 0 ? (
          workouts.map((workout) => (
            <div key={workout._id} className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    {workout.name}
                    <span className={`badge ${getDifficultyBadge(workout.difficulty)} ms-2`}>
                      {workout.difficulty.charAt(0).toUpperCase() + workout.difficulty.slice(1)}
                    </span>
                  </h5>
                  {workout.description && <p className="card-text">{workout.description}</p>}
                  <p className="card-text">
                    <strong>Duration:</strong> {workout.duration} min<br />
                    <strong>Target Muscles:</strong> {workout.targetMuscles?.join(', ') || 'N/A'}<br />
                    <strong>Exercises:</strong> {workout.exercises?.length || 0}
                  </p>
                  {workout.exercises && workout.exercises.length > 0 && (
                    <div className="mt-2">
                      <small className="text-muted">
                        <strong>Exercises:</strong>
                        <ul className="mb-0">
                          {workout.exercises.map((ex, idx) => (
                            <li key={idx}>
                              {ex.name}: {ex.sets}x{ex.reps}
                              {ex.weight && ` @ ${ex.weight}kg`}
                            </li>
                          ))}
                        </ul>
                      </small>
                    </div>
                  )}
                  {workout.completed && (
                    <span className="badge bg-success mt-2">Completed</span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No workouts found</p>
        )}
      </div>
    </div>
  );
}
