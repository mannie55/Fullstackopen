const loginWith = async (page, username, password) => {
    await page.getByRole('button', { name: 'login' }).click()
    await page.getByLabel('username').fill(username)
    await page.getByLabel('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
    await page.getByRole('button', { name: 'create new blog' }).click()
    const titl = page.getByLabel('title')
    await titl.fill(title)
    await titl.waitFor()
    const autho = page.getByLabel('author')
    await autho.fill(author)
    await autho.waitFor()
    const ur = page.getByLabel('url')
    await ur.fill(url)
    await ur.waitFor()
    const button = page.getByRole('button', { name: 'submit' })
    button.click()
    button.waitFor()

}

const logOut = async (page) => {
    await page.getByRole('button', { name: 'logout' }).click()
}


const likeBlog = async (page, title, amount) => {
    const blogText = await page.getByText(title)
    const otherBlogElement = blogText.locator('..')
    await otherBlogElement.getByRole('button', { name: 'view' }).click()

    for (let i = 0; i < amount; i++) {
        const likeButton = page.getByRole('button', { name: 'like' }).click()

    }
    const element = blogText.locator('..')
    await element.getByRole('button', { name: 'hide' }).click()

}

export { loginWith, createBlog, logOut, likeBlog }