const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const { request, response } = require('../app')

usersRouter.post('/', async (request, response, next) => {
    try {
        const { username, name, password } = request.body

        if (!password || password.length < 3) {
            return response.status(400).json({ error: 'password must be at least 3 characters long' })
        } else if (!username || username.length < 3) {
            return response.status(400).json({ error: 'username must be at least 3 characters long' })
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = new User({
            username,
            name,
            passwordHash,
        })

        const savedUser = await user.save()

        response.status(201).json(savedUser)
    } catch (error) {
        next(error)
    }

})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 })
    return response.json(users)
})

module.exports = usersRouter