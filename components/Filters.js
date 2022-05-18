import styles from "../styles/Filters.module.css";
import CustomListbox from "./CustomListbox";

export default function Filters(props) {

  return (
    <div className={styles.filters}>
      <div className={styles.filterGroupLeft}>
        <div className={styles.inputLabel}>Category</div>
        <CustomListbox items={props.categories}/>
      </div>
      <div className={styles.filterGroupLeft}>
        <div className={styles.inputLabel}>Company Name</div>
        <input className={styles.input}></input>
      </div>
      <div className={styles.filterGroupLeft}>
        <div className={styles.inputLabel}>Company Founder</div>
        <input className={styles.input}></input>
      </div>
      <div className={styles.filterGroupLeft}>
        <div className={styles.inputLabel}>Founding Year</div>
        <input className={styles.input}></input>
      </div>
      <div className={styles.filterGroup}>
        <div className={styles.inputLabel}>Funding Stage</div>
        <CustomListbox items={props.stages}/>
      </div>
    </div>
  );
}
