import React, { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';
import './SearchPage.css';

function SearchPage() {
    const { query } = useContext(SearchContext);

    return (
        <div className="searchpage-top-container">
            <div className="searchpage-content-container">
                {!query && <h1>Enter search above</h1>}
                {query && <h1>RESULTS</h1>}
            </div>
        </div>
    )
}

export default SearchPage;