import styles from "../styles/Filters.module.css";
import CustomListbox from "./CustomListbox";
import { useState } from "react";

//prereq: since should be an integer from before the current year
function generateJSONOfYears(since) {
    var max = new Date().getFullYear()
    var min = since
    console.log("max: " + max)
    console.log("min: " + min)
    var years = []
  
    for (var i = max; i >= min; i--) {
      years.push(i)
    }
    

    var toReturn = []
    for (var i in years) {
        toReturn.push({id: years[i], name: years[i]})
    }

    console.log(toReturn)

    return toReturn
}

export default function Filters(props) {

    const [isFiltering, setIsFiltering] = useState(false);

    function clearFilters() {
        document.getElementById("company-name").value = ""
        document.getElementById("company-founder").value = ""
    }

    function canClearFilters() {
        return true;
    }

    return (
        <div className={styles.filtersContainer}>
            <div className={styles.filters}>
                <div className={styles.filterGroupLeft}>
                    <div className={styles.inputLabel}>Category</div>
                    <CustomListbox items={props.categories}/>
                </div>
                <div className={styles.filterGroupLeft}>
                    <div className={styles.inputLabel}>Company Name</div>
                    <input className={styles.input} id="company-name"></input>
                </div>
                <div className={styles.filterGroupLeft}>
                    <div className={styles.inputLabel}>Company Founder</div>
                    <input className={styles.input} id="company-founder"></input>
                </div>
                <div className={styles.filterGroupLeft}>
                    <div className={styles.inputLabel}>Founding Year</div>
                    <CustomListbox items={generateJSONOfYears(2000)}/>
                </div>
                <div className={styles.filterGroup}>
                    <div className={styles.inputLabel}>Funding Stage</div>
                    <CustomListbox items={props.stages}/>
                </div>
            </div>
            <div onClick={() => clearFilters()} className={isFiltering ? styles.clearFilters : styles.disabledClearFilters}>Clear filters</div>
        </div>
    );
}
