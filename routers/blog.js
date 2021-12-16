const express = require('express');
const router = express.Router();
const { getAllBlogs, newBlog, deleteBlog, updateLikes } = require('../controllers/blog');
router.put('/update', updateLikes);
router.get('/', getAllBlogs);
router.delete('/', deleteBlog);
router.post('/', newBlog);
module.exports = router;
