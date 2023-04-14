/**
 * Importamos el paquete Express para hacer uso de express.Router()
 * En lugar de poner nuestra ruta en server.js, usamos el enrutador de Express para encapsular mejor la api (POO)
 * permite organizar y modularizar el código de la aplicación para una mayor escalabilidad 
 */
import express from 'express'
import MoviesController from './movies.controller.js'
import ReviewsController from './reviews.controller.js'
const router = express.Router() 

// router.route() definela ruta, luego establecemos el metodo (en este caso get) y seguimos la convencion estandar de Express para definirlo.
router.route('/').get(MoviesController.apiGetMovies) 

//gets extra para single movie por id y para movies según sus ratings
router.route("/id/:id").get(MoviesController.apiGetMovieById)
router.route("/ratings").get(MoviesController.apiGetRatings)

/**
 * La ruta '/review' maneja las solicitudes http de tipo post, put y delete, todas dentro de esta única ruta de llamada. 
 * Si la ruta recibe una solicitud http tipo post para agregar una reseña, llamamos a apiPostReview. 
 * Si recibe una solicitud put para editar una reseña, llama a apiUpdateReview. 
 * Si recibe una solicitud delete para eliminar una reseña, llama a apiDeleteReview.
 */
router.route("/review")
    .post(ReviewsController.apiPostReview)
    .put(ReviewsController.apiUpdateReview)
    .delete(ReviewsController.apiDeleteReview)

//Exportamos esta ruta para que se pueda usar en server.js
export default router

