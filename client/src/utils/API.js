import axios from 'axios';

export default {
  // Gets all books
  getSavedBooks: function () {
    console.log('Reached getSavedBooks');
    return axios.get('/api/books');
  },
  // Gets the book with the given id
  getBookById: function (id) {
    return axios.get('/api/books/&id=' + id);
  },
  searchByTitle: function (title) {
    return axios.get('/api/books/&title=' + title);
  },
  // Deletes the book with the given id
  deleteBook: function (id) {
    return axios.delete('/api/books/&id=' + id);
  },
  // Saves a book to the database
  saveBook: function (book) {
    console.log(book);
    return axios.post('/api/books', book);  
  }
};
