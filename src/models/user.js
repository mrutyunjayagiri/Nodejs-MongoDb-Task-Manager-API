const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        index: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Invalid Email')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },

    age: {
        type: Number,
        required: true,
        default: 0,
        validate(value) {
            if(value < 0 ){
                throw new Error('Age must be a positivr number')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})

// Document or Instance  User defined Method

// Virtual RelationShip for User and Tasks
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

// Hiding Private Data
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}
userSchema.methods.generateAuthToken =  async function () {

    const user = this
    const token =  await jwt.sign(user._id.toString(),process.env.JWT_SECRET_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

// Schema user defined Method
userSchema.statics.findByCredentials = async (email, password) => {

    const user =  await User.findOne({email: email})

    if (!user) {
        throw new Error('Unable to login in')
    }

    const hasMatch = await bcrypt.compare(password, user.password)

    if (!hasMatch) {
        throw new Error('Unable to login in')
        
    }
    return user
}


// Hashed password before saving
// for middleware
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// Delete user tasks when user is removed
userSchema.pre('remove', async function(next) {

    const user= this
    await Task.deleteMany({owner: user._id})
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User