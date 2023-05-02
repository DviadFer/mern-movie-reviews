import {useState, useEffect} from 'react'
import MovieDataService from '../services/movies'
import { Link } from 'react-router-dom'
import styles from './movie-single.module.scss'
import { FaStar, FaChevronRight } from 'react-icons/fa'

const MovieSingle = props => {

    console.log('Se puede observar dentro de la peli', props.user);

    //Definimos el objeto movie para rellenar despues de usar el servicio movies.js
    const [movie, setMovie] = useState({
        title: '',
        fullplt: '',
        imdb : {
            rating: null
        },
        genres: [],
        cast: [],
        reviews: []
    })

    //Definimos la funcion que usa get(id) del servicio como reslucion de la promise. Se activará en el use Effect
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

    //Formato a la fecha
    const formatDate = (date) => {
        return date.split('T')[0]
    }

    useEffect(()=>{
        //props.match.params es la sintáxis que usamos para acceder a los parmaetros dinámicos asociados desde la url
        getMovie(props.match.params.id)
    },[props.match.params.id]) //[] si esta vacio hace que solo se active una vez, como no es así, se activará cada vez que el id cambie

    return (
        <>
        <div className={styles.movieContainer}>
            <div className={styles.imageWrapper}>
                <div className={`${movie.rated ? styles.rating : ''}`}>{movie.rated}</div>
                <img className={styles.image} src={`${movie.poster}`} alt="movie-img" onError={({ currentTarget }) => {
                    currentTarget.onerror = null // prevents looping
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
                {props.user &&
                    <Link className={styles.addReview} to={`/movies/${props.match.params.id}/review`}>
                        <span>Add Review</span>
                        <FaChevronRight />
                    </Link>
                }                
            </div>
        </div>
        <div className={styles.reviewContainer}>
            <h2>Reviews</h2>
            <div className={styles.reviewContainer}>
                {movie.reviews.map((review, index) =>{
                    return (
                        <div key={`${review}-${index}`} className={styles.review}>
                            <h5>{review.name + " reviewed on " + formatDate(review.date)}</h5>
                            <p>{review.review}</p>
                            {props.user && props.user.id === review.user_id &&
                                <div className={styles.reviewActions}>
                                    <Link to={{pathname: `/movies/${props.match.params.id}/review`, state: {currentReview: review}}}>Edit</Link>
                                    <button>Delete</button>
                                </div>
                            }
                        </div>
                    )
                })}
            </div>
        </div>
        </>
    );
}

export default MovieSingle