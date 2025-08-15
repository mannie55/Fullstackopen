const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response, next) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})


// const getTokenFrom = request => {
//     const authorization = request.get('authorization')
//     if (authorization && authorization.startsWith('Bearer ')) {
//         return authorization.replace('Bearer ', '')
//     }
//     return null
// }




blogsRouter.post('/', async (request, response, next) => {
    try {
        console.log('entered router🫡');

        const body = request.body
        console.log(`grab the request body ${body}`);

        const userId = request.user
        console.log(`grab the userid from the token be sent ${userId}`);


        if (!userId) {
            return response.status(401).json({ error: 'token invalid' })
        }
        const userInDb = await User.findById(userId)
        if (!userInDb) {
            return response.status(400).json({ error: 'userId missing or not valid' })
        }
        if (!body.url || !body.title) {
            return response.status(400).end()
        }

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes === undefined ? 0 : body.likes,
            user: userInDb._id
        })

        const savedBlog = await blog.save()
        userInDb.blogs = userInDb.blogs.concat(savedBlog._id) // or userInDb.blogs.push(savedBlog._id)
        await userInDb.save()
        response.status(201).json(savedBlog)
    } catch (error) {
        next(error)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id)
        const userId = request.user
        if (!blog) {
            return response.status(404).end()
        }

        const userIdDb = blog.user.toString()

        if (!request.token) {
            return response.status(401).json({ error: 'token missing' })
        }

        // const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (userId !== userIdDb) {
            return response.status(401).json({ error: 'blog can only be deleted by owner' })
        }

        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } catch (error) {
        next(error)
    }
})


blogsRouter.put('/:id', async (request, response, next) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            request.params.id,
            { $set: request.body },
            { new: true, runValidators: true }
        )
        if (!updatedBlog) {
            return response.status(404).end()
        }
        response.status(200).json(updatedBlog)
    } catch (exception) {
        next(exception)
    }
})

module.exports = blogsRouter