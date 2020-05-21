import React from 'react';
import BookCard from './BookCard';

/*
Since this component just needs to render some data and does not need to keep
track of the component's internal state, we can make it a Stateless Functional
Component.
*/


const BookShelf = props => {
    /*
    Destructuring via ES6. We're getting the books properties
    off of the pros passed into this presentational component.
    */

    const { shelfName, books, handleShelfChange } = props;

    const bookCards = ( typeof books != 'undefined' && books instanceof Array)? books.map(book => (
                                                <BookCard
                                                    key={book.id}
                                                    bookInfo={book}
                                                    handleShelfChange={handleShelfChange}
                                                />
                                            )) 
                                            : null;

    /*
    Return JSX
    */
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelfName}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {bookCards}
                </ol>
            </div>
        </div>
    )
        
};

export default BookShelf;
