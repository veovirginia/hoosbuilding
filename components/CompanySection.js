import styles from "../styles/CompanySection.module.css";
import { useState, useEffect } from "react";

export default function CompanySection(props) {
	const [relevantCompanies, setRelevantCompanies] = useState(props.companies);

	const colorDict = {
		Biotech: "#ff7a00",
		Community: "#eb700d",
		Consumer: "#d7661a",
		"Developer Tools": "#c25b27",
		Diversity: "#ae5133",
		Drones: "#9a4740",
		Education: "#853d4d",
		Energy: "#71335a",
		Enterprise: "#5d2967",
		Entertainment: "#491E74",
		"Financial Services": "#351480",
		Fintech: "#200a8d",
		"Food and Agriculture": "#0c009a",
		Government: "#f8dc90",
		Hardware: "#f6d186",
		Healthcare: "#f3c57c",
		Marketplace: "#f1b873",
		Media: "#eeaa6a",
		Nonprofit: "#eb9c60",
		Other: "#e98d57",
		"Real Estate": "#e77d4f",
		Robotics: "#e46c46",
		Science: "#e15b3d",
		Security: "#df4a35",
		Web3: "#dd382d",
	};

	useEffect(() => {
		console.log(props.companies)
		setRelevantCompanies(
			props.companies
				.filter((c) =>
					c.name.toUpperCase().startsWith(props.nameFilter.toUpperCase())
				)
				.filter((c) => c.categoryID.match(props.catFilter?.id))
				.filter((c) => c.funding_stage.name.match(props.fundingFilter))
				.filter((c) => c.founding_year.match(props.yearFilter))
				.filter((c) =>
					c.founders.some((f) =>
						f.name.toUpperCase().startsWith(props.founderFilter.toUpperCase())
					)
				)
		);
	}, [
		props.nameFilter,
		props.catFilter,
		props.fundingFilter,
		props.founderFilter,
		props.yearFilter,
	]);

	return (
		<div className={styles.companyCards}>
			{relevantCompanies.map((company) => (
				<div
					key={company.id}
					className={styles.companyOuterCard}
					style={{
						backgroundColor: colorDict[company.category.name],
					}}
				>
					<div
						className={styles.categoryContainer}
						style={{
							color: colorDict[company.category.name],
						}}
					>
						<div className={styles.companyCategory}>
							{company.category.name}
						</div>
					</div>
					<div className={styles.companyInnerCard}>
						<p className={styles.companyName}><a href={company.company_url}>{company.name}</a></p>
						<div className={styles.companySubtitle}>
							{company.founding_year},{" "}
							{company.founders.map((founder) => (
								<b className={styles.companyFounder}>
									{founder.name} ('{founder.grad_year.slice(-2)})
								</b>
							))}
						</div>
						<p
							className={styles.fundingStage}
							style={{
								color:
									colorDict[
										props.categoriesList.filter((c) =>
											c.id.match(company.categoryID)
										)[0].name
									],
							}}
						>
							{company.funding_stage.name}
						</p>
						<p className={styles.description}>{company.description}</p>
					</div>
				</div>
			))}

			{relevantCompanies.length === 0 && (
				<div className={styles.noResults}>
					<p>No companies found</p>
				</div>
			)}
		</div>
	);
}
