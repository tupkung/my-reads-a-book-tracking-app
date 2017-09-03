import React, {Component} from 'react';
import './App.css';

import Shelves from './Shelves';

class App extends Component {
    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <Shelves />
                </div>
            </div>
        );
    }
}


export default App;