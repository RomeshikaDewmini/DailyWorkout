const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

//Get all workouts

const getWorkouts = async (req, res) => {
     const workouts = await Workout.find({}).sort({createdAt: -1})

        res.status(200).json({workouts})
}


//Get a single workout
const getWorkout = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message: 'Workout not found'}) 
    }

    const workout = await Workout.findById(id)

    if(!workout) {
       return res.status(404).json({message: 'Workout not found'})
    }
    res.status(200).json({workout})
}



//create a workout
const createWorkout = async (req, res) => {
    const {title, reps, load} = req.body
    
    //add doc to db
    try {
        const workout = await Workout.create({title, reps, load})
        res.status(200).json({workout})
    } catch (error) {
        res.status(400).json({message: 'Error creating workout'})
    }
}


//delete a workout
const deleteWorkout = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message: 'Workout not found'}) 
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if(!workout) {
       return res.status(404).json({message: 'Workout not found'})
    }
    res.status(200).json({message: 'Workout deleted'})
}

//update a workout
const updateWorkout = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message: 'Workout not found'}) 
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!workout) {
       return res.status(404).json({message: 'Workout not found'})
    }
    res.status(200).json({workout})
}

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}