import axios from 'axios';

export default {
  // Gets all books
  getSavedBooks: function () {
    return axios.get('/api/books');
  },
  // Gets the book with the given id
  getBookById: function (isbn) {
    return axios.get('/api/books/&id=' + isbn);
  },
  searchByTitle: function (title) {
    return axios.get('/api/books/&title=' + title);
  },
  // Deletes the book with the given id
  deleteBook: function (isbn) {
    return axios.delete('/api/books/&id=' + isbn);
  },
  // Saves a book to the database
  saveBook: function (book) {
    book.saved = true;
    return axios.post('/api/books', book);
  }
};
