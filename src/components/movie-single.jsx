import {useState, useEffect} from 'react'
import MovieDataService from '../services/movies'
import { Link } from 'react-router-dom'
import styles from './movie-single.module.scss'
import { FaStar } from 'react-icons/fa'
import AddReview from './add-review'

const MovieSingle = props => {

    const [movie, setMovie] = useState({
        title: '',
        fullplt: '',
        imdb : {
            rating: null
        },
        genres: [''],
        cast: [''],
        reviews: []
    })
    
    const getMovie = id =>{
        MovieDataService.get(id)
        .then(response => {
            setMovie(response.data)
            console.log(response.data)
        })
        .catch(e =>{
            console.log(e)
        })
    }

    const refreshMovieData = () => {
        getMovie(props.match.params.id)
    }
    
    const userHasPostedReview = () => {
        return movie.reviews.some(review => review.user_id === props.user.id)
    }
    
    const formatDate = (date) => {
        return date.split('T')[0]
    }

    useEffect(()=>{
        getMovie(props.match.params.id)
    },[props.match.params.id]) 

    return (
        <>
        <div className={styles.movieContainer}>
            <div className={styles.imageWrapper}>
                <div className={`${movie.rated ? styles.rating : ''}`}>{movie.rated}</div>
                <img className={styles.image} src={`${movie.poster}`} alt="movie-img" onError={({ currentTarget }) => {
                    currentTarget.onerror = null 
                    currentTarget.src="/image-not-found.webp"
                }}/>
            </div>
            <div className={styles.movieInfo}>
                <h1>{movie.title}</h1>
                <div className={styles.meta}>
                    <div className={styles.imdb}><FaStar/><span>{movie.imdb.rating}</span></div>
                    <div className={styles.divisor}/>
                    <div>{movie.released ? formatDate(movie.released) : 'UNDEFINED'}</div>
                    <div className={styles.divisor}/>
                    <div className={styles.genres}>
                        {movie.genres.map( (genre, index) => {
                            return (
                                <span key={`${genre}-${index}`}>
                                    {genre}{index !== (movie.genres.length - 1) ? ", " : ""}
                                </span>
                            )
                        })}
                    </div>
                </div>
                <p className={styles.fullPlot}>{movie.fullplot}</p>
                <h3>Featured Cast</h3>
                <div className={styles.cast}>
                    {movie.cast.map( (cast, index) => {
                        return (
                            <div key={`${cast}-${index}`}>{cast}</div>
                        )
                    })}
                </div>
                {props.user && !userHasPostedReview() &&
                    <AddReview {...props} refreshMovieData={refreshMovieData} />
                }                
            </div>
        </div>
        <h2>Reviews</h2>
        <div className={styles.reviewContainer}>
            {console.log('Estado de las reviews', movie.reviews)}
            {movie.reviews.length != 0 ? (
                movie.reviews.map((review, index) =>{
                    return (
                        <div key={review._id} className={styles.reviewWrapper}>
                            <div className={styles.authorWrapper}>
                                <span>{review.name}</span>
                                <span>{formatDate(review.date)}</span>
                            </div>
                            <div className={styles.speechBubble}>
                                <img src={`${review.user_picture}`} alt="profile-pic" />
                                <p>{review.review}</p>
                            </div>
                            {props.user && props.user.id === review.user_id &&
                                <AddReview {...props} reviewEdit={review} refreshMovieData={refreshMovieData} />
                            }
                        </div>
                    )
                })
            ) : (
                <span>This film has no reviews yet. {props.user ? 'Be the first to write one!' : 'You need to be logged in to write one!'} </span>
            )}
        </div>
        </>
    )
}

export default MovieSingle