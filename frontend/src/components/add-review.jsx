import { useState } from 'react'
import MovieDataService from "../services/movies"
import styles from './add-review.module.scss'
import { FaChevronRight, FaTimes, FaTrashAlt, FaPen, FaRedoAlt } from 'react-icons/fa'

const AddReview = props => {

    let editing = false //Por defecto estamos creando una nueva
    let initialReviewState = ""

    //Si existe un state y un valor que se pasa al clickar en edit review con {Link}, entonces sabes que estamos editando
    if(props.reviewEdit){
        editing = true //Para el if de saveReview()
        initialReviewState = props.reviewEdit.review //Para rellenar el value dentro del textarea con la review como valor inicial
    }

    //Para setear el valor del textarea
    const [review, setReview] = useState(initialReviewState)

    //Para mostrar o no el textarea según pulsemos el botón superior de edit o crear
    const [showForm, updateShowForm] = useState(true)

    const handleShowForm = (e = null) => {
        if (e) {
            e.preventDefault()
        }
        updateShowForm(!showForm)
    }

    // para setear la review cada vez que actualizamos el textarea
    const onChangeReview = e => {
        const review = e.target.value
        setReview(review)
    }

    //Manejado por el boton submit, 
    const saveReview = (e) => {
        e.preventDefault()
        let data = {
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
                props.refreshMovieData()
                handleShowForm()
            })
            .catch(e =>{
                console.log(e)
            })
        } else {
            MovieDataService.createReview(data)
            .then(response => {
                console.log(response.data)
                props.refreshMovieData()
                handleShowForm()
                setReview(initialReviewState)
            })
            .catch(e => {
                console.log(e)
            })
        }
    }

    //Llama al metodo deleteReview del servio para eliminar una review cuando pulsamos delete
    const deleteReview = () =>{
        let data = {
            review: review,
            name: props.user.name,
            user_id: props.user.id,
            movie_id: props.match.params.id // el id de la pelicula se saca directo de la url
        }
        data.review_id = props.reviewEdit._id
        MovieDataService.deleteReview(data.review_id, props.user.id)
        .then(response => {
            console.log('Review eliminada', response.data)
            props.refreshMovieData()
        })
        .catch(e => {
            console.log(e)
        })
    }

    return (
        <>{editing ? (
            <>
            <div className={`${styles.editDelete} ${showForm ? '' : styles.activeButton}`} >
                <button onClick={handleShowForm}>{showForm ? (<FaPen />) : (<FaTimes />)}</button>
                <button onClick={()=> deleteReview()}> <FaTrashAlt /> </button>
            </div>
            <form className={`${styles.reviewForm} ${showForm ? styles.showForm : ''}`}>
                <textarea rows={3} spellCheck='true' required value={review} onChange={onChangeReview}/>
                <div className={styles.submitWrap}>
                    <button className={styles.submit} onClick={saveReview}>Submit</button>
                </div>
            </form>
            </>
        ) : (
            <>
            <button className={`${styles.addButton} ${showForm ? '' : styles.activeButton}`} onClick={handleShowForm}>
                <span>Add Review</span>                
                <FaChevronRight />
            </button>
            <form className={`${styles.reviewForm} ${showForm ? styles.showForm : ''}`}>
                <textarea rows={3} spellCheck='true' required value={review} onChange={onChangeReview}/>
                <div className={styles.submitWrap}>
                    <button className={styles.cancel} onClick={handleShowForm}><FaRedoAlt/></button>
                    <button className={styles.submit} onClick={saveReview}>Submit</button>
                </div>
            </form>
            </>
        )}     
        </>
    )
}

export default AddReview