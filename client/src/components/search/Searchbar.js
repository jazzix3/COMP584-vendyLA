import React, { useState } from 'react'

const Searchbar = ({ onSearch }) => {

    const [location, setLocation] = useState('');
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        onSearch(location);
    };


    return (
        <>
        <form onSubmit={handleSubmit}>
            <label>
            <input type="text" placeholder ="Enter City" value={location} onChange={(event) => setLocation(event.target.value)} />
            </label>
        <button type="submit">Search</button>
        </form>
        </>
    )
}


export default Searchbar;