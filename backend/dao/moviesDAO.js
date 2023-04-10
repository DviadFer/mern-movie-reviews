/**
 * Un DAO es un patrón de diseño que ofrece una capa de abstracción entre la aplicación y la base de datos,
 * permitiendo separar las operaciones específicas de datos y proporcionar una interfaz estandarizada para su manejo.
 * En movies, guardaremos su respectiva referencia (objeto o una instancia que permite interactuar con la base de datos).
 */

let movies

/**
 * 
 */
export default class MoviesDAO {

    //Este método asíncrono injectDB() se llama tan pronto como se inicia el server para proveer la referencia de la db a movies
    static async injectDB(conn) {
        //Ya ya exite, sale de la función
        if (movies) {
            return
        }
        //Si no se intentará conectará a la db (según la variable MOVIEREVIEWS_NS en .env) y guardará en movies la colección movies como objeto
        try {
            movies = await conn.db(process.env.MOVIEREVIEWS_NS)
            .collection('movies')
        } catch (e) {
            console.error(`unable to connect in MoviesDAO: ${e}`)
        }
    }


}