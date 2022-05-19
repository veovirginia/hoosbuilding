import styles from "../styles/CompanySection.module.css";
import { useState, useEffect } from "react";

export default function CompanySection(props) {

  const [relevantCompanies, setRelevantCompanies] = useState(props.companies);

  
  useEffect(() => {
    setRelevantCompanies(
      props.companies
				.filter((c) =>
					c.name.toUpperCase().startsWith(props.nameFilter.toUpperCase())
				)
				.filter((c) => c.categoryID.match(props.catFilter?.id))
				.filter((c) => c.funding_stage.name.match(props.fundingFilter))
        .filter((c) => c.founding_year.match(props.yearFilter))
        .filter((c) => c.founders.some((f) => f.name.toUpperCase().startsWith(props.founderFilter.toUpperCase())))
    );
	}, [props.nameFilter, props.catFilter, props.fundingFilter, props.founderFilter, props.yearFilter]);


	return (
		<div className={styles.companyCards}>
			{relevantCompanies.map((company) => (
					<div key={company.id} className={styles.companyOuterCard}>
						<div className={styles.companyInnerCard}>
							<p className={styles.companyName}>{company.name}</p>
							<div className={styles.companySubtitle}>
								{company.founding_year},{" "}
								{company.founders.map((founder) => (
									<b className={styles.companyFounder}>
										{founder.name} ('{founder.grad_year.slice(-2)})
									</b>
								))}
							</div>
							<p className={styles.fundingStage}>
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
