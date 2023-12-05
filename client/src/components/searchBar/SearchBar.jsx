import React, { useState } from 'react';
import { getNamePokemon } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import style from './searchBar.module.css'


export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  // Guarda en mi estado local la info del input
  function handleInputChange(event) {
    event.preventDefault();
    setName(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(getNamePokemon(name));
    setName('');
  }

  return (
    <div>
      <div className={style.searchInput}>
        <input
          type="text"
          placeholder="Search Pokemon"
          value={name}
          onChange={(e) => handleInputChange(e)}
        />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Search
      </button>
      </div>
    </div>
  );
}
