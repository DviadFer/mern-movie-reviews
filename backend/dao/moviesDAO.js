/**
 * Un DAO es un patrón de diseño que ofrece una capa de abstracción entre la aplicación y la base de datos,
 * permitiendo separar las operaciones específicas de datos y proporcionar una interfaz estandarizada para su manejo.
 * En movies, guardaremos su respectiva referencia (objeto o una instancia que permite interactuar con la base de datos).
 */

let movies

export default class MoviesDAO {

    //Este método asíncrono injectDB() es un fucnión configuración que se llama una vez cuando se inicia el servidor para asegurar que la aplicación tenga acceso a la bd.
    static async injectDB(conn) {
        //Si ya exite, sale de la función
        if (movies) {
            return
        }
        //Si no se intentará conectará a la db (según la variable MOVIEREVIEWS_NS en .env) y guardará en movies la colección como referencia
        try {
            movies = await conn.db(process.env.MOVIEREVIEWS_NS)
            .collection('movies')
        } catch (e) {
            console.error(`unable to connect in MoviesDAO: ${e}`)
        }
    }

    /**
     * Método asíncrono que se encarga de consultar la base de datos y recuperar las películas según los filtros y la paginación especificados.
     * Deja pasar filtros como objeto en su primer argumento.
     */
    static async getMovies({
        filters = null, //Sin filtros por defecto
        page = 0, //Página incial
        moviesPerPage = 20,
    } = {}) {
        
        //Definimos una query según los filtros que entren por el argumento del método
        let query

        if (filters) {
            if (filters.hasOwnProperty('title')) {
                //Operadores de consulta $text y $search para buscar títulos de películas con términos de búsqueda del usuario, permitiendo consultas con múltiples palabras.
                query = { $text: { $search: filters['title']}}
            } else if (filters.hasOwnProperty('rated')) { 
                //Verifica si el valor especificado por el usuario es igual al valor en el campo de la base de datos.
                query = { "rated": filters['rated']}
            }
        }

        /**
         * Es necesario definir un cursor porque la consulta puede resultar en un conjunto muy grande de documentos.
         * Además de reducir el consumo de memoria y el uso del ancho de banda de la red, fracciona el conjunto en lotes,
         * ideal para programar la paginación en el frontend.
         */
        let cursor

        try{
            cursor = await movies
            .find(query)
            .limit(moviesPerPage) //Cada iteración se limita a las pelis por página establecidas anteriormente
            .skip(moviesPerPage * page) //Ej. Si esta en pagina 2, se salta los 20 primeros y te muestra a partir los siguientes 20

            //Return de los objetos array de las pelis + Número total de películas, contando el número de documentos en la consulta.
            const moviesList = await cursor.toArray()
            const totalNumMovies = await movies.countDocuments(query)
            return {moviesList, totalNumMovies}
        } catch(e) {
            //Se devuelve una lista de películas vacía y un total de películas igual a 0
            console.error(`Unable to issue find command, ${e}`)
            return { moviesList: [], totalNumMovies: 0}
        }
    }
}