import prisma from '../prismaClient.js';

export async function findAllBooks() {
  return prisma.book.findMany();
}

export async function findBookById(id) {
  return prisma.book.findUnique({ where: { id } });
}

export async function createBook(data) {
  return prisma.book.create({ data });
}

export async function updateBook(id, data) {
  return prisma.book.update({ where: { id }, data });
}

export async function deleteBook(id) {
  return prisma.book.delete({ where: { id } });
}