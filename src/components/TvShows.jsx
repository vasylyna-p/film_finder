import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { ContainerContext } from './NavBar';
import { AiFillPlayCircle, AiOutlineClose } from 'react-icons/ai';
import NoImage from './Noimage.png';
import '../styles/videos.css';
import TrailerTvShows from '../trailers/TrailerTvShows';
import TvShowInfo from './TvShowInfo';


const TvShows = () => {
  const [tvShowsData, setTvShowsData] = useState([]);
  const [tvShow, setTvShow] = useState();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showInfo, setShowInfo] = useState(false);
  const [trailer, setTrailer] = useState(false);
  const { toggle, inputValue } = useContext(ContainerContext);
  const [showMessage, setShowMessage] = useState(false);
  const input = inputValue;
  const Shown = input ? 'search' : 'discover';
  const Api = `https://api.themoviedb.org/3/${Shown}/tv`;
  const Image = 'https://image.tmdb.org/t/p/w500';

  const TvShowsCall = async () => {
    const data = await axios.get(Api, {
      params: {
        api_key: '23f9e3fb9e762b7d089103858c41f352',
        page: 1,
        query: input
      }
    })
    const results = data.data.results;
    setTvShowsData(results);
    setTotalPages(data.data.total_pages);
  }

  useEffect(() => {
    setPage(1);
    TvShowsCall();
    window.scrollTo(0, 0);
  }, [input]);

  useEffect(() => {
    const showNoResults = setTimeout(() =>{
        setShowMessage(true);
    }, 3000);
    return () => clearTimeout(showNoResults)
}, [input]);

  const playTvShowTrailer = (tvShow) => {
    setTvShow(tvShow);
    setTrailer(!trailer);
  }

  const showTvShowInfo = (tvShow) => {
    setShowInfo(!showInfo);
    setTvShow(tvShow);
  }

  const checkAndHide = () => {
    if (showInfo) {
        setShowInfo(false);
    } else if (trailer) {
        setTrailer(false);
        setShowInfo(false);
    }
}

const loadMore = async () => {
  if (page < totalPages) {
    setPage(page + 1);
    const data = await axios.get(Api, {
      params: {
        api_key: '23f9e3fb9e762b7d089103858c41f352',
        page: page + 1,
        query: input
      }
    })
    const results = data.data.results;
    setTvShowsData([...tvShowsData, ...results]);
  }
}

  return (
    <>
      <div className={toggle ? 'darkModeBgColor' : 'lightModeBgColor'} onClick={() => checkAndHide()}>
        <div className='movies-container'>
          {tvShowsData.map((tvShow) => {
            return (
              <>
                <div id='container' key={tvShow.id} className={showInfo || trailer ? 'pale-container' : ''} onClick={() => checkAndHide()}>
                  <div className="image-container">
                    <AiFillPlayCircle color='white' fontSize={45} id='playIcon' onClick={() => playTvShowTrailer(tvShow)} />
                    <img src={tvShow.poster_path ? `${Image}${tvShow.poster_path}` : NoImage} alt='' onClick={() => showTvShowInfo(tvShow)} />
                  </div>
                  <h3 className={toggle ? 'darkModeTitle' : 'lightModeTitle'} onClick={() => showTvShowInfo(tvShow)}>{tvShow.name}</h3>
                </div>
              </>
            )
          })}
          {showInfo ? <TvShowInfo tvShow={tvShow} playTvShowTrailer={playTvShowTrailer} trailer={trailer} toggle={toggle} /> : console.log}
          {trailer ? <TrailerTvShows tvShow={tvShow} toggle={toggle}/> : console.log}
        </div>
        <div className='button-container'>
                   {page !== totalPages ? <button className='load-button' onClick={loadMore}>Load more</button> : null}
                   {tvShowsData.length === 0 && showMessage ? <p className='no-results'>No Results Found</p> : null}
                </div>
      </div>
    </>
  )
}

export default TvShows;