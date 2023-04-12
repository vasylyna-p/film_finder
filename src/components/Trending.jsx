import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { ContainerContext } from './NavBar';
import { AiFillPlayCircle, AiOutlineClose } from 'react-icons/ai';
import NoImage from './Noimage.png';
import '../styles/videos.css';
import TrailerTrending from '../trailers/TrailerTrending';
import TrendingFilters from './TrendingFilters';
import TrendInfo from './TrendInfo';


const Trending = () => {
    const { toggle } = useContext(ContainerContext);
    const [trendingData, setTrendingData] = useState([]);
    const [trend, setTrend] = useState();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showInfo, setShowInfo] = useState(false);
    const [trailer, setTrailer] = useState(false);
    const [ mediaType, setMediaType ] = useState('all');
    const [ timeWindow, setTimeWindow ] = useState('week');
    const Api = `https://api.themoviedb.org/3/trending/${mediaType}/${timeWindow}`;
    const Image = 'https://image.tmdb.org/t/p/w500/';
    const TrendingCall = async () => {
      const data = await axios.get(Api, {
        params: {
          api_key: '23f9e3fb9e762b7d089103858c41f352',
          page: 1
        }
      })
      const results = data.data.results;
      setTrendingData(results);
      setTotalPages(data.data.total_pages)
    }

    useEffect(() => {
      TrendingCall();
      window.scrollTo(0, 0);
    }, [mediaType, timeWindow]);


    const playTrendTrailer = (trend) => {
      setTrailer(!trailer);
      setTrend(trend);
    }

    const showTrendInfo = (trend) => {
      setShowInfo(!showInfo);
      setTrend(trend);
    }

    const filterResultsByMedia = (media) => {
      setMediaType(media);
    }

    const filterResultsByTime = (time) => {
      setTimeWindow(time);
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
        }
      })
      const results = data.data.results;
      setTrendingData([...trendingData, ...results]);
    }
  }

  return (
    <>
    <div className={toggle ? 'darkModeBgColor' : 'lightModeBgColor'} onClick={() => checkAndHide()}>
      <TrendingFilters filterByMedia={filterResultsByMedia} filterByTime={filterResultsByTime} />
      <div className='movies-container'>
        {trendingData.map((trend) => {
          return (
            <>
              <div id='container' key={trend.id} className={showInfo || trailer ? 'pale-container' : ''} onClick={() => checkAndHide()}>
                <div className="image-container">
                  <AiFillPlayCircle color='white' fontSize={45} id='playIcon' onClick={() => {playTrendTrailer(trend)}} />
                  <img src={trend.poster_path ? `${Image}${trend.poster_path}` : NoImage} alt='' onClick={() => {showTrendInfo(trend)}} />
                </div>
                <h3 onClick={() => {showTrendInfo(trend)}}>{trend.name ? trend.name : trend.title}</h3>
              </div>
            </>
          )
        })}
        {showInfo ? <TrendInfo trend={trend} playTrendTrailer={playTrendTrailer} trailer={trailer} toggle={toggle}/> : console.log}
         {trailer ? <TrailerTrending trend={trend} toggle={toggle}/> : console.log}
      </div>
      <div className='button-container'>
                   {page !== totalPages ? <button className='load-button' onClick={loadMore}>Load more</button> : null}
                </div>
    </div>
  </>
)
}

export default Trending;