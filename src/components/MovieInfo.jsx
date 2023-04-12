import React from 'react';
import { AiFillPlayCircle, AiOutlineClose } from 'react-icons/ai';
import '../styles/movie-info.css';
import NoImage from './Noimage.png';
import TrailerMovies from '../trailers/TrailerMovies';

const MovieInfo = ({movie, trailer, playMovieTrailer, toggle}) => {
    const Image = 'https://image.tmdb.org/t/p/w500/';
    const moviePoster = `${Image}${movie.poster_path}`;
    let overview = movie.overview;
    if (overview.length > 450) {
      overview = overview.substring(0, 450) + ' ...';
    }
  return (
    <>
    <div className="info-container">
    <AiOutlineClose color={toggle ? 'white' : 'rgb(35, 35, 35)'} cursor={'pointer'} fontSize={55} id="close-sign" />
        <div className="info-image-container">
            <img src={movie.poster_path ? moviePoster : NoImage} alt="movie poster"/>
        </div>
        <div className="description-container">
            <h1>{movie.title}</h1>
            <p id='release-date'>{movie.release_date}</p>
            <p id='overview'>{overview}</p>
            <p>Rating: {movie.vote_average.toFixed(1)}<span id='star'>★</span><span id='vote-count'> ({movie.vote_count})</span></p>
            <div className='watch-trailer-container'>
            <p id='trailer-button' onClick={() => playMovieTrailer(movie)}>Watch trailer</p>
            <AiFillPlayCircle  onClick={() => playMovieTrailer(movie)} color='white' fontSize={45} id='watch-trailer-icon'/>
            </div>
        </div>
    </div>
    {trailer ? <TrailerMovies  movie={movie} /> : console.log}
    </>
  )
}

export default MovieInfo;
