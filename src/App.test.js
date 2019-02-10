import React from 'react'
import { render, waitForElement } from 'react-testing-library'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  it('if no user logged, blogs are not rendered', async () => {
    const component = render(<App />)
    component.rerender(<App />)
    await waitForElement(() => component.getByText('kirjaudu'))
    expect(component.container).not.toHaveTextContent('testBlog1')
  })

  it('if user logged, blogs are rendered', async () => {
    const user = {
      username: 'testUser',
      token: '123412341234',
      name: 'test user'
    }
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    const component = render(<App />)
    component.rerender(<App />)
    await waitForElement(() => component.getByText('blogs'))
    expect(component.container).toHaveTextContent('testBlog1')
    expect(component.container).toHaveTextContent('testBlog2')
    expect(component.container).toHaveTextContent('testBlog3')
  })
})