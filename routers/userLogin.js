const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/userSchema');

loginRouter.post('/', async (request, response) => {
  try {
    const body = request.body;
    const user = await User.findOne({ username: body.username });
    const passwordCorrect = user === null ? false : await bcrypt.compare(body.password, user.password);

    if (!(user && passwordCorrect)) {
      throw { status: 400, message: 'invalid username or password' };
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    response.status(200).send({ token, username: user.username, name: user.name });
  } catch {
    response.send('problem');
  }
});

module.exports = loginRouter;
