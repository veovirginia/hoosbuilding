import styles from '../styles/CustomNavbar.module.css'

export default function CustomNavbar(props) {
    return (
        <div className={styles.navbar}>
            <a className={styles.brand} href="/">HoosBuilding 🚀</a>
            <div className={styles.navbarRight}>
                <div>About</div>
                <div>Founder Stack</div>
                <div>Contact us</div>
            </div>
        </div>
    )
}