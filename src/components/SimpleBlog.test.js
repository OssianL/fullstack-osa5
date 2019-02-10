import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  let component
  let mockHandler

  beforeEach(() => {
    mockHandler = jest.fn()
    component = render(
      <SimpleBlog blog={{ title:'testTitle', author:'testAuthor', likes:15 }} onClick={mockHandler}/>
    )
  })

  it('renders blog title, author and likes', () => {
    expect(component.container).toHaveTextContent('testTitle')
    expect(component.container).toHaveTextContent('testAuthor')
    expect(component.container).toHaveTextContent('blog has 15 likes')
  })

  it('calls onClick handler', () => {
    const button = component.container.querySelector('button')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls.length).toBe(2)
  })
})