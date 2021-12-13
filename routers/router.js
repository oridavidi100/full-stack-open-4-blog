const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { getAllBlogs, newBlog } = require('../controllers/blog');
router.get('/api/blogs', getAllBlogs);

router.post('/api/blogs', newBlog);
module.exports = router;
