import * as userService from '../services/userService.js';

export async function getAllUsersHandler(req, res, next) {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export async function getUserByIdHandler(req, res, next) {
  try {
    const user = await userService.getUserById(Number(req.params.id));
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function updateUserHandler(req, res, next) {
  try {
    const user = await userService.updateUser(
      req.user.id,
      req.user.role,
      Number(req.params.id),
      req.body
    );
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function deleteUserHandler(req, res, next) {
  try {
    await userService.deleteUser(
      req.user.id,
      req.user.role,
      Number(req.params.id)
    );
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}