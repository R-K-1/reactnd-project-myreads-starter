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
        bookUpdated: false,
    }
    componentDidMount() {
        BooksAPI.getAll()
        .then((books) => {
           this.setState({
                books: books
            });
        })
    }
    handleShelfChange = (bookUpdateInfo) => {
        const info = bookUpdateInfo.split("|");
        let book = [];
        if ((info.length === 3) && (book = this.state.books.filter(book => book.id === info[0]))) {
            if (book.length === 1) {
                BooksAPI.update(book[0], info[2])
                .then(BooksAPI.getAll()
                        .then((books) => {
                        this.setState({
                                books: books
                            });
                        }))
            }
        }
    }

    render() {
        const shelves = {
            currentlyReading:[],
            wantToRead:[], 
            read:[]};
        
        if ((this.state.books.length > 0) && 
            (this.state.books.forEach(book => 
                {if ((book.shelf in shelves) && (shelves[book.shelf].push(book)));})));

        return (
            <div>
                <BookShelf
                    shelfName='Currently Reading'
                    books={shelves.currentlyReading}
                    handleShelfChange={this.handleShelfChange}
                />
                <BookShelf
                    shelfName='Want to Read'
                    books={shelves.wantToRead}
                    handleShelfChange={this.handleShelfChange}
                />
                <BookShelf
                    shelfName='Read'
                    books={shelves.read}
                    handleShelfChange={this.handleShelfChange}
                />
            </div>
        )
    }
}

export default BooksApp
