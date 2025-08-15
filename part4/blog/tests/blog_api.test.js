const { test, after, beforeEach, describe } = require('node:test')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)


describe('when there is initially some blog post saved', () => {
    let userId

    beforeEach(async () => {
        await User.deleteMany({})
        await Blog.deleteMany({})

        // Create a user and get their id
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })
        const savedUser = await user.save()
        userId = savedUser._id.toString()

        // Add userId to each blog before inserting
        const blogsWithUser = helper.blogs.map(blog => ({ ...blog, user: userId }))
        await Blog.insertMany(blogsWithUser)
    })

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        assert.strictEqual(response.body.length, helper.blogs.length)

    })

    test('each blog object in DB has "id" and no "_id"', async () => {

        const blogs = await helper.blogPostInDb()

        blogs.forEach(blog => {
            assert.ok(blog.id, true)

        })
    })

    test('likes default to zero if property from the request is not available', async () => {
        const blogPostWithNoLikes = {
            title: 'this is a test',
            author: 'me',
            url: 'no url',
            userId // use the userId from beforeEach
        }

        const res = await api
            .post('/api/blogs')
            .send(blogPostWithNoLikes)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(res.body.likes, 0)
    })





    describe('addition of new blog post', () => {

        test('succeeds with valid data', async () => {
            const blogWithUser = { ...helper.completeBlogPost, userId }
            await api
                .post('/api/blogs')
                .send(blogWithUser)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const updatedBlogPost = await helper.blogPostInDb()
            assert.strictEqual(updatedBlogPost.length, helper.blogs.length + 1)

            const titles = updatedBlogPost.map(b => b.title)
            assert(titles.includes(helper.completeBlogPost.title))
        })

        test('returns status 400 when url or title is missing', async () => {

            await api
                .post('/api/blogs')
                .send(helper.incompleteBlogPost)
                .expect(400)
        })
    })

    describe('updating of new blog post', () => {

        test('succeeds with valid data', async () => {
            const initialBlogPosts = await helper.blogPostInDb()
            const blogPost = initialBlogPosts[2]

            const updateTitle = {
                title: "testing!! testing!! i just updated this title via put✅"
            }

            await api
                .put(`/api/blogs/${blogPost.id}`)
                .send(updateTitle)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const blogs = await helper.blogPostInDb()

        })

        describe('deleting a blog post', () => {

            test('succeeds with no content', async () => {
                const initialBlogPosts = await helper.blogPostInDb()
                const blogPost = initialBlogPosts[0]

                await api
                    .delete(`/api/blogs/${blogPost.id}`)
                    .expect(204)

                await api
                    .delete(`/api/blogs/${blogPost.id}`)
                    .expect(404)

                const blogs = await helper.blogPostInDb()

                assert.strictEqual(blogs.length, initialBlogPosts.length - 1)
            })
        })

    })
})


describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'user',
            name: 'ogbonna nnamdi',
            password: 'newpassword',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(newUser.username))
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'password',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('expected `username` to be unique'))

        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if an invalid username is created', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'ro',
            name: 'Superuser',
            password: 'password',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('username must be at least 3 characters long'))

        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

})

after(async () => {
    await mongoose.connection.close()
})