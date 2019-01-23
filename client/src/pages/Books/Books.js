import React, { Component } from 'react';
import Jumbotron from '../../components/Jumbotron';
import DeleteBtn from '../../components/DeleteBtn';
import SaveBtn from '../../components/SaveBtn';
import API from '../../utils/API';
import { Col, Row, Container } from '../../components/Grid';
import { List, ListItem } from '../../components/List';
import { Input, TextArea, FormBtn } from '../../components/Form';

class Books extends Component {
  // Setting our component's initial state
  state = {
    books: [],
    title: '',
    resutlsHeading: 'Saved Books'
  };

  // When the component mounts, load all books and save them to this.state.books
  componentDidMount () {
    API.getSavedBooks().then((results) => {
      this.setState({ books: results });
    });
  }

  // Loads all books  and sets them to this.state.books
  getSavedBooks = () => {
    API.getBooks()
      .then((res) =>
        this.setState({
          books: res.data,
          title: '',
          resultsHeading: 'Saved Books'
        })
      )
      .catch((err) => console.log(err));
  };

  // Save book to database
  saveBook = (book) => {
    book.saved = true;
    API.saveBook(book)
      .then(() =>
        this.setState({
          books: this.state.books,
          title: '',
          resultsHeading: 'Search Results'
        })
      )
      .catch((e) => console.log(e));
  };

  deleteBook = (book) => {
    book.saved = false;
    let bookIndex = this.books.findIndex((i) => {
      if (i.isbn10 === book.isnb10) return i;
    });
    let newArr = this.state.books.splice(bookIndex, 1);
    API.deleteBook(book.isbn10)
      .then(() =>
        this.setState({
          books: newArr,
          title: '',
          resultsHeading: 'Search Resutls'
        })
      )
      .catch((e) => console.log(e));
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // Search for a book by title
  handleFormSubmit = (event) => {
    event.preventDefault();
    API.searchByTitle(this.state.title)
      .then((res) => {
        this.setState({
          books: res.data,
          title: '',
          resultsHeading: 'Search Resutls'
        });
        console.log(res);
      })
      .catch((e) => console.log(e));
  };

  render () {
    return (
      <Container fluid>
        <Row>
          <Col size='sm-12'>
            <Jumbotron>
              <h1>Search for a Book</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name='title'
                placeholder='Title (required)'
              />
              <FormBtn
                disabled={!this.state.title}
                onClick={this.handleFormSubmit}>
                Search
              </FormBtn>
            </form>
          </Col>
        </Row>
        <Row>
          <Col size='sm-12'>
            <Jumbotron>
              <h1>{this.state.resultsHeading}</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map((book) => {
                  return (
                    <ListItem key={book.isbn10}>
                      <a href={'/books/' + book.isbn10}>
                        <strong>
                          {book.title} by {book.author}
                        </strong>
                      </a>
                      <SaveBtn onClick={() => this.saveBook(book)} />
                      {book.saved && (
                        <DeleteBtn onClick={() => this.removeBook(book)} />
                      )}
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
