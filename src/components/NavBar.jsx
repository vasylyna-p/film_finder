import React, { useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import '../styles/navbar.css';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import Movies from './Movies';
import TvShows from './TvShows';
import Trending from './Trending';

export const ContainerContext = React.createContext();

const NavBar = () => {
  const [toggle, setToggle] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const location = useLocation();
  const isTrendingPage = location.pathname === '/Trending';

  return (
      <ContainerContext.Provider value={{toggle, inputValue}}>
      <div>
      <nav className='navbar'>
        <h1 className='logo' id={toggle ? '' : 'logo-color'}>FilmFinder</h1>
        <ul className='navbar-nav'>
          <NavLink to="" style={({isActive}) => {return {color: isActive ? "coral" : "white"}}}>
            <li className='nav-item'>Movies</li>
          </NavLink>
          <NavLink to="/TvShows" style={({isActive}) => {return {color: isActive ? "coral" : "white"}}}>
            <li className='nav-item'>Tv Shows</li>
          </NavLink>
          <NavLink to="/Trending" style={({isActive}) => {return {color: isActive ? "coral" : "white"}}}>
            <li className='nav-item'>Trending</li>
          </NavLink>
        </ul>
        
        <div className = {isTrendingPage ? 'search-container hide-search' : 'search-container'}>
          <input type='text' placeholder='Search' onChange={(e) => setInputValue(e.target.value)} />
          <HiSearch size={20} />
        </div>
        <div id="color-switcher" onClick={() => setToggle(!toggle)}>
          <div id={toggle ? "color-switcher-unmoved" : "color-switcher-moved"}></div>
        </div>
      </nav>
      <Routes>
        <Route path="" element={<Movies />} />
        <Route path="TvShows" element={<TvShows />} />
        <Route path="Trending" element={<Trending />} />
      </Routes>
      </div>
     </ContainerContext.Provider>
  )
}

export default NavBar;