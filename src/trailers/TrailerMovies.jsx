import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { AiOutlineClose } from 'react-icons/ai';
import '../styles/trailer.css';
import axios from 'axios';

const TrailerMovies = ({ movie, toggle }) => {
  const [videoURL, setVideoURL] = useState("");

  const fetchVideo = async (movie) => {
    const id = movie.id;
    const Api = `https://api.themoviedb.org/3/movie/${id}/videos`;
    const { data } = await axios.get(Api, {
      params: {
        api_key: '23f9e3fb9e762b7d089103858c41f352',
      }
    })
    const results = data.results;
    const trailer = results.find(result => result.name.includes('Trailer'));
    let result;
    if (trailer) {
      result = trailer.key
    } else if (results) {
      result = results[0].key;
    }

    setVideoURL(`https://www.youtube.com/watch?v=${result}`);
  }
  
  useEffect(() => {
    fetchVideo(movie)
  }, [videoURL]);

  return (
    <>
      <div className='player-container'>
        <AiOutlineClose color={toggle ? 'white' : 'rgb(35, 35, 35)'} cursor={'pointer'} id="close-sign" />
        <ReactPlayer url={videoURL} controls={true} muted={false} width='100%' height='100%' />
      </div>
    </>
  )
}


export default TrailerMovies