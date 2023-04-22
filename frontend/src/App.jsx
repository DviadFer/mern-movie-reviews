import { Switch, Route, Link } from "react-router-dom"
import { useState } from "react"

import AddReview from "./components/add-review"
import MovieSingle from "./components/movie-single"
import MoviesList from "./components/movie-list"
import Login from "./components/login"

import styles from './App.module.scss'

function App() {

  const [user, setUser] = useState(null)

  async function login(user = null) {// default user to null
    setUser(user)
  }
  async function logout() {
    setUser(null)
  }

  return (
    <>
      <nav className={styles.navbar}>
          <div className={styles.wrapper}>
            <div>Meteor Reviews</div>
            <div><Link to={"/movies"}>Movies</Link></div>
            <div>
              { user ? (
                <a onClick={logout}>Logout User</a>
              ) : (
                <Link to={"/login"}>Login</Link>
              )}
            </div>
          </div>
      </nav>

      <main className={styles.main}>
        <Switch>
          <Route exact path={["/", "/movies"]} component={MoviesList}></Route>
          <Route path="/movies/:id/review" render={
            (props)=><AddReview {...props} user={user} />
          }></Route>
          <Route path="/movies/:id/" render={
            (props)=><MovieSingle {...props} user={user} />
          }></Route>
          <Route path="/login" render={
            (props)=><Login {...props} login={login} />
            }></Route>
        </Switch>
      </main>
    </>
  )
}

export default App
