import styles from '../styles/CompanySection.module.css'

export default function CompanySection(props) {
    return (
        <div className={styles.companyCards}>
            {props.companies.map((company) => (
            <div key={company.id} className={styles.companyOuterCard}>
              <div className={styles.companyInnerCard}>
                <p className={styles.companyName}>{company.name}</p>
                <div className={styles.companySubtitle}>
                  {company.founding_year},{' '}
                  {company.founders.map((founder) => (
                    <p className={styles.companyFounder}>{founder.name} ('{founder.grad_year.slice(-2)})</p>
                  ))}
                </div>
                <p className={styles.fundingStage}>{company.funding_stage.name}</p>
                <p className={styles.description}>{company.description}</p>
              </div>
            </div>
          ))}
        </div>
    )
}