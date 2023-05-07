import { Link } from "react-router-dom/cjs/react-router-dom.min"
import styles from './movie-card.module.scss'
import { FaStar } from "react-icons/fa"

function MovieCard ({imageSrc, title, plot = 'Plot unavailable', score, date, rating, link}) {

    const truncatePlot = (plot, wordLimit = 20) => {
        let words = plot.split(' ') 
        let trimmedWords = words.slice(0, wordLimit) 
        let trimmedPlot = trimmedWords.join(' ') + '...' 
        return trimmedPlot
    }

    const formatDate = (date) => {
        return date.split('T')[0]
    }

    return (
        <div className={styles.card}>
            <Link to={link}>
                <div className={styles.imageWrapper}>
                    <div className={`${rating ? styles.rating : ''}`}>{rating}</div>
                    <img className={styles.image} src={`${imageSrc}`} alt="movie-img" onError={({ currentTarget }) => {
                        currentTarget.onerror = null // prevents looping
                        currentTarget.src="/image-not-found.webp"
                    }}/>
                </div>
            </Link>
            <Link to={link}>
                <h3 className={styles.title}>{title}</h3>
            </Link>
            <div className={styles.metaInfo}>
                <div className={styles.imdb}><FaStar/><span>{score}</span></div>
                <div className={styles.divisor}/>
                <div>{date ? formatDate(date) : 'UNDEFINED'}</div>
            </div>
            <div className={styles.plot}>{truncatePlot(plot)}</div>
        </div>
    )
}

export default MovieCard