const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./routers/router');
require('dotenv').config();
const { errorHandlerMiddleware } = require('./middleware/errorHandler');
const mongoUrl = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI;

mongoose
  .connect(mongoUrl)
  .then((result) => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());
app.use('/', router);
app.use(errorHandlerMiddleware);
const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
module.exports = app;
