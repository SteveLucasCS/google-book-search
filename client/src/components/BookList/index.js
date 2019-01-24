import React from 'react';
import { List, ListItem } from '../List';
import SaveBtn from '../SaveBtn';
import DeleteBtn from '../DeleteBtn';
import { Row, Col } from '../Grid';

class BookList extends React.Component {
  render () {
    return (
      <div>
        {this.props.books.length ? (
          <List>
            {this.props.books.map((book) => {
              return (
                <ListItem key={book.isbn10}>
                  <Row>
                    <Col size='sm-5 md-3'>
                      <img className="bookImage" src={book.image} alt='No Cover Available' />
                      {book.saved ? (
                        <DeleteBtn
                          onClick={() => this.props.handleDelete(book)}
                        />
                      ) : (
                        <SaveBtn onClick={() => this.props.handleSave(book)} />
                      )}
                    </Col>
                    <Col size='sm-7 md-9'>
                      <h3>
                        {book.title} - By {book.author}
                      </h3>
                      <h4>{book.description}</h4>
                    </Col>
                  </Row>
                </ListItem>
              );
            })}
          </List>
        ) : (
          <h3>No Results</h3>
        )}
      </div>
    );
  }
}
export default BookList;
