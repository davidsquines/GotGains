const mongoose = require('mongoose')
const Routine = require('../models/routineModel')

const getRoutines = async (req,res) => {
    const user_id = req.user._id

    const routines = await Routine.find({user_id})
    res.status(200).json(routines)


}

const getRoutine = async(req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such routine"})
    }
    const routine = await Routine.findById(id)

    if(!routine) {
        return res.status(404).json({error:"No such routine"})
    }
    res.status(200).json(routine)
}

const createRoutine = async (req, res) => {
    const {routine_name, exercises} = req.body;
    try{
        const user_id = req.user._id;
        const routine = await Routine.create({routine_name, exercises, user_id})
        res.status(200).json(routine);

    } catch(error){
        res.status(400).json({error: error.message})
    }
}

const deleteRoutine = async (req,res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such routine"})
    }

    const routine = await Routine.findOneAndDelete({_id: id})
    if(!routine) {
        return res.status(404).json({error:"No such routine"})
    }
    res.status(200).json(routine)
}

const updateRoutine = async (req, res) => {
    const {id} = req.params;
    const {routine_name, exercises} = req.body;

    const routine = await Routine.findOneAndUpdate({_id:id});

    if(!routine){
        return res.status(404).json({error: "No such routine"})
    }

    routine.routine_name = routine_name;
    routine.exercises = exercises;
    await routine.save();

    res.status(200).json({routine:routine})

}

module.exports = {
    createRoutine,
    getRoutine,
    getRoutines,
    deleteRoutine,
    updateRoutine
}