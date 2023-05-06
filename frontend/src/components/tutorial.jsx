import { FaSearch, FaFileAlt, FaUser, FaComments, FaEdit } from 'react-icons/fa'
import styles from './tutorial.module.scss'


function Tutorial (props) {
    console.log(props.user)
    return (
        <div className={styles.tutorial}>
            <h1>Welcome to Meteor Reviews!</h1>
            <p>Here you'll find <strong>the perfect movie catalog for you, where you can read and share your opinions about your favorite films</strong>. Inspired by IMDb, we offer an easy-to-use and friendly platform for all movie lovers.</p>
            <p>This page is a <span className={styles.gradient}>mockup developed with the MERN stack</span> (MongoDB, Express, React, and Node.js).</p>
            <p>Before you begin, review the main features implemented:</p>
            <div className={styles.featureList}>
                <div><FaSearch/><div className={styles.text}><strong>Search</strong>: Easily find movies on our homepage by searching for <strong>title</strong> or <strong>rating</strong> (PG, R, G, etc.).</div></div>
                <div><FaFileAlt/><div className={styles.text}><strong>Pagination</strong>: Our catalog displays 20 movies per page, making it easy to navigate through our cinema options.</div></div>
                <div><FaUser/><div className={styles.text}><strong>Login</strong>: Sign up to leave reviews. The login form contains fields for the username and user ID. In this project, <strong>there is no real user management</strong> on the server, they are just identifiers to manage the reviews.</div></div>
                <div><FaComments/><div className={styles.text}><strong>Leave a review</strong>: Share your opinions and help other users decide what to watch. There are <strong>sample reviews</strong> in the first five movies (search filters disabled).</div></div>
                <div><FaEdit/><div className={styles.text}><strong>Edit or delete reviews</strong>: Modify or delete your reviews at any time. When editing a review, the date will automatically update to the current one.</div></div>
            </div>
            <p><strong>You're ready to explore Meteor Reviews!</strong> Enjoy the cinematic experience and share your opinions with our community.</p>
        </div>
    )
}

export default Tutorial