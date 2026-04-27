export function validateSignUp(req, res, next) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    const err = new Error('Name, email, and password are required.');
    err.status = 400;
    return next(err);
  }
  next();
}

export function validateLogIn(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    const err = new Error('Email and password are required.');
    err.status = 400;
    return next(err);
  }
  next();
}