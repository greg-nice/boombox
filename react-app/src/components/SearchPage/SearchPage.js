import React, { useEffect, useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';
import './SearchPage.css';

function SearchPage() {
    const { searchOn, setSearchOn } = useContext(SearchContext);

    useEffect(() => {
        (async () => {
            await setSearchOn(true);
        })();
    }, [setSearchOn]);

    return (
        <div className="searchpage-top-container">
            <div className="searchpage-content-container">
                <h1>Hello!</h1>
                {searchOn && <div>Search is ON!</div>}
            </div>
        </div>
    )
}

export default SearchPage;