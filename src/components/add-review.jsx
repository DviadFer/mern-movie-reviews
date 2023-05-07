import { useState } from 'react'
import MovieDataService from "../services/movies"
import styles from './add-review.module.scss'
import { FaChevronRight, FaTimes, FaTrashAlt, FaPen, FaRedoAlt } from 'react-icons/fa'

const AddReview = props => {

    let editing = false 
    let initialReviewState = ""

    if(props.reviewEdit){
        editing = true 
        initialReviewState = props.reviewEdit.review 
    }

    const [review, setReview] = useState(initialReviewState)
    const [showForm, updateShowForm] = useState(true)

    const handleShowForm = (e = null) => {
        if (e) {e.preventDefault()}
        updateShowForm(!showForm)
    }

    const onChangeReview = e => {
        const review = e.target.value
        setReview(review)
    }

    const saveReview = (e) => {
        e.preventDefault()
        let data = {
            review: review,
            name: props.user.name,
            user_id: props.user.id,
            movie_id: props.match.params.id 
        }
        if (editing) {
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

    const deleteReview = () =>{
        let data = {
            review: review,
            name: props.user.name,
            user_id: props.user.id,
            movie_id: props.match.params.id
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