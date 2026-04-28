import * as bookService from '../services/bookService.js';

export async function getAllBooksHandler(req, res, next) {
  try {
    const books = await bookService.getAllBooks();
    res.json(books);
  } catch (err) {
    next(err);
  }
}

export async function getBookByIdHandler(req, res, next) {
  try {
    const book = await bookService.getBookById(Number(req.params.id));
    res.json(book);
  } catch (err) {
    next(err);
  }
}

export async function createBookHandler(req, res, next) {
  try {
    const book = await bookService.createBook(req.user.role, req.body);
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
}

export async function updateBookHandler(req, res, next) {
  try {
    const book = await bookService.updateBook(
      req.user.role,
      Number(req.params.id),
      req.body
    );
    res.json(book);
  } catch (err) {
    next(err);
  }
}

export async function deleteBookHandler(req, res, next) {
  try {
    await bookService.deleteBook(req.user.role, Number(req.params.id));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}