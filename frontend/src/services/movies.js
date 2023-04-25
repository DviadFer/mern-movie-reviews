//Libreria para enviar peticiones get, post, put y delete desde el front
import axios from "axios";

/**
 * Clase que encapsula métodos de llamada a la API
 */
class MovieDataService {

    //Endpoint servido por el método apitGetMovies en el movies controller
    getAll(page = 0) {
        return axios.get(`http://localhost:5000/api/v1/movies?page=${page}`)
    }

    //Endpoint servido por el método apitGetMovieById en el movies controller
    get(id) {
        return axios.get(`http://localhost:5000/api/v1/movies/id/${id}`)
    }

    //Endpoint igual a getAll() pero con la query de la URL añadida
    find(query, by = "title", page = 0) {
        return axios.get(`http://localhost:5000/api/v1/movies?${by}=${query}&page=${page}`)
    }

    //Endpoint servido por el método apitGetMovieById en el movies controller
    createReview(data) {
        return axios.post("http://localhost:5000/api/v1/movies/review", data)
    }

    updateReview(data) {
        return axios.put("http://localhost:5000/api/v1/movies/review", data)
    }

    deleteReview(id, userId) {
        return axios.delete(
            "http://localhost:5000/api/v1/movies/review",
            {data:{review_id: id, user_id: userId}}
        )
    }

    getRatings() {
        return axios.get("http://localhost:5000/api/v1/movies/ratings")
    }
}

export default new MovieDataService()