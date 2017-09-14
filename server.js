const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

// parse application/json and look for raw text
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

// mongoose db init
if (process.env.NODE_ENV == 'test') {	
	const Mockgoose = require('mockgoose').Mockgoose;
	const mockgoose = new Mockgoose(mongoose);
	mockgoose.prepareStorage().then(() => {
		const dbHost = 'mongodb://root:Password@ds133964.mlab.com:33964/bookstore-tdd-api';
		mongoose.connect(dbHost);
		const db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));	
		});
} else {
	const dbHost = 'mongodb://root:Password@ds133964.mlab.com:33964/bookstore-tdd-api';
	mongoose.connect(dbHost);
	const db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
}

// home path
app.get('/', (req, res) => { res.json({ msg: 'Welcome to our bookstore.' })});

// book routes
const bookRoutes = require('./routes/book');
app.route('/book')
	.get(bookRoutes.getBooks)
	.post(bookRoutes.postBook);
app.route('/book/:id')
	.get(bookRoutes.getBook)
	.delete(bookRoutes.deleteBook)
	.put(bookRoutes.updateBook);

// listen to port 
const port = process.env.NODE_ENV == 'test' ? 8080 : 3000;
app.listen(port, () => console.log('App listening on port ' + port));

// for testing purpose
module.exports = app;