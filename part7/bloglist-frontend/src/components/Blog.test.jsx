import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect, test, vi } from 'vitest'
import userEvent from '@testing-library/user-event'


test('renders title and author', () => {
  const blog = {
    title: 'new title',
    author: 'new author',
    url: 'url',
    likes: 4
  }

  render (<Blog blog={blog} />)


  expect(screen.getByText(blog.title, { exact: false })).toBeDefined()
  expect(screen.getByText(blog.author,  { exact: false })).toBeDefined()

  expect(screen.queryByText(blog.likes)).toBeNull()
  expect(screen.queryByText(blog.url)).toBeNull()


})

test('blog url and likes are shown when the view button is clicked', async () => {
  const blog = {
    title: 'new title',
    author: 'new author',
    url: 'url.com',
    likes: 10,
    user: {
      username: 'mannnie55',
    }
  }

  render (<Blog blog={blog}/>)

  const user = userEvent.setup()
  const button = screen.getByText('view')

  await user.click(button)
  //tests
  const urlElement = screen.getByText('new author', { exact: false })
  const likesElement = screen.getByText(10, { exact: false })
  expect(urlElement).toBeDefined()
  expect(likesElement).toBeDefined()
})

test('clicking the like button calls event handler', async () => {
  const blog = {
    title: 'new title',
    author: 'new author',
    url: 'url.com',
    likes: 10,
    user: {
      username: 'mannnie55',
    }
  }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} handleLike={mockHandler}/>)

  const user = userEvent.setup()
  await user.click(screen.getByText('view'))
  await user.click(screen.getByText('like'))
  await user.click(screen.getByText('like'))

  //test
  expect(mockHandler.mock.calls).toHaveLength(2)


})