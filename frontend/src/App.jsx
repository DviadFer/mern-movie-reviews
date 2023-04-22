import { Switch, Route, Link } from "react-router-dom"
import { useState } from "react"

import AddReview from "./components/add-review"
import MovieSingle from "./components/movie-single"
import MoviesList from "./components/movie-list"
import Login from "./components/login"

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
      <nav>
          <div>Meteor Reviews</div>
          <div><Link to={"/movies"}>Movies</Link></div>
          <div>
            { user ? (
              <a onClick={logout}>Logout User</a>
            ) : (
              <Link to={"/login"}>Login</Link>
            )}
          </div>
      </nav>
    </>
  )
}

export default App
