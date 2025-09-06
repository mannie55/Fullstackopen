import { useState } from 'react'
import PropTypes from 'prop-types'


const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url

    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <label>
            title
            <input
              type="text"
              name="title"
              placeholder="the hitler"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            author
            <input
              type="text"
              name="author"
              placeholder="j. smith"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            url
            <input
              type="text"
              placeholder="https..."
              name="url"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}


export default BlogForm