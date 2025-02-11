import { useState } from 'react';
import { useWorkoutsContext } from "../hooks/useWorkoutContext";

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext();

    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create workout object to send in the request body
        const workout = { title, load, reps };

        try {
            const response = await fetch('/api/workouts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(workout), // Send the workout object
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.error);
            } else {
                // Clear input fields and errors on success
                setTitle('');
                setLoad('');
                setReps('');
                setError(null);

                console.log('New workout added:', json);
                dispatch({ type: 'CREATE_WORKOUT', payload: json });
            }
        } catch (err) {
            console.error('Failed to submit workout:', err);
            setError('Failed to submit workout. Please try again.');
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Workout Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />

            <label>Load (kg):</label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
            />

            <label>Reps:</label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
            />

            <button type="submit">Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default WorkoutForm;
