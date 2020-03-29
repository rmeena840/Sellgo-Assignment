import React, { Component, useState } from 'react';
import {
    Container,
    Button,
    Table,
    Row,
    Input,
    Col,
    Form
} from 'reactstrap';
const axios = require('axios').default;

const searchBarTextStyle = {
  borderBottomLeftRadius: "10px",
  borderTopLeftRadius: "10px",
  borderTopRightRadius: "0px",
  borderBottomRightRadius: "0px",
};

const searchButtonStyle = {
  borderBottomLeftRadius: "0px",
  borderTopLeftRadius: "0px",
  borderTopRightRadius: "10px",
  borderBottomRightRadius: "10px"
};

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        value: '',
        items:[ ]
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      var url = 'https://jsonmock.hackerrank.com/api/movies/search?Title='+ this.state.value;
      var self = this;
      axios.get(url)
        .then(function (response) {
          self.setState({items:  response.data.data});
        });
      event.preventDefault();
    }
  
  render() {
    const { items } = this.state;
    return (
      <Container>
        <br />
        <Form onSubmit={this.handleSubmit} inline>
          <Input style={searchBarTextStyle} type="text" value={this.state.value} onChange={this.handleChange} placeholder="Search movies title"/>
          <Button type="submit" color="primary" style={searchButtonStyle}>&#128269;</Button>
      </Form>
      <br />
      <Table bordered>
      <thead>
        <tr>
          <th bordered>Title</th>
          <th>Year</th>
          <th>imdbID</th>
          <th></th>
        </tr>
      </thead>
      {/* <br /> */}
      <tbody>
        {items.map(({  Title, Year, imdbID}) => (
          <tr>
            <td>{Title}</td>
            <td>{Year}</td>
            <td>{imdbID}</td>
            <td>
            <Button
            size="md"
            outline
            color="primary"
            onClick={() => {
              this.setState( state => ({
                  items: state.items.filter(item => item.imdbID !== imdbID)
              }));
            }}
          >
            <svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"/>
              <path fill-rule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clip-rule="evenodd"/>
            </svg>
          </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    </Container>
    );
  }
}

export default SearchBar;