import React from 'react';
import '../styles/movie-info.css';
import NoImage from './Noimage.png';
import { AiFillPlayCircle, AiOutlineClose } from 'react-icons/ai';
import TrailerTrending from '../trailers/TrailerTrending';

const TrendInfo = ({trend, trailer, playTrendTrailer, toggle}) => {
    const Image = 'https://image.tmdb.org/t/p/w500/';
    const trendPoster = `${Image}${trend.poster_path}`;
    let overview = trend.overview;
    if (overview.length > 450) {
      overview = overview.substring(0, 450) + ' ...';
    }
  return (
    <>
      <div className="info-container">
      <AiOutlineClose color={toggle ? 'white' : 'rgb(35, 35, 35)'} cursor={'pointer'} fontSize={55} id="close-sign" />
        <div className="info-image-container">
            <img src={trend.poster_path ? trendPoster : NoImage} alt="trend poster"/>
        </div>
        <div className="description-container">
            <h1>{trend.title ? trend.title : trend.name}</h1>
            <p>{trend.release_date ? trend.release_date : trend.first_air_date}</p>
            <p id='overview'>{overview}</p>
            <p>Rating: {trend.vote_average.toFixed(1)}<span id='star'>★</span><span id='vote-count'> ({trend.vote_count})</span></p>
            <div className='watch-trailer-container'>
            <p id='trailer-button' onClick={() => playTrendTrailer(trend)}>Watch trailer</p>
            <AiFillPlayCircle color='white' fontSize={45} id='watch-trailer-icon' onClick={() => playTrendTrailer(trend)}/>
            </div>
        </div>
    </div>
    {trailer ? <TrailerTrending  trend={trend} /> : console.log}
    </>
  )
}

export default TrendInfo
