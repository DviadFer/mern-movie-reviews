import { useState } from 'react'
import MovieDataService from "../services/movies"
import { Link } from "react-router-dom"

const AddReview = props => {

    let editing = false //Por defecto estamos creando una nueva
    let initialReviewState = ""

    //Si existe un state y un valor que se pasa al clickar en edit review con {Link}, entonces sabes que estamos editando
    if(props.location.state && props.location.state.currentReview){
        editing = true //Para el if de saveReview()
        initialReviewState = props.location.state.currentReview.review //Para rellenar el value dentro del textarea con la review como valor inicial
    }

    const [review, setReview] = useState(initialReviewState)
    // Para mantener un seguimiento de si la review ha sido actualizada
    const [submitted, setSubmitted] = useState(false)

    // para setear la review cada vez que actualizamos el textarea
    const onChangeReview = e => {
        const review = e.target.value
        setReview(review)
    }

    //Manejado por el boton submit, 
    const saveReview = (e) => {
        e.preventDefault()
        var data = {
            review: review,
            name: props.user.name,
            user_id: props.user.id,
            movie_id: props.match.params.id // el id de la pelicula se saca directo de la url
        }
        if(editing){
            // Obtenemos el id de la review del state review que pasamos con {Link} del boton edit review
            data.review_id = props.location.state.currentReview._id
            MovieDataService.updateReview(data)
            .then(response =>{
                setSubmitted(true);
                console.log(response.data)
            })
            .catch(e =>{
                console.log(e);
            })
        } else {
            MovieDataService.createReview(data)
            .then(response => {
                setSubmitted(true)
                console.log(response.data)
            })
            .catch(e => {
                console.log(e)
            })
        }
    }

    return (
        <>
            {submitted ? (
                <div>
                    <h4>Review submitted successfully</h4>
                    <Link to={"/movies/"+props.match.params.id}>
                    Back to Movie
                    </Link>
                </div>
            ) : (
                <form>
                    <label>
                        <span>{editing ? "Edit" : "Create"} Review</span>
                        <textarea spellCheck='true' required value={review} onChange={onChangeReview}/>
                    </label>
                    <button onClick={saveReview}>Submit</button>
                </form>
            )}
        </>
    )
}

export default AddReview