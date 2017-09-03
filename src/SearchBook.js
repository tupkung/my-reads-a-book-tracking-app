import React, {Component} from 'react';

import './SearchBook.css';

import BookGrids from './components/BookGrids'

/**
 * @description: Represents Search book page
 * @constructor
 */
class SearchBook extends Component {

    render(){
        const {onSearch, searchResult, onMoveBookShelf, onCloseSearch} = this.props;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                <a className="close-search" onClick={onCloseSearch}>Close</a>
                <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author" onKeyUp={onSearch}/>
                </div>
                </div>
                <div className="search-books-results">
                    <BookGrids 
                        books={searchResult} 
                        onMoveBookShelf={onMoveBookShelf}
                    />
                </div>
            </div>
        );
    }
}

export default SearchBook;