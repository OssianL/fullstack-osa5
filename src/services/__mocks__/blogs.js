const blogs = [
  {
    id: '5a451df7571c224a31b5c8ce',
    title: 'testBlog1',
    author: 'testAuthor1',
    url: 'testurl.com',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'testUser',
      name: 'test user'
    }
  },
  {
    id: '5a451e21e0b8b04a45638211',
    title: 'testBlog2',
    author: 'testAuthor2',
    url: 'testurl.com',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'testUser',
      name: 'test user'
    }
  },
  {
    id: '5a451e30b5ffd44a58fa79ab',
    title: 'testBlog3',
    author: 'testAuthor3',
    url: 'testurl.com',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'testUser',
      name: 'test user'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = () => {
  return null
}

export default { getAll, setToken }