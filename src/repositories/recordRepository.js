import prisma from '../prismaClient.js';

export async function findAllRecords() {
  return prisma.record.findMany({
    include: { user: { select: { id: true, name: true, email: true } }, book: true }
  });
}

export async function findRecordById(id) {
  return prisma.record.findUnique({
    where: { id },
    include: { user: { select: { id: true, name: true, email: true } }, book: true }
  });
}

export async function findRecordsByUserId(userId) {
  return prisma.record.findMany({
    where: { user_id: userId },
    include: { book: true }
  });
}

export async function createRecord(data) {
  return prisma.record.create({
    data,
    include: { user: { select: { id: true, name: true, email: true } }, book: true }
  });
}

export async function updateRecord(id, data) {
  return prisma.record.update({
    where: { id },
    data,
    include: { user: { select: { id: true, name: true, email: true } }, book: true }
  });
}

export async function deleteRecord(id) {
  return prisma.record.delete({ where: { id } });
}