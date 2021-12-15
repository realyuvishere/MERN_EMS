const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')

const {
    createEmployee,
    editEmployee,
    getAllEmployees,
    getEmployee,
    deleteEmployee,
} = require('../controller/employees')

router.post('/new', auth, createEmployee)
router.get('/all', auth, getAllEmployees)
router.get('/single/:uid', auth, getEmployee)
router.patch('/edit', auth, editEmployee)
router.delete('/delete/:uid', auth, deleteEmployee)

module.exports = router