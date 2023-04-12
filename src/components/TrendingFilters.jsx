import React, { useState, useContext } from 'react';
import '../styles/filters.css';
import { ContainerContext } from './NavBar';

const TrendingFilters = ({filterByMedia, filterByTime}) => {
  const { toggle } = useContext(ContainerContext);
  return (
    <>
      <div className={toggle ? 'filters darkModeFilters' : 'filters lightModeFilters'}>
      <form>
        <div className='filters-container'>
        <p>Filter by media type</p>
        <div className="media-container">
          <input type='radio' id='all' name='media' value='all' defaultChecked onClick={() => filterByMedia('all')}/>
          <label htmlFor='all'>All</label>
          <input type='radio' id='movie' name='media' value='movie' onClick={() => filterByMedia('movie')} />
          <label htmlFor='movie'>Movies</label>
          <input type='radio' id='tv' name='media' value='tv' onClick={() => filterByMedia('tv')} />
          <label htmlFor='tv'>Tv Shows</label>
          </div>
          <p> Choose time window</p>
          <div className="time-container">
          <input type='radio' id='week' name='time' value='week' defaultChecked onClick={() => filterByTime('week')}/>
          <label htmlFor='week'>Week</label>
          <input type='radio' id='day' name='time' value='day' onClick={() => filterByTime('day')} />
          <label htmlFor='day'>Day</label>
          </div>
          </div>
      </form>
      </div>
    </>
  )
}

export default TrendingFilters;
