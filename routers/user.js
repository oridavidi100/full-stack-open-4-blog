const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/userSchema');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 });
  response.send(users);
});

usersRouter.post('/', async (request, response) => {
  console.log('g');
  if (request.body.password.length < 3) {
    throw { status: 400, message: 'Password not long enough' };
  } else {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(request.body.password, saltRounds);

    const user = new User({
      username: request.body.username,
      name: request.body.name,
      password: passwordHash,
    });

    try {
      const savedUser = await user.save();
      response.json(savedUser.toJSON());
    } catch (error) {
      response.status(400).json({ error: error });
    }
  }
});

module.exports = usersRouter;
