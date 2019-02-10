import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './Blog.css'

const Blog = ({ blog, handleLike, handleRemove, user }) => {
  const [visible, setVisible] = useState(false)

  return (
    <div className='blog' onClick={() => setVisible(!visible)}>
      <div>{blog.title} {blog.author}</div>
      {visible &&
      <div>
        <div><a href={blog.url} >{blog.url}</a></div>
        <div>{blog.likes} likes <button onClick={handleLike}>like</button></div>
        <div>added by {blog.user.name}</div>
        {blog.user.name === user.name && <div><button onClick={handleRemove}>remove</button></div>}
      </div>}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog