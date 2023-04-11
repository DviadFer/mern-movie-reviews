/**
 * Importamos el paquete Express para hacer uso de express.Router()
 * En lugar de poner nuestra ruta en server.js, usamos el enrutador de Express para encapsular mejor la api (POO)
 * permite organizar y modularizar el código de la aplicación para una mayor escalabilidad 
 */
import express from 'express'
import MoviesController from './movies.controller.js'
const router = express.Router() 

// router.route() definela ruta, luego establecemos el metodo (en este caso get) y seguimos la convencion estandar de Express para definirlo.
router.route('/').get(MoviesController.apiGetMovies) // Ruta de testeo para '/'

//Exportamos esta ruta para que se pueda usar en server.js
export default router