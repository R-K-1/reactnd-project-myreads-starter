import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'

class BooksApp extends React.Component {
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        showSearchPage: false,
        books: [],
        shelves: {
            currentlyReading:[],
            wantToRead:[], 
            read:[]}
    }
    componentDidMount() {
        BooksAPI.getAll()
        .then((books) => {
            let shelves = {};
            books.forEach(book => {
                if (!(book.shelf in shelves) && (shelves[book.shelf] = []));
                shelves[book.shelf].push(book);
            })
            this.setState({
                books: books,
                shelves: shelves
            });
        })
    }
    render() {
        return (
            <div>
                <BookShelf
                    shelfName='Currently Reading'
                    books={this.state.shelves.currentlyReading}
                />
                <BookShelf
                    shelfName='Want to Read'
                    books={this.state.shelves.wantToRead}
                />
                <BookShelf
                    shelfName='Currently Reading'
                    books={this.state.shelves.read}
                />
            </div>
        )
    }
}

export default BooksApp
