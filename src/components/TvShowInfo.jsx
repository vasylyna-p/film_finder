import React from 'react';
import { AiFillPlayCircle, AiOutlineClose } from 'react-icons/ai';
import TrailerTvShows from '../trailers/TrailerTvShows';
import '../styles/movie-info.css';
import NoImage from './Noimage.png';

const TvShowInfo = ({tvShow, trailer, playTvShowTrailer, toggle}) => {
    const Image = 'https://image.tmdb.org/t/p/w500/';
    const tvShowPoster = `${Image}${tvShow.poster_path}`;
    let overview = tvShow.overview;
    if (overview.length > 450) {
      overview = overview.substring(0, 450) + ' ...';
    }
  return (
      <>
    <div className="info-container">
    <AiOutlineClose color={toggle ? 'white' : 'rgb(35, 35, 35)'} cursor={'pointer'} fontSize={55} id="close-sign" />
        <div className="info-image-container">
            <img src={tvShow.poster_path ? tvShowPoster : NoImage} alt="tv show poster"/>
        </div>
        <div className="description-container">
            <h1>{tvShow.name}</h1>
            <p>{tvShow.first_air_date}</p>
            <p id='overview'>{overview}</p>
            <p>Rating: {tvShow.vote_average.toFixed(1)}<span id='star'>★</span><span id='vote-count'> ({tvShow.vote_count})</span></p>
            <div className='watch-trailer-container'>
            <p id='trailer-button' onClick={() => playTvShowTrailer(tvShow)}>Watch trailer</p>
            <AiFillPlayCircle color='white' fontSize={45} id='watch-trailer-icon' onClick={() => playTvShowTrailer(tvShow)}/>
            </div>
        </div>
    </div>
    {trailer ? <TrailerTvShows  tvShow={tvShow} /> : console.log}
    </>
  )
}

export default TvShowInfo
