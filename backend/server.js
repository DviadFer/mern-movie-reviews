// Importación de express y el middleware cors
import express from 'express'
import cors from 'cors'

// movies.route.js es un archivo separado que almacena una solicitud HTTP. Actúa como un middleware
import movies from './api/movies.route.js'

//creación del server
const app = express()

/**
 * Inicio del middleware CORS:
 * Permite la comunicación segura entre aplicaciones web de diferentes dominios. 
 * Facilita el intercambio de recursos controlando el acceso a través de políticas específicas (cabeceras HTTP).
 */
app.use(cors())

//Parsing middleware de Express para permitir que el server lea y acepta JSON en el body de la request
app.use(express.json())

/**
 * Ruta inicial:
 * La convención de URL para APIs comienza con /api/<número de versión> y, en este caso, la URL principal será localhost:5000/api/v1/movies. 
 * La ruta específica se define en el segundo argumento, movies, importado arriba como si fuese un middleware.
 */
app.use("/api/v1/movies", movies)

// wildcard * para recoger rutas desconocidas y tener un output de error 404
app.use('*', (req,res)=>{
    res.status(404).json({error: "not found"})
})

// Exportamos 'app' como módulo, permitiendo separar el código principal del servidor del código que gestiona la bbdd al importarlo en otros archivos, 
export default app