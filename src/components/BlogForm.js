import React from 'react'
import { useField } from '../hooks'

const BlogForm = ({ onSubmit }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const handleNewBlog = async event => {
    event.preventDefault()
    onSubmit({ title: title.value, author: author.value, url: url.value })
  }

  return (
    <form onSubmit={handleNewBlog}>
      <div>title: <input {...title} reset='' /></div>
      <div>author: <input {...author} reset='' /></div>
      <div>url: <input {...url} reset='' /></div>
      <div><button type='submit'>create</button></div>
    </form>
  )
}

export default BlogForm