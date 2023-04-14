import MoviesDAO from '../dao/moviesDAO.js'

/**
 * Controlador para las peliculas que el archivo de ruta usará para gestionar la petición y acceder al DAO de las mismas.
 * Ruta > Controlador > Dao (ruta de la api (url), gestión de la petición e interacción con la base de datos)
 */
export default class MoviesController {

    /**
     * Gestiona el string query alamcenada como objeto en la petición (req.query). 
     * Se modificara con un from de buscadro y diferentes desplegables de la pagina de incio.
     * Ej. api/v1/movies?title=dragon&moviesPerPage=15&page=0
     */
    static async apiGetMovies (req,res,next) {

        // Comprueba si existe y si no añade un valor por defecto mediante operador ternario
        const moviesPerPage = req.query.moviesPerPage ? parseInt(req.query.moviesPerPage) : 20
        const page = req.query.page ? parseInt(req.query.page) : 0

        // Creamos filers vacio y solo se llena si req.query trae info al respecto
        let filters = {}

        if (req.query.rated) {
            filters.rated = req.query.rated
        } else if (req.query.title) {
            filters.title = req.query.title
        }

        /**
         * Definimos el objeto que retorna el DAO movies y le pasamos por argumento lo necesario para que este se ejecute.
         * Ver moviesDAO.js para ver como este está definido y lo que retorna
         */
        const { moviesList, totalNumMovies } = await MoviesDAO.getMovies({filters, page, moviesPerPage})

        //Creamos el objeto response para dar formato a los datos obtenidos de la req.query y el return del DAO movies
        let response = {
            movies: moviesList,
            page: page,
            filters: filters,
            entries_per_page: moviesPerPage,
            total_results: totalNumMovies,
        }

        //Transformamo el objeto response en json para gestionar luego en el frontend
        res.json(response)
    }

    /**
     * Para hace GET de una pelicula concreta a traves del id proporcionado como parámetro en la req
     * Ej. localhost:5000/api/v1/movies/id/12345 (diferente param de query porque no es ?id=12345)
     */
    static async apiGetMovieById (req,res,next){
        try{
            let id = req.params.id || {} //Si no existe pasamos el objeto vacío

            //Se realiza la consulta a la bd en el DAO de movies
            let movie = await MoviesDAO.getMovieById(id)

            //Si es {} o no exite el id
            if (!movie) {
                res.status(404).json({ error: "not found"})
                return
            }
            res.json(movie)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({error: e})
        }
    }

    /**
     * No lleva ni query, ni para ni datos en el body de la req.
     * Simplemente si accedemos a la ruta de la review, se ejecuatará desde la DAO la consulta getRatings()
     */
    static async apiGetRatings (req,res,next){
        try{
            let propertyTypes = await MoviesDAO.getRatings()
            res.json(propertyTypes)
        } catch (e) {
            console.log(`api,${e}`)
            res.status(500).json({error: e})
        }
    }
        
}