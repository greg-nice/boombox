import { createContext, useState } from 'react';

export const SearchContext = createContext();

export function SearchProvider(props) {
    const [searchOn, setSearchOn] = useState(false);

    return (
        <SearchContext.Provider value={{ searchOn, setSearchOn }}>
            {props.children}
        </SearchContext.Provider>
    )
}