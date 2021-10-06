const express = require('express')
const app = express()
const mongoose = require('mongoose')
const User = require('./User')

mongoose.connect('mongodb://127.0.0.1:27017/testTask', { useNewUrlParser: true, useUnifiedTopology: true })

app.use(express.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})

app.get('/api/users/', async (req, res) => {
    let limit = 30, skip = 0
    if(req.query.limit) limit = req.query.limit
    if(req.query.skip) skip = req.query.skip
    const users = await User.find({name: { $regex: req.query.searchTerm }}).limit(parseInt(limit)).skip(parseInt(skip))

    res.send(users)
})

app.post('/api/users/', async (req, res) => {
    try {
        const user = new User(req.body)

        await user.save()
        res.status(201).send(user)
    }
    catch(e) {
        res.status(500).send(e)
    }
})

app.listen(25565, () => {
    console.log('Started.')
})