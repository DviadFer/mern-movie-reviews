import ReviewsDAO from '../dao/reviewsDAO.js'

/**
 * A diferencia del controlador de movies, que recoge los datos de la URL, aquí los extraemos del req.body.
 * Ej. en React llamaremos al endpoint con con axios tras rellenar en el formulario correspondiente: 
 * axios.post("https://localhost:5000/api/v1/movies/review", data) // o un .fetch()
 */

export default class ReviewsController {

    // Petición POST de una review
    static async apiPostReview (req,res,next) {
        try {
            //Los params recogidos del fromulario (guardados en el objeto data) son: id de la peli, la review en sí y los datos del user que postea.
            const movieId = req.body.movie_id
            const review = req.body.review
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id,
            }

            const picture = `/avatar/${req.body.name.toLowerCase().replace(/ /g, "-")}.webp`

            // La fecha del post, que se crea en el momento que se ejecuta es función
            const date = new Date()

            //Se pasa esta info al DAO de reviews para que con el método addReview la añada a la base de datos
            const ReviewResponse = await ReviewsDAO.addReview (
                movieId,
                userInfo,
                picture,
                review,
                date
            )
            //Se imprime success si ha ejecutado la petición correctamente
            res.json({ status: "success "})
        } catch (e) {
            res.status(500).json({ error: e.message})
        }
    }

    //Petición PUT (update) de una review
    static async apiUpdateReview (req,res,next) {
        try {
            //Igual que en post, pero esta vez solo los datos referentes a la review que queremos actualizar:
            const reviewId = req.body.review_id
            const review = req.body.review
            //Se pasa el id de usuario que crea la review para asegurarnos que la propiedad 'modifiedCount' solo se incremente si este existe. Ver abajo.
            const userId = req.body.user_id

            //Creamos la fecha de actualización
            const date = new Date()

            //Dicha info se gestionará en el métdod updateReview() del DAO para actualizar la bd
            const ReviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                userId,
                review,
                date
            )

            // Comprobar si hay algún error en la respuesta de la actualización de la review
            var { error } = ReviewResponse
            if (error) {
                res.status.json({error})
            }

            /**
             * modifiedCount es una propiedad del objeto resultado (ReviewResponse) que se devuelve en una operación de actualización en MongoDB utilizando el paquete mongodb de Node.js.
             * Refleja la cantidad de documentos modificados en la base de datos. En este caso, vale 0 o 1 porque solo llegamos a modificar un documento por ejecución de .updateReview(). 
             * Si ReviewResponse.modifiedCount es igual a 0, indica que la actualización no se realizó bien o que el usuario que intenta actualizar la reseña no es su creador.
             */
            if (ReviewResponse.modifiedCount === 0) {
                throw new Error ("Unable to update review. User may not be original poster")
            }

            res.json({ status: "success "})
        } catch (e) {
            res.status(500).json({ error: e.message})
        }
    }

    //Petición DELETE de la review
    static async apiDeleteReview (req,res,next) {
        try{
            //Datos relevantes para eliminar la review. Debe existir un id usuario creador en el req.body para luego borrarla accediendo al id de la review
            const reviewId = req.body.review_id
            const userId = req.body.user_id

            //Info que pasamos al DAO
            const ReviewResponse = await ReviewsDAO.deleteReview(
                reviewId,
                userId,
            )
            res.json({ status: "success "})
        } catch (e) {
            res.status(500).json({ error: e.message})
        }
    }
}