import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: null, type: null })
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)

    }
  }, [])

  const handleUsernameChange = (event) => {
    event.preventDefault
  }

  const loginForm = () => (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
          password
          <input type="password" value={password} name="password" onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit">login</button>
      </form>
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
      setNotification({ message: 'sign in successful', type: 'success'})
      setTimeout(() => {
        setNotification({message: null, type: null})
      }, 2000)
    } catch (exception) {
      setNotification({ message: 'wrong username or password', type: 'error'})
      setTimeout(() => {
        setNotification({message: null, type: null})
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
        setNotification({message: null, type: null})
      }, 2000)
    } catch(error) {
      setNotification({ message: error, type: 'error'})
      setTimeout(() => {
        setNotification({message: null, type: null})
      }, 2000)
      
    }
  } 

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const blogObject = {
        title: title,
        author: author,
        url: url,
      }

      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNotification({ message: `${title} by ${author} added successfully`, type: 'success' })
      setTitle('')
      setAuthor('')
      setUrl('')

      setTimeout(() => {
        setNotification({message: null, type: null})
      }, 2000)

    } catch(error) {
      setNotification({ message: error.message || 'An error occurred', type: 'error'})
      setTimeout(() => {
        setNotification({message: null, type: null})
      }, 2000)
    }
  }


   const blog = () => (
  <>
    <div>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  </>
)


  const blogForm = () => (
    <>
    <h2>create new</h2>
    <form onSubmit={handleSubmit}>
      <div>
        title
        <input 
        type="text"
        value= {title}
        name="title"
        onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input 
        type="text"
        value= {author}
        name="author"
        onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input 
        type="text"
        value= {url}
        name="url"
        onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">submit</button>
    </form>
    </>
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