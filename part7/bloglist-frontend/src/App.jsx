import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: null, type: null })


  useEffect(() => {
    const fetchBlogs = async () => {
      const returnedBlog = await blogService.getAll()
      const sortedBlog = returnedBlog.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlog)
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)

    }
  }, [])

  console.log(blogs)


  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm
        username={username}
        password={password}
        handleSubmit={handleLogin}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
      />
    </Togglable>
  )



  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      console.log('logging in with', username, password)
      setUsername('')
      setPassword('')
      setNotification({ message: 'sign in successful', type: 'success' })
      setTimeout(() => {
        setNotification({ message: null, type: null })
      }, 2000)
    } catch (exception) {
      setNotification({ message: 'wrong username or password', type: 'error' })
      setTimeout(() => {
        setNotification({ message: null, type: null })
      }, 2000)
    }
  }


  const handleLogout = (event) => {
    event.preventDefault()

    try {
      window.localStorage.removeItem('loggedBlogUser')
      setUser(null)
      setNotification({ message: 'Logout successful', type: 'success' })
      setTimeout(() => {
        setNotification({ message: null, type: null })
      }, 2000)
    } catch(error) {
      setNotification({ message: error, type: 'error' })
      setTimeout(() => {
        setNotification({ message: null, type: null })
      }, 2000)

    }
  }
  const blogFormRef = useRef()

  const addBlog = async (blogObject) => {

    blogFormRef.current.toggleVisibility()

    try {

      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNotification({ message: 'blog added successfully', type: 'success' })


      setTimeout(() => {
        setNotification({ message: null, type: null })
      }, 1500)

    } catch(error) {
      setNotification({ message: error.message || 'An error occurred', type: 'error' })
      setTimeout(() => {
        setNotification({ message: null, type: null })
      }, 1500)
    }
  }

  const addLike = async (id) => {
    const blog = blogs.find(b => b.id === id)
    const optimisticBlog = { ...blog, likes: blog.likes + 1 }

    // Optimistically update UI
    setBlogs(blogs.map(b => b.id === id ? optimisticBlog : b))
    setNotification({ type: 'success', message: `You liked "${blog.title}"` })

    try {
      const returnedBlog = await blogService.update(id, optimisticBlog)

      // Sync with server response
      setBlogs(blogs.map(b => b.id === id ? returnedBlog : b))
    } catch (error) {
    // Rollback if server fails
      setBlogs(blogs.map(b => b.id === id ? blog : b))
      setNotification({ type: 'error', message: 'Failed to like the blog. Please try again.' })
      console.error(error)
    }

    setTimeout(() => setNotification({ message: null, type: null }), 1500)
  }



  const removeBlog = async (id) => {
    try {
      const blog = blogs.find(b => b.id === id)
      const confirmDelete = window.confirm(`Remove ${blog.title} by ${blog.author}`)

      if (confirmDelete) {
        await blogService.remove(id)
        setBlogs(blogs.filter(b => b.id !== id))

        setNotification({ type: 'success', message: 'deleted successfully' })
        setTimeout(() => setNotification({ message: null, type: null }), 1500)
      }
    } catch (error) {
      setNotification({ type: 'error', message: 'something went wrong please try again' })
      setTimeout(() => setNotification({ message: null, type: null }), 1500)

    }
  }




  const blog = () => (
    <>
      <div>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} user={user} handleLike={() => addLike(blog.id)} handleDelete={() => removeBlog(blog.id)}/>)}
      </div>
    </>
  )



  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm

        createBlog={addBlog}
      />
    </Togglable>
  )

  const logout = () => (
    <div>
      <p>{user.name} logged in </p>
      <button onClick={handleLogout}>logout</button>
    </div>

  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification.message} type={notification.type} />
      {user !== null && logout()}
      {user !== null && blogForm()}
      {user === null ? loginForm() : blog() }


    </div>
  )
}

export default App