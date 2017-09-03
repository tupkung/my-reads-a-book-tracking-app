import React, {Component} from 'react';
import './Shelves.css';
import BookGrids from './components/BookGrids'

/**
 * @description: Represents all book shelves
 * @constructor
 */
class Shelves extends Component {
    render() {
        const {data} = this.props;

        return (
            <div>
                {
                    data.map(shelf=>
                        <div className="bookshelf" key={shelf.sorId}>
                            <h2 className="bookshelf-title">shelf.category</h2>
                            <div className="bookshelf-books">
                                <BookGrids books={shelf.books}/>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default Shelves;