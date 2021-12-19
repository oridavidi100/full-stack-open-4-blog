const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const userExtractor = async (req, res, next) => {
  try {
    const authorization = req.get('authorization');
    if (authorization === undefined) {
      next();
      return null;
    }
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      token = authorization.substring(7);
    }
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      throw { status: 400, message: 'token missing or invalid' };
      //   return response.status(401).json({ error: 'token missing or invalid' });
    }
    const user = await User.findById(decodedToken.id);
    console.log(user);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    next(error);
    return null;
  }
};

module.exports = { userExtractor };
