import * as recordRepository from '../repositories/recordRepository.js';
import * as bookRepository from '../repositories/bookRepository.js';

export async function getAllRecords(role) {
  if (role !== 'ADMIN') {
    const err = new Error('Forbidden.');
    err.status = 403;
    throw err;
  }
  return recordRepository.findAllRecords();
}

export async function getRecordById(requesterId, role, id) {
  const record = await recordRepository.findRecordById(id);
  if (!record) {
    const err = new Error('Record not found.');
    err.status = 404;
    throw err;
  }

  if (role !== 'ADMIN' && record.user_id !== requesterId) {
    const err = new Error('Forbidden.');
    err.status = 403;
    throw err;
  }
  return record;
}

export async function getMyRecords(userId) {
  return recordRepository.findRecordsByUserId(userId);
}

export async function createRecord(userId, data) {
  const book = await bookRepository.findBookById(data.book_id);
  if (!book) {
    const err = new Error('Book not found.');
    err.status = 404;
    throw err;
  }

  if (book.status !== 'AVAILABLE') {
    const err = new Error('Book is not available for borrowing.');
    err.status = 409;
    throw err;
  }

  const record = await recordRepository.createRecord({
    user_id: userId,
    book_id: data.book_id,
    borrow_date: new Date(),
    status: 'BORROWED'
  });

  await bookRepository.updateBook(data.book_id, { status: 'BORROWED' });

  return record;
}

export async function updateRecord(requesterId, role, id, data) {
  const record = await recordRepository.findRecordById(id);
  if (!record) {
    const err = new Error('Record not found.');
    err.status = 404;
    throw err;
  }


  if (role !== 'ADMIN' && record.user_id !== requesterId) {
    const err = new Error('Forbidden.');
    err.status = 403;
    throw err;
  }

  if (data.status === 'RETURNED') {
    data.return_date = new Date();
    await bookRepository.updateBook(record.book_id, { status: 'AVAILABLE' });
  }

  return recordRepository.updateRecord(id, data);
}

export async function deleteRecord(requesterId, role, id) {
  const record = await recordRepository.findRecordById(id);
  if (!record) {
    const err = new Error('Record not found.');
    err.status = 404;
    throw err;
  }


  if (role !== 'ADMIN') {
    const err = new Error('Forbidden.');
    err.status = 403;
    throw err;
  }

  return recordRepository.deleteRecord(id);
}