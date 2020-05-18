import React from 'react';

/*
Since this component doesn't need to hold state, we can make it a Stateless
Functional Component.
*/
const BookCard = props => {
    /*
    Destructuring via ES6. We're getting the book properties
    off of the pros passed into this presentational component. 
    */
    const { bookInfo } = props;
    return (

        <li key={bookInfo.id}>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${bookInfo.imageLinks.smallThumbnail})` }}></div>
                    <div className="book-shelf-changer">
                        <select>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{bookInfo.title}</div>
                <div className="book-authors">{bookInfo.authors.map(author => {return `${author} ;`})}</div>
            </div>
        </li>

    );
};

export default BookCard;
