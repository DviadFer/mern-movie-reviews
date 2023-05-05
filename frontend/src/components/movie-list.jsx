import {useState, useEffect } from 'react'
import MovieDataService from "../services/movies"
import MovieCard from './movie-card'


import { FaSearch } from 'react-icons/fa'
import styles from './movie-list.module.scss'


function MoviesList (props) {

    //Estado del array de peliculas que luego llenaremos con la info de la db
    const [movies, setMovies] = useState([])
    //Estado de los formularios de busqueda. Se actualizarán al interactuar con ellos
    const [searchTitle, setSearchTitle] = useState("")
    const [searchRating, setSearchRating] = useState("")
    //Estado del placeholder del select de las reviews en su form respectivo
    const [ratings, setRatings] = useState(["All Ratings"])

    //Estados para controlar la paginación
    const [currentPage, setCurrentPage] = useState(0)

    //useEffect se ejecuta cuando se termina de renderizar el componente. Ponemos [] como segundo argumento porque queremos que se llame 1 vez
    useEffect(() =>{
        retrieveMovies()
        retrieveRatings()
    },[])

    //Use effect
    useEffect(() =>{
        retrieveMovies()
    },[currentPage])

    //Uso del getAll() del servicio. Ponemos un try catch para debug en consola
    const retrieveMovies = () => {
        MovieDataService.getAll(currentPage)
        .then(response =>{
            console.log(response.data)
            //Usamos el useState de movies para popular el array con response.data.movies
            setMovies(response.data.movies)
            setCurrentPage(response.data.page)
        })
        .catch( e => {
            console.log(e)
        })
    }

    //Uso del getRatings del servicio. Console debug 
    const retrieveRatings = () =>{
        MovieDataService.getRatings()
        .then(response =>{
            console.log(response.data)
            //Empieza con 'All ratings' si el usuario no especifica ningun rating y luego concatena el resto de las ratings del array
            setRatings(["All Ratings"].concat(response.data))
        })
        .catch( e =>{
            console.log(e)
        })
    }

    //Cada vez que se modifiquen los form de busqueda, se guardara su valor en sus respectivos estados de search
    const onChangeSearchTitle = (event) => {
        const searchTitle = event.target.value
        setSearchTitle(searchTitle)
    }
    const onChangeSearchRating = (event) => {
        const searchRating = event.target.value
        setSearchRating(searchRating)
    }

    //De manera similar a retrieveMovies, pero pasado las querys de los formularios
    const find =(query, by) =>{
        MovieDataService.find(query,by)
        .then(response =>{
            console.log(response.data)
            setMovies(response.data.movies)
        })
        .catch(e =>{
            console.log(e)
        })
    }
    
    //Funcion que hacen retrieve de los campos de los formularios cuando se presiona el boton Search
    const findByTitle = (event) => {
        //Para impedir que haga una petición GET por defecto
        event.preventDefault();
        find(searchTitle, "title")
    }
    const findByRating = (event) => {
        event.preventDefault();
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
                    <button onClick={findByTitle}><FaSearch /></button>
                </form>
                <form>
                    <select onChange={onChangeSearchRating}>
                        {ratings.map(rating =>{
                            return <option key={rating} value={rating}>{rating}</option>
                        })}
                    </select>
                    <button onClick={findByRating}><FaSearch /></button>
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
                }) : 'No items'}
            </div>
            <div className={styles.pagination}>
                <button onClick={() => {setCurrentPage(currentPage - 1)}}>
                    Get previous
                </button>
                <span>Showing page: {currentPage + 1}</span>
                <button onClick={() => {setCurrentPage(currentPage + 1)}}>
                    Get next
                </button>
            </div>
        </>
    )
}

export default MoviesList