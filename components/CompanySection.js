import styles from "../styles/CompanySection.module.css";
import { useState, useEffect } from "react";

export default function CompanySection(props) {
	const [relevantCompanies, setRelevantCompanies] = useState(props.companies);

	const colorDict = {
		"Artificial Intelligence": '#FD7902',
		"Augmented / Virtual Reality": '#F37408',
		B2B: "#EB700D",
		Biomedical: "#E36C13",
		Biotech: "#DB6818",
		Community: "#D3641D",
		Consulting: "CB6022",
		Consumer: "#C35C27",
		"Developer Tools": "#BB582C",
		Diversity: "#B25431",
		Drones: "#AA5037",
		Education: "#A24C3C",
		Energy: "#9A4741",
		Enterprise: "#924346",
		Entertainment: "#8A404B",
		"Financial Services": "#813B50",
		Fintech: "#793755",
		"Food and Agriculture": "#71335B",
		Government: "#692F60",
		Hardware: "#612B65",
		Healthcare: "#59276A",
		Marketplace: "#51236F",
		Media: "#491F74",
		Nonprofit: "#411B79",
		Other: "#38177F",
		"Real Estate": "#301383",
		Robotics: "#280E89",
		Science: "#200A8E",
		Security: "#180693",
		Web3: "#100298",
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
									<a href={founder.url}>
									{founder.name} ('{founder.grad_year.slice(-2)})
									</a>
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
					<div>No companies found</div>
				</div>
			)}
		</div>
	);
}
