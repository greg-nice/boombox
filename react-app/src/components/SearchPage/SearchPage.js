import React, { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../../context/SearchContext';
import './SearchPage.css';

function SearchPage() {
    const { query } = useContext(SearchContext);
    const [results, setResults] = useState("");

    useEffect(() => {
        if (query) {
            (async () => {
                const response = await fetch('/api/search/', {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({"query": query})
                })

                if (response.ok) {
                    const searchResults = await response.json();
                    console.log(searchResults);
                    setResults(searchResults);
                }
            })();
        } else {
            return;
        }
    }, [query])

    return (
        <div className="searchpage-top-container">
            <div className="searchpage-content-container">
                {!query && <h1>Enter search above</h1>}
                {query && (
                <div>
                    <h1>RESULTS</h1>
                    {results && (
                        <div>
                            There are results!
                        </div>
                    )}
                </div>
                )}
            </div>
        </div>
    )
}

export default SearchPage;