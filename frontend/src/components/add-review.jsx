import { useState } from 'react'
import MovieDataService from "../services/movies"
import { Link } from "react-router-dom"

const AddReview = props => {

    let editing = false //Por defecto estamos creando una nueva
    let initialReviewState = ""

    //Si existe un state y un valor que se pasa al clickar en edit review con {Link}, entonces sabes que estamos editando
    if(props.reviewEdit){
        editing = true //Para el if de saveReview()
        initialReviewState = props.reviewEdit.review //Para rellenar el value dentro del textarea con la review como valor inicial
    }

    const [review, setReview] = useState(initialReviewState)

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
            data.review_id = props.reviewEdit._id
            MovieDataService.updateReview(data)
            .then(response =>{
                console.log(response.data)
                props.refreshMovieData();
            })
            .catch(e =>{
                console.log(e);
            })
        } else {
            MovieDataService.createReview(data)
            .then(response => {
                console.log(response.data)
                props.refreshMovieData();
            })
            .catch(e => {
                console.log(e)
            })
        }
    }

    return (
        <>  
            <h1>{editing ? "Edit your old" : "Create a critical"} review</h1>       
            <form>
                <textarea spellCheck='true' required value={review} onChange={onChangeReview}/>
                <button onClick={saveReview}>Submit</button>
            </form>
        </>
    )
}

export default AddReview