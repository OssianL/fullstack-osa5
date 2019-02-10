import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'testTitle',
      author: 'testAuthor',
      url: 'testurl.com',
      likes: 10,
      user: {
        name: 'testUser'
      }
    }
    component = render(
      <Blog blog={blog} handleLike={() => null} handleRemove={() => null} user={{ name: 'testUser' }} />
    )
  })

  it('by default only renders title and author', () => {
    expect(component.container).toHaveTextContent('testTitle')
    expect(component.container).toHaveTextContent('testAuthor')
    expect(component.container).not.toHaveTextContent('testurl.com')
    expect(component.container).not.toHaveTextContent('10 likes')
  })

  it('after clicking renders title, author, url and likes', () => {
    const blog = component.container.querySelector('.blog')
    fireEvent.click(blog)
    expect(component.container).toHaveTextContent('testTitle')
    expect(component.container).toHaveTextContent('testAuthor')
    expect(component.container).toHaveTextContent('testurl.com')
    expect(component.container).toHaveTextContent('10 likes')
    expect(component.container).toHaveTextContent('added by testUser')
  })
})