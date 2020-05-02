const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/authentication')

const router = new express.Router()


router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ... req.body,   // ES6=> Spread Operator that is for copying the element
        owner: req.user._id

    })

    try {
        await task.save()
        res.status(201).send(task)

    } catch (error) {
        res.status(500).send(error)
        
    }
})

// Get All My Tasks
// GET /tasks/mytasks?completed=true
// GET/tasks/mytasks?limit=10&skip=0
router.get('/tasks/mytasks', auth, async (req, res) => {

    const match = {}
    const sort = {}

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1]==='desc'? -1: 1
    }

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    try {
        // const tasks = await Task.find({owner: req.user._id})
        const tasks = await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit:parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.status(200).send(req.user.tasks)
    
    } catch (error) {
        res.status(500).send(error)
        
    }
    })

// Get All Tasks
router.get('/tasks', async (req, res) => {
try {
    const tasks = await Task.find({})
    res.status(200).send(tasks)

} catch (error) {
    res.status(500).send(error)
    
}
})

router.get('/tasks/:id', auth, async(req, res) => {

    const _id = req.params.id
    try {
        const task = await Task.findOne({_id, owner: req.user._id})
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
        
    }
    
})

router.patch('/tasks/:id', auth, async(req, res)=> {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))   // false if cond is false
    if (!isValidOperation) {
        return res.status(400).send({'error': 'Invalid updates!!!'})
    }
    const _id = req.params.id
    try {

        const task = await Task.findOne({_id: _id, owner: req.user._id})
        updates.forEach(update=> task[update]=req.body[update])
        await task.save()

        // const task = await Task.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
        
    }
})

// Delete My Task By Id
router.delete('/tasks/:id',auth, async(req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})
        if (!task) {
            return res.status(404).send() 
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
        
    }
})

module.exports = router
