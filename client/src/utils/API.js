import axios from 'axios';

export default {
  // Gets all books
  getAllSavedBooks: function () {
    return axios.get('/api/books');
  },
  // Gets the book with the given id
  getBookById: function (id) {
    return axios.get('/api/books/' + id);
  },
  searchByTitle: function (title) {
    return axios.get('/api/books/' + title);
  },
  // Deletes the book with the given id
  deleteBook: function (id) {
    return axios.delete('/api/books/' + id);
  },
  // Saves a book to the database
  saveBook: function (bookData) {
    return axios.post('/api/books', bookData);
  }
};
