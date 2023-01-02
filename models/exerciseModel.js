const mongoose = require("mongoose");
const exerciseSchema = new mongoose.Schema({
    exercise_name: {
        type: String,
        required:[true, "Please provide an exercise name"]
    },
    stats: [{
        exercise_date: Date,
        sets: Number,
        reps: Number,
        load: Number,
    }],
    user_id: {
        type: String,
        required: true
    }

}, {timestamps:true})

module.exports = mongoose.model.Exercises || mongoose.model("Exercises", exerciseSchema);