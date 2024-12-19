import { createContext, useReducer } from "react";

// Create context for workouts
export const WorkoutsContext = createContext();

// Reducer function to handle actions related to workouts
export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            // Ensure the payload is an array before updating the state
            return {
                workouts: Array.isArray(action.payload) ? action.payload : [],
            };
        case 'CREATE_WORKOUT':
            // Ensure workouts is an array before adding a new workout
            return {
                workouts: Array.isArray(state.workouts) ? [action.payload, ...state.workouts] : [action.payload],
            };
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((w)=>w._id !== action.payload._id)
            }
        default:
            return state;
    }
};

// Context provider component to manage workouts state
export const WorkoutsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: [], // Initialize workouts as an empty array
    });

    return (
        <WorkoutsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </WorkoutsContext.Provider>
    );
};
