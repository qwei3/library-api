import * as bookRepository from '../repositories/bookRepository.js';

export async function getAllBooks() {
  return bookRepository.findAllBooks();
}

export async function getBookById(id) {
  const book = await bookRepository.findBookById(id);
  if (!book) {
    const err = new Error('Book not found.');
    err.status = 404;
    throw err;
  }
  return book;
}

// only admin can create books
export async function createBook(role, data) {
  if (role !== 'ADMIN') {
    const err = new Error('Forbidden.');
    err.status = 403;
    throw err;
  }
  return bookRepository.createBook(data);
}

// only admin can update books
export async function updateBook(role, id, data) {
  if (role !== 'ADMIN') {
    const err = new Error('Forbidden.');
    err.status = 403;
    throw err;
  }

  const book = await bookRepository.findBookById(id);
  if (!book) {
    const err = new Error('Book not found.');
    err.status = 404;
    throw err;
  }

  return bookRepository.updateBook(id, data);
}

// only admin can delete books
export async function deleteBook(role, id) {
  if (role !== 'ADMIN') {
    const err = new Error('Forbidden.');
    err.status = 403;
    throw err;
  }

  const book = await bookRepository.findBookById(id);
  if (!book) {
    const err = new Error('Book not found.');
    err.status = 404;
    throw err;
  }

  return bookRepository.deleteBook(id);
}