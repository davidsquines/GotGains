const mongoose = require("mongoose");
const routineSchema = new mongoose.Schema({
    routine_name: {
        type: String,
        required:[true, "Please provide an exercise name"]
    },
    exercises: [{
        exercise_name: String,
        exercise_id: String
    }],
    user_id: {
        type: String,
        required: true
    }

}, {timestamps:true})

module.exports = mongoose.model.Routines || mongoose.model("Routines", routineSchema);