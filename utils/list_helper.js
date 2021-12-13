const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let totaLike = 0;
  for (let blog of blogs) {
    totaLike = totaLike + blog.likes;
  }
  return totaLike;
};
const favoriteBlog = (blogs) => {
  {
    let likes = blogs.map((blog) => blog.likes);
    let index = likes.indexOf(Math.max(...likes));
    return {
      title: blogs[index].title,
      author: blogs[index].author,
      likes: blogs[index].likes,
    };
  }
};
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
