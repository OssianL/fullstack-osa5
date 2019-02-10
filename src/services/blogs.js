import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = 'bearer ' + newToken
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async updatedBlog => {
  const url = baseUrl + '/' + updatedBlog.id
  console.log(updatedBlog)
  const newBlog = {
    likes: updatedBlog.likes,
    author: updatedBlog.author,
    title: updatedBlog.title,
    url: updatedBlog.url
  }
  console.log(newBlog)
  const response = await axios.put(url, updatedBlog)
  return response.data
}

const remove = async removedBlog => {
  const url = baseUrl + '/' + removedBlog.id
  const config = { headers: { Authorization: token } }
  const response = await axios.delete(url, config)
  return response.data
}

export default { getAll, create, update, remove, setToken }