import React, {Component} from 'react';
import './BookGrids.css'

/**
 * @description: Represents Books on the shelf
 * @constructor
 */
class BookGrids extends Component {
    render() {
        const {books} = this.props;
        
        return (
            <ol className="books-grid">
                {
                    books.map(book => 
                        <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                <div className="book-cover" style={{width: 128, height: 193, backgroundImage: `url("${book.imageUrl}")`}}></div>
                                <div className="book-shelf-changer">
                                    <select defaultValue={book.shelf}>
                                        <option value="none" disabled>Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
                                    </select>
                                </div>
                            </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors}</div>
                        </li>
                    )
                }
            </ol>
        );
    }
}

export default BookGrids;