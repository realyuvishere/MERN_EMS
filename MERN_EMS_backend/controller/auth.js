const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

const login = async (req, res) => {
    
    let code, message

    try {

        const {
            email,
            password
        } = req.body
        
        if (email && password) {

            const user = await User.findOne({email})

            if (user) {
                const passMatch = await bcrypt.compare(password, user.password)

                if (!passMatch) {
                    code = 403
                    message = 'Invalid credentials.'

                    return res.status(code).json({message})
                }

                const token = jwt.sign({id: user.uid}, process.env.JWT_SECRET)

                // res.cookie('jwt', token)
                // res.header('x-auth-token', token)


                code = 200
                message = 'User authenticated.'

                delete user.password
                
                return res.status(code).json({message, data: {token, user}})

            } else {

                code = 404
                message = 'No user found with those credentials.'

                return res.status(code).json({message})
            }

        } else {

            code = 400
            message = 'Please enter all the necessary credentials.'

            return res.status(code).json({message})
        }

    } catch (e) {
        
        code = 500
        message = e.message

        return res.status(code).json({message})

    }
}

const register = async (req, res) => {

    const {
        email,
        password,
        username,
        name,
    } = req.body

    if (email && password && username && name) {
        User.findOne({email}, async (err, user) => {
            if (!user) {
    
                const salt = await bcrypt.genSalt()
    
                const passwordEncrypted = await bcrypt.hash(password, salt)
    
                const user = new User({
                    email,
                    password: passwordEncrypted,
                    name,
                    username,
                })
    
                try {
    
                    await user.save()
                    
                    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
    
                    // res.cookie("jwt", token)
                    // res.header('x-auth-token', token)
                    delete user.password
    
                    return res.status(200).json({
                        message: 'Successfully created new user.',
                        data: {
                            token,
                            user,
                        }
                    })
    
                } catch (e) {
                    console.log(e)
                    res.status(500).json({message: e})
                }
                
            } else {
                res.status(400).json({message: 'User already exists with those credentials.'})
            }
        })
    } else {
        return res.status(400).json({message: 'Please fill in the necessary fields.'})
    }
}

const logout = (req, res) => {

}

module.exports = {
    login,
    register,
    logout
}