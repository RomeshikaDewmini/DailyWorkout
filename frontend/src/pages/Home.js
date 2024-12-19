import { useEffect} from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";

// Components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
    const {workouts,dispatch} = useWorkoutsContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            
                const response = await fetch('/api/workouts');
                const json = await response.json();
               
            if(response.ok){
                dispatch({type: 'SET_WORKOUTS',payload:json})
            }
        };

        fetchWorkouts()
    }, [dispatch]);


    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.length > 0 ? (
                    workouts.map((workout , index) => (
                        <WorkoutDetails key={workout._id || index} workout={workout} />
                    ))
                ) : (
                    <p>No workouts available.</p>
                )}
            </div>
            <WorkoutForm />
        </div>
    );
};

export default Home;
