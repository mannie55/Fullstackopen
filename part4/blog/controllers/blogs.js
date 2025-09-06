const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response, next) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})




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
        const populatedBlog = await Blog.findById(savedBlog._id).populate('user', { username: 1, name: 1 })
        userInDb.blogs = userInDb.blogs.concat(populatedBlog._id) // or userInDb.blogs.push(savedBlog._id)
        await userInDb.save()
        response.status(201).json(populatedBlog)
    } catch (error) {
        next(error)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const { likes } = request.body

    try {
        const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 })


        if (!blog) {
            return response.status(404).end()
        }

        blog.likes = likes

        const savedBlog = await blog.save()
        response.status(200).json(savedBlog)
    } catch (exception) {
        next(exception)
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



module.exports = blogsRouter