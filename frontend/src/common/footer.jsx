import styles from './footer.module.scss'

function Footer () {

    const year = new Date().getFullYear();

    return (
        <div className={styles.footer}>
            {year} © Diego Viador
        </div>
    )
}

export default Footer