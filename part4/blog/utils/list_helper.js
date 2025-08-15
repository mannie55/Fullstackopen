const dummy = (blogs) => {
    return 1
}

// const totalLikes = (blog) => {
//     const totallikes = (sum, blog) => {
//        return sum + blog.likes
//     }
//     return blog.reduce(totallikes, 0)
// }
// const totalLikes = (blog) => blog.reduce((sum, blog) => sum + blog.likes, 0)

const totalLikes = (blogs) => {
  
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes;
  }, 0);
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((max, blog) => {
    return blog.likes > max.likes ? blog : max;
  });
}



module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
}
