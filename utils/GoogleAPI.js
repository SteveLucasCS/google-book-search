const axios = require('axios')
module.exports = {
  //function used to grab data for featuredBooks table
  searchByTitle: function (title, cb) {
    console.log('sending API call');
    axios
      .get('https://www.googleapis.com/books/v1/volumes?q=' + title)
      .then(function (response) {
        console.log('Response: ' + response);
        let books = response.data.items;
        let booksArr = [];
        for (let i = 0; i < books.length; i++) {
          let bookInfo = books[i].volumeInfo;
          let  identifiers = [];
          let isbn10;
          for (
            let j = 0;
            bookInfo.industryIdentifiers &&
            j < bookInfo.industryIdentifiers.length;
            j++
          ) {
            identifiers.push({
              type: bookInfo.industryIdentifiers[j].type,
              identifier: bookInfo.industryIdentifiers[j].identifier
            });
            if (bookInfo.industryIdentifiers[j].type === 'ISBN_10') {
              isbn10 = bookInfo.industryIdentifiers[j].identifier;
            }
          }

          let image;
          if (!bookInfo.imageLinks) {
            image = 'https://via.placeholder.com/300/400';
          } else {
            image = bookInfo.imageLinks.thumbnail;
          }

          booksArr.push({
            id: books[i].id,
            title: bookInfo.title,
            author: bookInfo.authors,
            snippet: snippet,
            description: bookInfo.description,
            image: image,
            isbn10: isbn10,
          });
        }
        cb(booksArr);
      })
      .catch(function (err) {
        if (err) throw err;
      });
  }
};
