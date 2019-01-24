import React from 'react';
import { List, ListItem } from '../List';
import SaveBtn from '../SaveBtn';
import DeleteBtn from '../DeleteBtn';

class BookList extends React.Component {
  render () {
    return (
      <div>
        {this.props.books.length ? (
          <List>
            {this.props.books.map((book) => {
              return (
                <ListItem key={book.isbn10}>
                  <a href={'/books/' + book.isbn10}>
                    <strong>
                      {book.title} by {book.author}
                    </strong>
                  </a>

                  {book.saved ? (
                    <DeleteBtn onClick={() => this.props.handleDelete(book)} />
                  ) : (
                    <SaveBtn onClick={() => this.props.handleSave(book)} />
                  )}
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
