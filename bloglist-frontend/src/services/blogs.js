import axios from 'axios';
const baseUrl = '/api/blogs';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  console.log(response);
  let blogArr = response.data;
  // for (let i = 0; i < blogArr.length; i++) {
  //   console.log(blogArr[i].likes);
  //   if (blogArr[i].likes < blogArr[i + 1].likes) {
  //     let change = blogArr[i].likes;
  //     blogArr[i].likes = blogArr[i + 1].likes;
  //     blogArr[i + 1].likes = change;
  //   }
  // }
  return blogArr;
};

export default { getAll };
