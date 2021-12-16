function errorHandlerMiddleware(error, request, response, next) {
  // if (err.name === 'CastError' && err.kind === 'ObjectId') {
  //   return res.status(400).send({ error: 'malformatted id' });
  // } else if (err.name === 'ValidationError') {
  //   return res.status(400).json({ error: error.message });
  // } else if (err.name === 'JsonWebTokenError') {
  //   return res.status(401).json({
  //     error: 'invalid token',
  //   });
  // } else if (err.name === 'TokenExpiredError') {
  //   return res.status(401).json({
  //     error: 'token expired',
  //   });
  // }

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token',
    });
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired',
    });
  }

  next(error);
}

module.exports = { errorHandlerMiddleware };
