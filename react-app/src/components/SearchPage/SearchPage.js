import React, { useEffect, useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';
import './SearchPage.css';

function SearchPage() {
    const { query } = useContext(SearchContext);

    // useEffect(() => {
    //     (async () => {
    //         await setSearchOn(true);
    //     })();
    // }, [setSearchOn]);

    return (
        <div className="searchpage-top-container">
            <div className="searchpage-content-container">
                {query && <h1>RESULTS</h1>}
                {!query && <h1>Enter search above</h1>}
            </div>
        </div>
    )
}

export default SearchPage;