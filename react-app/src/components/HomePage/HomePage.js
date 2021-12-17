import React, { useEffect } from 'react';

const HomePage = ({loaded}) => {

    useEffect(() => {
        (async () => {
            await dispatch(getPlaylist(1));
        })();
    }, [dispatch]);

    return (
        <h1>Hello from HomePage</h1>
    )
}

export default HomePage;