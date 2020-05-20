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
        books: []
    }
    componentDidMount() {
        BooksAPI.getAll()
        .then((books) => {
           this.setState({
                books: books
            });
        })
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
                />
                <BookShelf
                    shelfName='Want to Read'
                    books={shelves.wantToRead}
                />
                <BookShelf
                    shelfName='Currently Reading'
                    books={shelves.read}
                />
            </div>
        )
    }
}

export default BooksApp
