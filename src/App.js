import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useField } from './hooks'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const username = useField('text')
  const password = useField('password')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes-a.likes)
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedUser')
    if(loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username: username.value, password: password.value })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    }
    catch(exception) {
      setNotification('käyttäjätunnus tai salasana virheellinen')
      setTimeout(() => setNotification(null), 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }

  const handleNewBlog = async newBlog => {
    const addedBlog = await blogService.create(newBlog)
    setBlogs(blogs.concat(addedBlog))
    setNotification('uusi blogi: ' + addedBlog.title + ' lisättiin')
    setTimeout(() => setNotification(null), 5000)
  }

  const handleBlogLike = blogToUpdate => async () => {
    blogToUpdate.likes++
    const updatedBlog = await blogService.update(blogToUpdate)
    setBlogs(blogs.map(blog => blog.id === blogToUpdate.id ? { ...blog, likes: updatedBlog.likes } : blog))
  }

  const handleBlogRemove = blogToRemove => async () => {
    if(window.confirm('remove blog ' + blogToRemove.title)) {
      await blogService.remove(blogToRemove)
      setBlogs(blogs.filter(blog => blog.id !== blogToRemove.id))
    }
  }

  if(user === null) {
    return (
      <div>
        {notification && <Notification value={notification} />}
        <h2>log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            käyttäjätunnus
            <input {...username} reset='' />
          </div>
          <div>
            salasana
            <input {...password} reset='' />
          </div>
          <button type='submit'>kirjaudu</button>
        </form>
      </div>
    )
  }
  return (
    <div>
      {notification && <Notification value={notification} />}
      <h2>blogs</h2>
      <div>
        {user.name} logged in
      </div>
      <button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel='lisää blogi'>
        <h2>create new</h2>
        <BlogForm onSubmit={handleNewBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleBlogLike(blog)} handleRemove={handleBlogRemove(blog)} user={user} />
      )}
    </div>
  )
}

export default App