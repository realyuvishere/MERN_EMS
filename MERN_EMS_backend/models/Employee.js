const mon = require('mongoose')
const validator = require('validator')

const EmployeeModel = new mon.Schema({
    uid: {
        type: mon.Schema.Types.ObjectId,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    employeeID: {
        type: Number,
        unique: true,
        length: 5,
        default: () => (Math.floor((Math.random() * 89999) + 10000))
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: (value) =>{
            if(!validator.isEmail(value)) {
                throw new Error('Invalid email value.')
            }
        }
    },
    contact: {
        type: Number,
        unique: true,
        required: true,
    },
    department: {
        type: String,
        required: true,
    }
})

module.exports = mon.model('Employee', EmployeeModel)