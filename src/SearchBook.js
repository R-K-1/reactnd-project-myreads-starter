import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

class SearchBook extends Component {
    state = {
        query: '',
        books: []
    }
    updateQuery = (query) => {
        BooksAPI.search(query.trim())
        .then((books) => {
            this.setState({
                books: books
            });
        })
    }
    clearQuery = () => {
        this.updateQuery('')
    }
    render() {
        const { bookShelfMap, handleShelfChange } = this.props;
        const { query } = this.state.query
        
        if (this.state.books !== undefined && this.state.books instanceof Array && this.state.books.length > 0 ) {
            this.state.books.map( book => {
                if (book.id in bookShelfMap) {
                    book['shelf'] = bookShelfMap[book.id];
                } else { 
                    book['shelf'] = 'none';
                }
            })
        }

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <div className="search-books-input-wrapper">
                        <Link className='close-search' to='/'>
                                Close search
                        </Link>
                        {/*
                            NOTES: The search from BooksAPI is limited to a particular set of search terms.
                            You can find these search terms here:
                            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                            you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input 
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <BookShelf
                        shelfName='Search Results'
                        books={this.state.books}
                        handleShelfChange={handleShelfChange}
                    />
                </div>
            </div>
        )
    }
}

export default SearchBook