import {useState, useEffect } from 'react'
import MovieDataService from "../services/movies"
import MovieCard from './movie-card'


import { FaSearch, FaCaretRight, FaCaretLeft } from 'react-icons/fa'
import styles from './movie-list.module.scss'


function MoviesList (props) {

    const [movies, setMovies] = useState([])
    const [searchTitle, setSearchTitle] = useState("")
    const [searchRating, setSearchRating] = useState("")
    const [ratings, setRatings] = useState(["All Ratings"])
    const [currentPage, setCurrentPage] = useState(0)
    const [totalResults, setTotalResults] = useState(0)
    const [currentSearchMode, setCurrentSearchMode] = useState("")

    useEffect(() =>{
        retrieveMovies()
        retrieveRatings()
    },[])

    useEffect(() =>{
        retrieveNextPage()
    },[currentPage])

    const retrieveNextPage = () => {
        if(currentSearchMode === "findByTitle")
            findByTitle()
        else if(currentSearchMode === "findByRating")
            findByRating()
        else
            retrieveMovies()
    }

    const retrieveMovies = (reset = false) => {
        if (reset) { setCurrentPage(0) }
        setCurrentSearchMode("")
        MovieDataService.getAll(currentPage) 
        .then(response =>{
            setMovies(response.data.movies)
            setCurrentPage(response.data.page)
            setTotalResults(response.data.total_results)
        })
        .catch( e => {
            console.log(e)
        })
    }

    const retrieveRatings = () =>{
        MovieDataService.getRatings()
        .then(response =>{
            console.log(response.data)
            setRatings(["All Ratings"].concat(response.data))
        })
        .catch( e =>{
            console.log(e)
        })
    }

    const onChangeSearchTitle = (event) => {
        const searchTitle = event.target.value
        setSearchTitle(searchTitle)
    }
    const onChangeSearchRating = (event) => {
        const searchRating = event.target.value
        setSearchRating(searchRating)
    }

    const find =(query, by) =>{
        MovieDataService.find(query,by,currentPage)
        .then(response =>{
            setMovies(response.data.movies)
            console.log(response.data.total_results)
            setTotalResults(response.data.total_results)
        })
        .catch(e =>{
            console.log(e)
        })
    }
    
    const findByTitle = (event, reset = false) => {
        if (reset) { setCurrentPage(0) }
        setCurrentSearchMode("findByTitle")
        if (event) {event.preventDefault()}
        if (searchTitle === "") {
            retrieveMovies()
        } else {
            find(searchTitle, "title")
        }
    }
    const findByRating = (event, reset = false) => {
        if (reset) { setCurrentPage(0) }
        setCurrentSearchMode("findByRating")
        if (event) {event.preventDefault()}
        if(searchRating === "All Ratings"){
            retrieveMovies()
        }
        else{
            find(searchRating, "rated")
        }
    }

    return (
        <>
            <div className={styles.searchBar}>
                <form>
                    <input type="text" placeholder='Search by title' value={searchTitle} onChange={onChangeSearchTitle}/>
                    <button onClick={(e) => findByTitle(e, true)}><FaSearch /></button>
                </form>
                <form>
                    <select onChange={onChangeSearchRating}>
                        {ratings.map(rating =>{
                            return <option key={rating} value={rating}>{rating}</option>
                        })}
                    </select>
                    <button onClick={(e) => findByRating(e, true)}><FaSearch /></button>
                </form>
            </div>
            <div className={styles.movieList}>
                {movies.length != 0 ? movies.map((movie) =>{
                    return (
                        <MovieCard 
                            key={movie._id}
                            imageSrc={movie.poster}
                            title={movie.title}
                            plot={movie.plot}
                            rating={movie.rated}
                            score={movie.imdb.rating}
                            date={movie.released}
                            link={`/movies/${movie._id}`}
                        />
                    )
                }) : 'No films available at the moment...'}
            </div>
            { totalResults > 20 &&
                <div className={styles.pagination}>
                    {(currentPage + 1) != 1 &&
                        <FaCaretLeft onClick={() => {setCurrentPage(currentPage - 1); window.scrollTo({top: 0, behavior: 'smooth'})}} />
                    }
                    <div className={styles.currentPage}>{currentPage + 1}</div>
                    {((currentPage + 1) * 20) <= totalResults &&
                        <FaCaretRight onClick={() => {setCurrentPage(currentPage + 1); window.scrollTo({top: 0, behavior: 'smooth'})}} />
                    }
                    {(currentPage + 1) != 1 &&
                        <div className={styles.reset} onClick={() => {setCurrentPage(0); window.scrollTo({top: 0, behavior: 'smooth'})}}>Reset</div>
                    }
                </div>
            }
        </>
    )
}

export default MoviesList