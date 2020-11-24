const express = require('express');
const morgan = require('morgan')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const PORT = 3000;
app.use(morgan('dev'))

const tasks = [
    {
        id: 1,
        name: 'task 1',
        completed: false
    },
    {
        id: 2,
        name: 'task 2',
        completed: true
    }, {
        id: 3,
        name: 'task 3',
        completed: false
    }
]

app.get('/api/tasks', (req, res, nex) => {
    res
        .status(200)
        .json({
            success: true,
            data: tasks
        })

})

app.get('/api/tasks/:id', (req, res) => {
    const { id } = req.params
    const task = tasks.find(x => x.id == id)

    if (!task) {
        return res
            .status(404)
            .json({
                success: false,
                data: null
            })
    }
    res.status(200).json({ success: true, data: task })
})

app.post('/api/tasks', (req, res) => {
    const task = {
        id: tasks.length + 1,
        name: req.body.name,
        completed: req.body.completed
    }
    tasks.push(task)

    res
        .status(201)
        .json({
            success: true,
            data: task
        })
})

app.put('/api/tasks/:id', (req, res) => {
    const task = tasks.find(x => x.id == req.params.id)
    if (!task) {
        return res.status(404).json({ success: false, data: null })
    }
    const { name, completed } = req.body
    task.name = name ? name : task.name
    task.completed = completed ? completed : task.completed

    res.status(200).json({
        success: true,
        data: task
    })
})

app.delete('/api/tasks/:id', (req, res) => {
    const task = tasks.find(x => x.id == req.params.id)
    if (!task) {
        return res.status(404).json({ success: false, data: null })
    }

    const index = tasks.indexOf(task)
    tasks.splice(index, 1)
    res.status(200).json({ success: true, data: tasks })
})

app.use((req, res) => {
    res.status(404).json({ success: false, data: null })
})

app.listen(PORT, () => console.log(`App running port: ${PORT}`))

module.exports = app