import {useState} from 'react'
import styles from './login.module.scss'
import {FaInfoCircle} from 'react-icons/fa'

const Login = props => {

    const [name, setName] = useState("")
    const [id, setId] = useState("")

    const onChangeName = e => {
        const name = e.target.value
        setName(name)
    }

    const onChangeId = e => {
        const id = e.target.value
        setId(id)
    }

    const login = () => {
        if (name.toLowerCase() === 'arya stark' && id === '1234') {
            props.login({name: name, id: id})
        } else {
            props.login({name: 'Anonymous knight', id: id})
        }
        props.history.push('/')
    }

    return (
        <>
            <h1 className={styles.title}>Login</h1>
            <div className={styles.tip}>
                <div className={styles.text}>
                    <FaInfoCircle/>
                    <p>Use the <strong>test user "Arya Stark" with the ID "1234"</strong>. If you enter another name/ID, your reviews will be registered as "Anonymous knight".</p>
                    <p>Don't forget to <strong>remember your ID for future logins</strong> and to edit your reviews with the same user.</p>
                </div>
            </div>
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