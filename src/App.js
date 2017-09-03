import React, {Component} from 'react';
import './App.css';

import Shelves from './Shelves';
import SearchBook from './SearchBook';
import sortBy from 'sort-by';
import {Route, Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

/**
 * @description Represents an application
 * @constructor
 */
class App extends Component {
    state = {
        shelves: [
            {
                category: "Currently Reading",
                categoryValue: "currentlyReading",
                sortId: 1,
                books: [
                    
                ]
            },
            {
                category: "Want to Read",
                categoryValue: "wantToRead",
                sortId: 2,
                books: [
                    
                ]
            },
            {
                category: "Read",
                categoryValue: "read",
                sortId: 3,
                books: [
                    
                ]
            }
        ],
        searchResult: []
    };

    constructor(props) {
        super(props);
        this.onMoveBookShelf = this.onMoveBookShelf.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    componentDidMount() {
        const {shelves} = this.state;

        BooksAPI.getAll().then(books=>{
            this.setState({
                shelves : shelves.map(shelf=>{
                    return {
                        category: shelf.category,
                        categoryValue: shelf.categoryValue,
                        sortId: shelf.sortId,
                        books: books.filter(book => book.shelf === shelf.categoryValue).map(book => {

                            return {
                                id: book.id,
                                imageUrl: book.imageLinks.smallThumbnail,
                                title: book.title,
                                authors: book.authors ? book.authors.join(" , ") : book.authors,
                                shelf: book.shelf,
                                rawData: book
                            }
                        })
                    }
                })
            });
        });
    }

    /**
     * @description: Execute when the user click on the menu to move a book to other shelf
     * @param {object} movedBook 
     * @param {string} categoryValue 
     */
    onMoveBookShelf(movedBook, categoryValue) {
        const {shelves} = this.state;
        const bookCategoryValue = movedBook.shelf;
        movedBook.shelf = categoryValue;

        this.setState({
            shelves: shelves
                        .filter(shelf => shelf.categoryValue === bookCategoryValue)
                        .map(shelf => {
                            return {
                                category: shelf.category,
                                categoryValue: shelf.categoryValue,
                                sortId: shelf.sortId,
                                books: shelf.books.filter(book=>book.id !== movedBook.id)
                            };
                        })
                        .concat(
                            shelves
                                .filter(shelf => shelf.categoryValue === categoryValue)
                                .map(shelf => {
                                    return {
                                        category: shelf.category,
                                        categoryValue: shelf.categoryValue,
                                        sortId: shelf.sortId,
                                        books: shelf.books.concat([movedBook])
                                    };
                                })
                        )
                        .concat(
                            shelves.filter(shelf => shelf.categoryValue !== bookCategoryValue && shelf.categoryValue !== categoryValue)
                        )
                        .sort(sortBy("sortId"))
        });
    }

    /**
     * @description: Execute when the user typing on Search box
     * @param {object} event 
     */
    onSearch(event){
        const query = event.target.value;

        BooksAPI.search(query, 10).then(result => {
            this.setState({
                searchResult : result.map(book => {
                    return {
                        id: book.id,
                        imageUrl: book.imageLinks ? book.imageLinks.smallThumbnail : book.imageLinks,
                        title: book.title,
                        authors: book.authors ? book.authors.join(" , ") : book.authors,
                        shelf: book.shelf || "none",
                        rawData: book
                    };
                })
            })
        })
    }

    render() {
        const {shelves, searchResult} = this.state;
        return (
            <div className="app">
                <Route exact path="/" render={()=>
                    <div className="list-books">
                        <div className="list-books-title">
                        <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <Shelves 
                                data={shelves} 
                                onMoveBookShelf={this.onMoveBookShelf}
                            />
                        </div>
                        <div className="open-search">
                            <Link to="/search">Add a book</Link>
                        </div>
                    </div>
                }/>
                <Route path="/search" render={()=>
                    <SearchBook 
                        searchResult={searchResult} 
                        onSearch={this.onSearch}
                        onMoveBookShelf={this.onMoveBookShelf}
                    />
                } />
            </div>
        );
    }
}


export default App;