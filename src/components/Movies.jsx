import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { ContainerContext } from './NavBar';
import { AiFillPlayCircle } from 'react-icons/ai';
import NoImage from './Noimage.png';
import '../styles/videos.css';
import TrailerMovies from '../trailers/TrailerMovies';
import MovieInfo from './MovieInfo';

const Movies = () => {
    const { toggle, inputValue } = useContext(ContainerContext);
    const input = inputValue;
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [moviesData, setMoviesData] = useState([]);
    const [showInfo, setShowInfo] = useState(false);
    const [movie, setMovie] = useState();
    const [trailer, setTrailer] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const Shown = input ? 'search' : 'discover';
    const Api = `https://api.themoviedb.org/3/${Shown}/movie`;
    const Image = 'https://image.tmdb.org/t/p/w500/';


    const MovieCall = async () => {
        const data = await axios.get(Api, {
            params: {
                api_key: '23f9e3fb9e762b7d089103858c41f352',
                page: 1,
                query: input
            }
        })
        const results = data.data.results;
        setMoviesData(results);
        setTotalPages(data.data.total_pages);
    }

    useEffect(() => {
        setPage(1);
        MovieCall();
        window.scrollTo(0, 0);
    }, [input])
 
    useEffect(() => {
        const showNoResults = setTimeout(() =>{
            setShowMessage(true);
        }, 3000);
        return () => clearTimeout(showNoResults)
    }, [input]);

    const playMovieTrailer = (movie) => {
        setTrailer(!trailer);
        setMovie(movie);
    }

    const showMovieInfo = (movie) => {
        setShowInfo(!showInfo);
        setMovie(movie);
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
          setMoviesData([...moviesData, ...results]);
        }
      }


    return (
        <>
            <div className={toggle ? 'darkModeBgColor' : 'lightModeBgColor'} onClick={() => checkAndHide()}>
                <div className='movies-container'>
                    {moviesData.map((movie) => {
                        return (
                            <>
                                <div id='container' key={movie.id} className={showInfo || trailer ? 'pale-container' : ''} onClick={() => checkAndHide()}>
                                    <div className="image-container">
                                        <AiFillPlayCircle color='white' fontSize={45} id='playIcon' onClick={() => playMovieTrailer(movie)} />
                                        <img src={movie.poster_path ? `${Image}${movie.poster_path}` : NoImage} alt='' onClick={() => showMovieInfo(movie)} />
                                    </div>
                                    <h3 onClick={() => showMovieInfo(movie)}>{movie.title}</h3>
                                </div>
                            </>
                        )
                    })}
                    {showInfo ? <MovieInfo movie={movie} trailer={trailer} toggle={toggle} playMovieTrailer={playMovieTrailer} /> : console.log}
                    {trailer ? <TrailerMovies movie={movie} toggle={toggle} /> : console.log}
                </div>
                <div className='button-container'>
                   {page !== totalPages ? <button className='load-button' onClick={loadMore}>Load more</button> : null}
                   { moviesData.length === 0 && showMessage ? <p className='no-results'>No Results Found</p> : null}
                </div>
              
            </div>
        </>
    )
}

export default Movies;
