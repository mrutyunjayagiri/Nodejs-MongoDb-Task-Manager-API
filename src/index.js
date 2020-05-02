const express = require('express')
require('./db/mongoose')
const bcrypt = require('bcryptjs')

const userRouter = require('./routers/users')
const taskRouter = require('./routers/task')


const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)



app.listen(port, () => {
    console.log('Server started on port : ', port)
})

