import { Link } from "react-router-dom/cjs/react-router-dom.min"
import { useState } from "react";
import styles from './navbar.module.scss'
import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar({user, logout}) {

    const [navOpen, setNav] = useState(false)
    const [displayLinks, setLinks] = useState(false)

    const handleCick = () => {
        setNav(!navOpen)
        setLinks(!displayLinks)
    }

    return (
        <nav className={styles.navbar}>
            <div className={styles.wrapper}>
                <Link to={"/movies"}>
                    <div className={styles.logo}>
                        <svg id="logo-39" width="50" height="40" viewBox="0 0 50 40" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M25.0001 0L50 15.0098V24.9863L25.0001 40L0 24.9863V15.0099L25.0001 0Z" fill="#A5B4FC" className="ccompli2"></path> <path fillRule="evenodd" clipRule="evenodd" d="M0 15.0098L25 0L50 15.0098V24.9863L25 40L0 24.9863V15.0098ZM25 33.631L44.6967 21.8022V18.1951L44.6957 18.1945L25 30.0197L5.30426 18.1945L5.3033 18.1951V21.8022L25 33.631ZM25 24.5046L40.1018 15.4376L36.4229 13.2298L25 20.0881L13.5771 13.2298L9.89822 15.4376L25 24.5046ZM25 14.573L31.829 10.4729L25 6.37467L18.171 10.4729L25 14.573Z" fill="#4F46E5" className="ccustom"></path> <path d="M25.0001 0L0 15.0099V24.9863L25 40L25.0001 0Z" fill="#A5B4FC" className="ccompli2" fillOpacity="0.3"></path> </svg>
                        <p className={styles.text}>Meteor <span className={styles.accentColor}>reviews</span></p>
                    </div>
                </Link>
                <ul className={`${styles.links} ${displayLinks ? styles.active : ''}`}>
                    <li onClick={handleCick}><Link to={"/movies"}>Movies</Link></li>
                    <li onClick={handleCick}><Link to={"/tutorial"}>Tutorial</Link></li>
                    <li className={styles.login} onClick={handleCick}>
                        { user 
                            ? (<>
                                <a onClick={logout}>Logout </a>
                                <img src={`/avatar/${user.name.toLowerCase().replace(/ /g, "-")}.webp`} alt="profile" />
                            </>
                            ) : (<Link to={"/login"}>
                                <span>Login</span>
                                
                            </Link>)
                        }
                    </li>                   
                </ul>
                <button className={styles.navButton} onClick={handleCick}>
                    { navOpen 
                        ? (<FaTimes />) 
                        : (<FaBars />)
                    }
                </button>
            </div>
        </nav>
    )
}

export default Navbar