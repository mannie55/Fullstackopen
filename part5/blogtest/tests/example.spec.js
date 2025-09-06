// @ts-check
import { test, expect } from '@playwright/test';
const { loginWith, createBlog, logOut, likeBlog } = require('./helper')


test.describe('blog app', () => {
	test.beforeEach(async ({ page, request }) => {
		await request.post('http://localhost:3003/api/testing/reset')
		await request.post('http://localhost:3003/api/users', {
			data: {
				name: 'test',
				username: 'test',
				password: 'test'
			}
		})
		await request.post('http://localhost:3003/api/users', {
			data: {
				name: 'test2',
				username: 'test2',
				password: 'test2'
			}
		})
		await page.goto('http://localhost:5173')


	})

	test('Login form is shown', async ({ page }) => {
		await page.getByRole('button', { name: 'login' }).click()

		await expect(page.getByText('Log in')).toBeVisible()
	})

	test.describe('login', () => {
		test('succeeds with correct credentials', async ({ page }) => {
			await loginWith(page, 'test', 'test')

			await expect(page.getByText('test logged in')).toBeVisible()
		})

		test('fails with wrong credentials', async ({ page }) => {
			await loginWith(page, 'test', 'wrongpassword')

			await expect(page.getByText('wrong username or password')).toBeDefined()
		})
	})

	test.describe('When logged in', () => {
		test.beforeEach(async ({ page }) => {
			await loginWith(page, 'test', 'test')

		})

		test('a new blog can be created', async ({ page }) => {


			await createBlog(page, 'my title', 'nnamdi', 'https://www.google.com')
			await expect(page.getByText('my title nnamdi')).toBeVisible()
		})

		test('blog can be liked', async ({ page }) => {
			await createBlog(page, 'test blog', 'nnamdi', 'https://www.google.com')

			const blogText = await page.getByText('test blog nnamdi')
			const otherBlogElement = blogText.locator('..')

			await otherBlogElement.getByRole('button', { name: 'view' }).click()

			await page.getByRole('button', { name: 'like' }).click()



			await expect(page.getByText('likes: 1')).toBeVisible()

		})



		test('blog can be deleted', async ({ page }) => {
			await createBlog(page, 'blog to delete', 'nnamdi', 'https://www.google.com')
			const blogText = page.getByText('blog to delete')
			const otherBlogElement = blogText.locator('..')
			await otherBlogElement.getByRole('button', { name: 'view' }).click()

			await page.on('dialog', dialog => dialog.accept())
			await page.getByRole('button', { name: 'remove' }).click()

			await expect(page.getByText('blog to delete')).not.toBeVisible()
		})
	})

	test.describe('delete button can only be seen by blog owner', () => {
		test.beforeEach(async ({ page }) => {
			await loginWith(page, 'test', 'test')
			await createBlog(page, 'nigeria is great again', 'nnamdi', 'https://www.google.com')
			await logOut(page)

		})

		test('blog is created', async ({ page }) => {
			await loginWith(page, 'test', 'test')
			await expect(page.getByText('nigeria is great again')).toBeVisible()
		})

		test('delete button can only be seen by blog owner', async ({ page }) => {
			await loginWith(page, 'test2', 'test2')
			const blogText = page.getByText('nigeria is great again nnamdi')
			const otherBlogElement = blogText.locator('..')
			await otherBlogElement.getByRole('button', { name: 'view' }).click()

			await expect(page.getByText('remove')).not.toBeVisible()

		})
	})

	test.describe('blogs are arranged by the number of likes', () => {
		test.beforeEach(async ({ page }) => {
			await loginWith(page, 'test', 'test')
			await createBlog(page, 'first blog', 'nnamdi', 'url')
			await createBlog(page, 'second blog', 'nnamdi', 'url')
			await createBlog(page, 'third blog', 'nnamdi', 'url')
		})

		test.only('blogs with the highest likes is sorted first', async ({ page }) => {


			const blogText = await page.getByText('first blog nnamdi')
			const otherBlogElement = blogText.locator('..')

			await otherBlogElement.getByRole('button', { name: 'view' }).click()

			await page.getByRole('button', { name: 'like' }).click()
			await page.getByRole('button', { name: 'like' }).click()
			await otherBlogElement.waitFor()

			await otherBlogElement.getByRole('button', { name: 'hide' }).click()



			const secondBlogText = await page.getByText('second blog nnamdi')
			const secondBlogElement = secondBlogText.locator('..')

			await secondBlogElement.getByRole('button', { name: 'view' }).click()

			await page.getByRole('button', { name: 'like' }).click()




			await page.getByRole('button', { name: 'hide' }).click()
			// await likeBlog(page, 'third blog nnamdi', 3)
		})
	})

})