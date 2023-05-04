import mongodb from "mongodb"
//método que se utiliza para convertir una cadena de identificación (id) en un ObjectId de MongoDB. Equivalente a ID en bd relacionales.
const ObjectId = mongodb.ObjectId

let reviews

export default class ReviewsDAO {

    //Este método es similar al del DAO movies. Cuando se inicia el server nos aseguramos de que este tiene acceso a la colección reviews.
    static async injectDB (conn) {
        if(reviews){
            return
        }

        try{
            reviews = await conn.db(process.env.MOVIEREVIEWS_NS).collection('reviews')
        } catch (e) {
            console.error(`Unable to establish connection handle in reviewDAO: ${e}`)
        }
    }

    //Aquí estan creados los tres metodos que emplean las tres peticiones contempladas en el controlador de reviews

    //Como ya nos preocupamos en el controller de hacer los filtros, aquí simplemente realizamos la consulta de añadir review
    static async addReview (movieId, user, picture, review, date) {
        try{
            //Damos formato a los datos para que coincida con los campos de un documento de la colección reviews
            const reviewDoc = {
                name: user.name,
                user_id: user._id,
                user_picture: picture,
                date: date,
                review: review,
                movie_id: new ObjectId(movieId) 
            }
            //Usamos insertOne (método proporcionado por el paquete mongodb) para crear un nuevo documento
            return await reviews.insertOne(reviewDoc)
        } catch(e) {
            console.error(`Unable to post review: ${e}`)
            return { error: e}
        }
    }

    static async updateReview (reviewId, userId, review, date) {
        try {
            //Usamos updateOne (método proporcionado por el paquete mongodb) para actualizar una review
            return await reviews.updateOne (
                //compara el id del usario de la review con el que viene como argumento de updateReview y lo mismo con los ids de reviews
                {user_id: userId, _id: new ObjectId(reviewId)}, 
                //sustituye con el operador $set los valores especificados con los datos que viene del argumento de updateReview
                {$set:{review:review, date: date}} 
            )
        } catch (e) {
            console.error(`Unable to update review: ${e}`)
            return { error: e}
        }
    }

    static async deleteReview(reviewId, userId){
        try {
            //Usamos deleteOne (método proporcionado por el paquete mongodb) para eliminar una review
            return await reviews.deleteOne({
                //AL igual que con el update, se ejecuta si se cumplen estas dos comparaciones:
                _id: new ObjectId(reviewId),
                user_id: userId,
            })
        } catch (e) {
            console.error(`unable to delete review: ${e}`)
            return { error: e}
        }
    }

}