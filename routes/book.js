const mongoose = require('mongoose');
const Book = require('../models/book');

/**
 * GET /book route to retrieve all books
 */
function getBooks(req, res) {
	const query = Book.find({});
	query.exec((err, books) => {
		if (err) res.send(err);

		res.json(books);
	});
}

/**
 * POST /book to save a new book
 */
function postBook(req, res) {
	const newBook = new Book(req.body);

	newBook.save((err, book) => {
		if (err) res.send(err);
		else res.json({ msg: 'Books successfully added!', book });
	});
}

/*
 * GET /book/:id route to retrieve a book given its id.
 */
function getBook(req, res) {
	Book.findById(req.params.id, (err, book) => {
		if (err) res.send(err);

		res.json(book);
	});
}

/*
 * DELETE /book/:id to delete a book given its id.
 */
function deleteBook(req, res) {
	Book.remove({ _id: req.params.id }, (err, result) => {
		res.json({ msg: 'Book successfully deleted!', result });
	});
}

/*
 * PUT /book/:id to updatea a book given its id
 */
function updateBook(req, res) {
	Book.findById({ _id: req.params.id }, (err, book) => {
		if (err) res.send(err);
		Object.assign(book, req.body).save((err, book) => {
			if (err) res.send(err);
			res.json({ msg: 'Book updated!', book });
		});
	});
}

module.exports = { getBooks, postBook, getBook, deleteBook, updateBook };