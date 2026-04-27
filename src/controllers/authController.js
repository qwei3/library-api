import * as authService from '../services/authService.js';

export async function signUpHandler(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const user = await authService.signup(name, email, password);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

export async function logInHandler(req, res, next) {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json(result);
  } catch (err) {
    next(err);
  }
}