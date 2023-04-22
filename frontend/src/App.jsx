import { Switch, Route, Link } from "react-router-dom"

import AddReview from "./components/add-review"
import MovieSingle from "./components/movie-single"
import MoviesList from "./components/movie-list"
import Login from "./components/login"

function App() {

  let user = false

  return (
    <>
      <nav>
          <div>Meteor Reviews</div>
          <div><Link to={"/movies"}>Movies</Link></div>
          <div>
            { user ? (
              <a>Logout User</a>
            ) : (
              <Link to={"/login"}>Login</Link>
            )}
          </div>
      </nav>
    </>
  )
}

export default App
