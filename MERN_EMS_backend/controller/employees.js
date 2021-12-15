const Employee = require('../models/Employee')

const createEmployee = async (req, res) => {
    const {
        email,
        firstname,
        lastname,
        contact,
        department
    } = req.body

    if (email) {
        Employee.findOne({email}, async (err, user) => {
            if (!user) {
                const employee = new Employee({
                    email,
                    firstname,
                    lastname,
                    contact,
                    department,
                })
    
                try {
                    
                    await employee.save()
    
                    return res.status(200).json({
                        message: 'Successfully created employee',
                        data: {
                            employee
                        }
                    })
    
                } catch (e) {
                    
                    let message

                    switch (e.code) {
                        case 11000:
                            message = `An entry already exists with the following value(s): ${JSON.stringify(e.keyValue)}`
                            break
                        default:
                            message = `${e._message}: Following fields are missing - ${Object.keys(e.errors).join(',')}`
                            break
                    }

                    return res.status(500).json({message})
                }
            } else {

                return res.status(400).json({message: 'Employee already exists with this email.'})

            }
        })
    } else {
        return res.status(400).json({
            message: 'Enter all the necessary fields.'
        })
    }
}


const editEmployee = async (req, res) => {
    const {
        email,
        firstname,
        lastname,
        contact,
        department,
        _id,
    } = req.body

    let message

    try {

        const employee = await Employee.updateOne({_id}, {
            $set: {
                email,
                firstname,
                lastname,
                contact,
                department,
            }
        })

        if (employee.modifiedCount) {
            message = `Employee updated successfully`
        } else {
            message = 'No modifications were made since there were no changes.'
        }

        return res.status(200).json({
            message
        })

    } catch (e) {

        return res.status(500).json({
            message: 'Unexpected server error.',
            e
        })

    }
}


const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({}, 'uid firstname lastname employeeID')

        return res.status(200).json({
            message: 'Successfully fetched employees',
            data: [...employees]
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: 'Unexpected server error.',
            e
        })
    }
}


const getEmployee = async (req, res) => {
    const {uid} = req.params

    try {
        const data = await Employee.findOne({_id: uid})

        return res.status(200).json({
            message: `Successfully fetched details of employee #${data.employeeID}`,
            data
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: 'Unexpected server error.',
            e
        })
    }
}

const deleteEmployee = async (req, res) => {
    const {uid} = req.params
    let message, code
    try {
        const employee = await Employee.deleteOne({_id: uid})

        if (employee.deletedCount) {
            code = 200
            message = 'Successfully deleted employee'
        } else {
            code = 404
            message = 'User does not exist'
        }
        return res.status(code).json({
            message,
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: 'Unexpected server error.',
            e
        })
    }
}


module.exports = {
    createEmployee,
    editEmployee,
    getAllEmployees,
    getEmployee,
    deleteEmployee,
}