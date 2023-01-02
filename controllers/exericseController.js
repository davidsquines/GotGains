const mongoose = require('mongoose');

const Exercise = require('../models/exerciseModel')

//get all exercise
const getExercises = async (req,res) => {
    const user_id = req.user._id

    const exercises = await Exercise.find({user_id}).sort({updatedAt: -1});
    res.status(200).json(exercises);
}
//get single exercise
const getExercise = async (req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such exercise"})
    }
    const exercise = await Exercise.findById(id)

    if(!exercise) {
        return res.status(404).json({error:"No such exercise"})
    }
    res.status(200).json(exercise)
}

//create new exercise
const createExercise = async (req,res) => {
    const {exercise_name, exercise_user, stats} = req.body;
    let emptyFields = []
    if(!exercise_name){
        emptyFields.push('exercise_name')
    }
    if(!stats.sets){
        emptyFields.push('sets')
    }
    if(!stats.reps){
        emptyFields.push('reps')
    }
    if(!stats.load){
        emptyFields.push('load')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please Fill in all fields ',emptyFields} )
    }
    try{
        const user_id = req.user._id
        const exercise = await Exercise.create({exercise_name, exercise_user, stats, user_id})
        res.status(200).json(exercise)
    } catch (error) {
        res.status(400).json({error: error.message})
    }

    

}


//delete exercise
const deleteExercise = async (req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such exercise"})
    }

    const exercise = await Exercise.findOneAndDelete({_id: id})
    if(!exercise) {
        return res.status(404).json({error:"No such exercise"})
    }
    res.status(200).json(exercise)

}

//update exercise
const updateExercise = async (req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such exercise"})
    }
    const {exercise_date, sets, reps, load} = req.body;
    const stats = {
        exercise_date : exercise_date,
        sets: sets,
        reps: reps,
        load: load
    }

    const exercise = await Exercise.findOneAndUpdate(
        {
            _id:id,
        },
        { $push: 
            {'stats': stats},
            $sort: {exercise_date: -1}
        },
        {
            "new" : true
        }
    )
    if(!exercise) {
        return res.status(404).json({error:"No such exercise"})
    }
    console.log('exercise updated')
    console.log(exercise)
    res.status(200).json({exercise: exercise, msg: "Success, exercise updated"})

}

module.exports = {
    createExercise,
    getExercises,
    getExercise,
    deleteExercise,
    updateExercise
}