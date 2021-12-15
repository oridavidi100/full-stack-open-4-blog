const express = require('express');
const router = express.Router();
const { getAllBlogs, newBlog, deleteBlog, updateLikes } = require('../controllers/blog');
router.put('/api/blogs/update', updateLikes);
router.get('/api/blogs', getAllBlogs);
router.delete('/api/blogs', deleteBlog);
router.post('/api/blogs', newBlog);
module.exports = router;
