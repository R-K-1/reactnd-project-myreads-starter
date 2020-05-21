import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import SearchBook from './SearchBook'
import { Link, Route } from 'react-router-dom'

class BooksApp extends React.Component {
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        books: []
    }
    componentDidMount() {
        this.getAllMyBooks();
    }
    getAllMyBooks() {
        BooksAPI.getAll()
        .then((books) => {
           this.setState({
                books: books
            });
        })
    }
    handleShelfChange = (bookUpdateInfo) => {
        const info = bookUpdateInfo.split("|");
        console.log(bookUpdateInfo);
        if ((info.length === 2)) {
            BooksAPI.update(info[0], info[1])
            .then(this.getAllMyBooks())
        }
    }
    render() {
        const shelves = {
            currentlyReading:[],
            wantToRead:[], 
            read:[]};

        const bookShelfMap = {}
        
        if ((this.state.books.length > 0) && 
            (this.state.books.forEach(book => 
                {if ((book.shelf in shelves) 
                    && (shelves[book.shelf].push(book))
                    && (bookShelfMap[book.id] = book.shelf));})));

        return (
            <div>
                <Route exact path='/'>
                    <div class-name='open-search'>
                        <button>
                            <Link to='/search'>
                                Add a book
                            </Link>
                        </button>
                    </div>
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
                </Route>
                <Route path='/search'>
                    <SearchBook
                        bookShelfMap={bookShelfMap}
                        handleShelfChange={this.handleShelfChange}
                    />

                </Route>
            </div>
        )
    }
}

export default BooksApp
