const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'     // Reference to User Model
    }
}, {
    timestamps: true
})

taskSchema.pre('save', function (next) {
    const task = this

    next()
})

 const Task = mongoose.model('Task', taskSchema)
module.exports = Task