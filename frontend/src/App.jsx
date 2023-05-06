import { Switch, Route } from "react-router-dom"
import { useState } from "react"


import Navbar from "./common/navbar"
import Footer from "./common/footer"
import AddReview from "./components/add-review"
import MovieSingle from "./components/movie-single"
import MoviesList from "./components/movie-list"
import Login from "./components/login"
import Tutorial from "./components/tutorial"

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
      <Navbar user={user} logout={logout}></Navbar>
      <main className={styles.main}>
        <Switch>
          <Route exact path={["/", "/movies"]} component={MoviesList}></Route>
          <Route path="/movies/:id/" render={
            (props)=><MovieSingle {...props} user={user} />
          }></Route>
          <Route path="/tutorial" render={
            (props)=><Tutorial {...props} user={user} />
          }></Route>
          <Route path="/login" render={
            (props)=><Login {...props} login={login} />
            }></Route>
        </Switch>
      </main>
      <Footer />     
    </>
  )
}

export default App
