import {useState} from 'react'
import styles from './login.module.scss'

const Login = props => {

    const [name, setName] = useState("")
    const [id, setId] = useState("")

    const onChangeName = e => {
        // e.preventDefault()
        const name = e.target.value
        setName(name);
    }

    const onChangeId = e => {
        // e.preventDefault()
        const id = e.target.value
        setId(id);
    }

    const login = () => {
        props.login({name: name, id: id})
        props.history.push('/')
    }

    return (
        <>
            <h1 className={styles.title}>Login</h1>
            <form className={styles.loginForm}>
                <label>
                    <span>Username</span>
                    <input type="text" value={name} onChange={onChangeName}/>
                </label>
                <label>
                    <span>User ID</span>
                    <input type="text" value={id} onChange={onChangeId}/>
                </label>
                <button onClick={login}>Submit</button>
            </form>
        </>
    )
}

export default Login