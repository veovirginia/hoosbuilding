import styles from "../styles/Home.module.css";
import Router from "next/router";

export default function HeaderCompanyOptions(props) {
	return (
		<div className={styles.companyOptions}>
			<p className={styles.optionsTagline}>
				HoosBuilding tracks the community's greatest projects - from garage to
				IPO.
			</p>
			<div className={styles.addCompany} onClick={() => Router.push("/add")}>
				{/*onClick={() => Router.push("/add")}*/}Add a company
			</div>
			<div
				className={styles.updateCompany}
				onClick={console.log("update pushed")}
			>
				Update a company
			</div>
		</div>
	);
}
