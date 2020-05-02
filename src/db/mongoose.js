const mongoose = require('mongoose')

mongoose.connect(process.env.MONGOOES_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})





// const me = new User({
//     name: '   SILU SONU   ',
//    age: 26,
//    password: ' SS hhhh',
//     email: 'silu@gmail.com   '
// })

// me.save().then(result => {
// console.log("Saved. ")
// console.log(me)
// }).catch(error=> {
//     console.log("Error: ", error)
// })


// Task
// const Task = mongoose.model('Task', {
//     description: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     }
// })

// const task = new Task({
//     description: "  Have to finish task    ",
// })


// task.save().then(result => {
// console.log("Saved. ")
// console.log(task)
// }).catch(error=> {
//     console.log("Error: ", error)
// })

