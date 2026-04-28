import prisma from '../prismaClient.js';

export async function findByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser(data) {
  return prisma.user.create({ data });
}

export async function findAllUsers() {
  return prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, created_at: true }
  });
}

export async function findUserById(id) {
  return prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, role: true, created_at: true }
  });
}

export async function updateUser(id, data) {
  return prisma.user.update({ where: { id }, data });
}

export async function deleteUser(id) {
  return prisma.user.delete({ where: { id } });
}