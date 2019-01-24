import React from 'react';
import BookList from '../BookList';
import {Tabs, Tab } from 'react-bootstrap';

class ControlledTabs extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      key: 1
    };
  }

  handleSelect(key) {
    this.setState({ key });
  }

  render () {
    return (
      <Tabs
        activeKey={this.state.key}
        onSelect={this.handleSelect}
        id='controlled-tab-example'
        animation={false}>
        <Tab eventKey={1} title='Search Results'>
          <BookList
            books={this.props.searched}
            handleSave={this.props.handleSave}
            handleDelete={this.props.handleDelete}
          />
        </Tab>
        <Tab eventKey={2} title='Your Saved Books'>
          <BookList
            books={this.props.saved}
            handleSave={this.props.handleSave}
            handleDelete={this.props.handleDelete}
          />
        </Tab>
      </Tabs>
    );
  }
}

export default ControlledTabs;