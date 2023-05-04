import React, { useState } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar';
import SearchResults from './SearchResults';

const Search = ({ onSearch }) => {
  

  return (
    <div>
      <Searchbar onSearch = {onSearch} />
      <SearchResults businesses = {''}/>

    </div>
  );
};

export default Search;
