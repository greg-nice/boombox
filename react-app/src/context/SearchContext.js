import { createContext, useState } from 'react';

export const SearchContext = createContext();

export function SearchProvider(props) {
    const [searchOn, setSearchOn] = useState(false);
    const [query, setQuery] = useState("");

    return (
        // <SearchContext.Provider value={{ searchOn, setSearchOn, query, setQuery }}>
        <SearchContext.Provider value={{ searchOn, setSearchOn, query, setQuery }}>
            {props.children}
        </SearchContext.Provider>
    )
}