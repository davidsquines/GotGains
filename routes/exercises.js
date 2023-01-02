const express = require('express')
const {
    createExercise,
    getExercises,
    getExercise,
    updateExercise,
    deleteExercise
} = require('../controllers/exericseController')
const {requireAuth} = require('../middleware/requireAuth')

const router = express.Router();

router.use(requireAuth)

//get all exercises 
router.get('/', getExercises)

//get all exercises with passed exercise name
router.get('/:id', getExercise)

//post new exercise
router.post('/', createExercise)

//delete exercise
router.delete('/:id', deleteExercise)
//update exercise
//i.e add new set and rep range
router.patch('/:id', updateExercise)

module.exports = router;