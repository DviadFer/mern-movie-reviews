/**
 * Importamos la 'app' que hemos creado y exportado previamente en server.js. 
 * Importamos mongodb para acceder a nuestra base de datos y dotenv para acceder a nuestras variables de entorno.
 */
import app from './server.js'
import mongodb from "mongodb"
import dotenv from "dotenv"

/**
 * Conexión con mongodb.MongoClient, controlador oficial de MongoDB para Node.js.
 * No usamos mongoose, porque no necesitamos características adicionales, como validación de datos, esquemas y un enfoque basado en objetos.
 * En este caso, solo nos interes la conexión.
 */
async function main(){

    // Con .config cargamos las variables de entorno
    dotenv.config()

    // Las usamos para inicar una instancia del cliente MongoDB y settear un puerto
    const client = new mongodb.MongoClient(process.env.MOVIEREVIEWS_DB_URI)
    const port = process.env.PORT || 5000
    
    try {
        // Nos intentamos conectar al cliente y al puerto (promise)
        await client.connect()
        app.listen(port, () =>{console.log('server is running on port:'+port)})
    } catch (e) {
        // Si falla la conexión, imprime el error y para la ejecución de node
        console.error(e)
        process.exit(1)
    }
}

//Ejecuta main() y hace log de cualquier error no contemplado en el trycatch anterior
main().catch(console.error)