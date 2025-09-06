import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, handleLike, handleDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingleft: 2,
    paddingBottom: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const buttonStyle = {
    backgroundColor : 'blue',
    borderRadius: 5
  }


  const [blogVisible, setBlogVisible] = useState(false)


  return (
    <div style={blogStyle}>
      <div>
        <span>{blog.title} {blog.author}</span>
        <button onClick={() => setBlogVisible(!blogVisible)}>
          {blogVisible ? 'hide' : 'view'}
        </button>
      </div>
      {blogVisible && (
        <div>
          <p>url: {blog.url}</p>
          <p>
            likes: {blog.likes}
            <button onClick={handleLike}>like</button>
          </p>
          <p>
            {blog.user.username}
          </p>
          {blog.user.username === user.username && <button style={buttonStyle} onClick={handleDelete}>remove</button>}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired,
  }).isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
}


export default Blog
