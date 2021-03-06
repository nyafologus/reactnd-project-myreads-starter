import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from "react-router-dom"
import MainPage from './MainPage.js'
import SearchPage from './SearchPage.js'


class BooksApp extends Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  moveShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf
      const movedBooks = this.state.books.filter(b => b.id !== book.id)
      movedBooks.push(book)
      this.setState({books: movedBooks})
    })
  }

  render() {
    return (
      <div className="app">

        <Route exact path="/"
          render={() => (
            <MainPage
              books = {this.state.books}
              moveShelf = {this.moveShelf}
            />
          )}
        />

        <Route path = "/search" 
          render={() => (
            <SearchPage
              books = {this.state.books}
              moveShelf = {this.moveShelf}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp