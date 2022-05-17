import styles from '../styles/Home.module.css'

export default function HeaderCompanyOptions(props) {
    return (
        <div className={styles.companyOptions}>
            <p className={styles.optionsTagline}>HoosBuilding tracks the community's greatest projects - from garage to IPO.</p>
            <div className={styles.addCompany} onClick={() => Router.push("/add")}>Add company</div>
            <div className={styles.updateCompany}>Update a company</div>
        </div>
    )
}