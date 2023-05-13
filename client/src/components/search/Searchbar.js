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
            <input type="text" className="form-control rounded" placeholder ="Enter City or Zipcode" value={location} onChange={(event) => setLocation(event.target.value)} />
            </label>
            <button type="submit" className="btn" style={{marginLeft:'10px', backgroundColor: '#ffffff', color: '#000000'}}>Search</button>

        </form>
        </>
    )
}


export default Searchbar;