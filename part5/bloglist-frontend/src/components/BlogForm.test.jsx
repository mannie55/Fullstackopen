import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import { expect, test, vi } from 'vitest'
import userEvent from '@testing-library/user-event'


test('event handler is called and also with the right details of blog created', async () => {

  const createBlog = vi.fn()
  const user = userEvent.setup()


  render(<BlogForm createBlog={createBlog}/>)

  const titleInput = screen.getByLabelText('title')
  const authorInput = screen.getByLabelText('author')
  const urlInput = screen.getByLabelText('url')
  const sendButton = screen.getByText('submit')

  await user.type(titleInput, 'testing a form')
  await user.type(authorInput, 'nnamdi')
  await user.type(urlInput, 'url.com')
  await user.click(sendButton)

  //test
  console.log('✅✅', createBlog.mock.calls)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing a form')
  expect(createBlog.mock.calls[0][0].author).toBe('nnamdi')
  expect(createBlog.mock.calls[0][0].url).toBe('url.com')
})
