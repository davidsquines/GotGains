const express = require('express')
const {
    createRoutine,
    getRoutine,
    getRoutines,
    updateRoutine,
    deleteRoutine
} = require('../controllers/routineController')
const {requireAuth} = require('../middleware/requireAuth')

const router = express.Router();
router.use(requireAuth)

router.get('/', getRoutines)

router.get('/:id', getRoutine)

router.post('/', createRoutine)

router.delete('/:id', deleteRoutine)

router.patch('/:id', updateRoutine)

module.exports = router

