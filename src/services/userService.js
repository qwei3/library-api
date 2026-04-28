import * as userRepository from '../repositories/userRepository.js';

export async function getAllUsers() {
  return userRepository.findAllUsers();
}

export async function getUserById(id) {
  const user = await userRepository.findUserById(id);
  if (!user) {
    const err = new Error('User not found.');
    err.status = 404;
    throw err;
  }
  return user;
}

export async function updateUser(requesterId, requesterRole, targetId, data) {
  if (requesterId !== targetId && requesterRole !== 'ADMIN') {
    const err = new Error('Forbidden.');
    err.status = 403;
    throw err;
  }
  const user = await userRepository.findUserById(targetId);
  if (!user) {
    const err = new Error('User not found.');
    err.status = 404;
    throw err;
  }
  return userRepository.updateUser(targetId, data);
}

export async function deleteUser(requesterId, requesterRole, targetId) {
  if (requesterId !== targetId && requesterRole !== 'ADMIN') {
    const err = new Error('Forbidden.');
    err.status = 403;
    throw err;
  }

  const user = await userRepository.findUserById(targetId);
  if (!user) {
    const err = new Error('User not found.');
    err.status = 404;
    throw err;
  }

  return userRepository.deleteUser(targetId);
}