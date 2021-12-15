const mon = require('mongoose')
const validator = require('validator')

const UserModel = new mon.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: (value) => {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email.')
            }
        }
    }, 
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        validate: (value) => {
            if (value.includes('password')) {
                throw new Error(`Password cannot contain the string 'password'.`)
            }
        }
    }
})

// UserModel.statics.findByCredential = async (login) => {
//     const username = login.username
//     const password = login.password
//     const user = await User.findOne({
//         username
//     })
//     if (!user) {
//         throw new Error('No user with these credentials')
//     } else {
//         const isMatch = await bcrypt.compare(password, user.password)
//         if (!isMatch) {
//             throw new Error('Password is incorrect')
//         }
//         return user
//     }

// }

// UserModel.methods.generateAuthToken = async function () {
//     const user = this
//     const token = jwt.sign({_id: user._id.toString()}, process.env.SECRET_KEY)
//     user.Tokens = user.Tokens.concat({
//         token
//     })
//     await user.save()
//     return token
// }

// UserModel.pre('save', async function (next) {
//     const user = this
//     if (user.isModified('password')) {
//         user.password = await bcrypt.hash(user.password, 8)
//     }
//     next()
// })

module.exports = mon.model('User', UserModel)