import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let reviews

export default class ReviewsDAO {

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

    static async addReview (movieId, user, picture, review, date) {
        try{
            const reviewDoc = {
                name: user.name,
                user_id: user._id,
                user_picture: picture,
                date: date,
                review: review,
                movie_id: new ObjectId(movieId) 
            }
            return await reviews.insertOne(reviewDoc)
        } catch(e) {
            console.error(`Unable to post review: ${e}`)
            return { error: e}
        }
    }

    static async updateReview (reviewId, userId, review, date) {
        try {
            return await reviews.updateOne (
                {user_id: userId, _id: new ObjectId(reviewId)}, 
                {$set:{review:review, date: date}} 
            )
        } catch (e) {
            console.error(`Unable to update review: ${e}`)
            return { error: e}
        }
    }

    static async deleteReview(reviewId, userId){
        try {
            return await reviews.deleteOne({
                _id: new ObjectId(reviewId),
                user_id: userId,
            })
        } catch (e) {
            console.error(`unable to delete review: ${e}`)
            return { error: e}
        }
    }

}