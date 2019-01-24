import React, { Component } from 'react';
import API from '../../utils/api.js';
import { Col, Row, Container } from '../../components/Grid';
import { Input, FormBtn } from '../../components/Form';
import ControlledTabs from '../../components/Tabs';

class Books extends Component {
  // Setting our component's initial state
  state = {
    books: [],
    savedBooks: [],
    title: '',
    resutlsHeading: 'Saved Books'
  };

  // When the component mounts, load all books and save them to this.state.books
  componentDidMount () {
    API.getSavedBooks().then((results) => {
      this.setState({
        books: results.data,
        savedBooks: results.data
      });
    });
  }

  // Loads all books  and sets them to this.state.books
  getSavedBooks = () => {
    API.getSavedBooks()
      .then((res) =>
        this.setState({
          resultsHeading: 'Saved Books',
          savedBooks: res.data
        })
      )
      .catch((err) => console.log(err));
  };

  // Save book to database
  saveBook = (book) => {
    book.saved = true;
    API.saveBook(book)
      .then(() => {
        API.getSavedBooks().then((res) => {
          this.setState({
            savedBooks: res.data
          })
        })
      })
      .catch((e) => console.log(e));
  };

  removeBook = (book) => {
    book.saved = false;
    API.deleteBook(book._id)
      .then(() => {
        API.getSavedBooks().then((res) => {
          this.setState({
            savedBooks: res.data,
          })
        });
      })
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
          <Col size='md-8 sm-10'>
            <h2>Search for a Book</h2>
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
          <Col size='md-8 sm-10'>
            <h3>{this.state.resultsHeading}</h3>
            <ControlledTabs
              searched={this.state.books}
              saved={this.state.savedBooks}
              handleSave={this.saveBook}
              handleDelete={this.removeBook}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
