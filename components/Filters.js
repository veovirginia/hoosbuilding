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

    const [isFiltering, setIsFiltering] = useState(false)
    const [categoryFilter, setCategoryFilter] = useState("");
    const [nameFilter, setNameFilter] = useState("");
    const [fundingFilter, setFundingFilter] = useState("");
    const [founderFilter, setFounderFilter] = useState("");
    const [yearFilter, setYearFilter] = useState("");


    function clearFilters() {
        setIsFiltering(false);
        document.getElementById("company-name").value = ""
        document.getElementById("company-founder").value = ""
        setCategoryFilter("")
        setFundingFilter("")
        setFounderFilter("")
        setYearFilter("")
        setNameFilter("")
    }

    function handleNameFilter() {
        setIsFiltering(true);
        const token = document.getElementById("company-name").value
        setNameFilter(token);
    }

    function handleFounderFilter() {
        setIsFiltering(true);
        const token = document.getElementById("company-founder").value
        setFounderFilter(token);
    }

    function handleFundingFilter(token) {
        setIsFiltering(true);
        setFundingFilter(token);
    }

    function handleYearFilter(token) {
        setIsFiltering(true);
        setYearFilter(token);
    }

    function handleCategoryFilter(token) {
        setIsFiltering(true);
        setCategoryFilter(token)
    }

    return (
        <div className={styles.filtersContainer}>
            <div className={styles.filters}>
                <div className={styles.filterGroupLeft}>
                    <div className={styles.inputLabel}>Category</div>
                    <CustomListbox filter={handleCategoryFilter} items={props.categories} isFiltering={isFiltering}/>
                </div>
                <div className={styles.filterGroupLeft}>
                    <div className={styles.inputLabel}>Company Name</div>
                    <input onChange={handleNameFilter} className={styles.input} id="company-name"></input>
                </div>
                <div className={styles.filterGroupLeft}>
                    <div className={styles.inputLabel}>Company Founder</div>
                    <input onChange={handleFounderFilter} className={styles.input} id="company-founder"></input>
                </div>
                <div className={styles.filterGroupLeft}>
                    <div className={styles.inputLabel}>Founding Year</div>
                    <CustomListbox filter={handleYearFilter} items={generateJSONOfYears(2000)} isFiltering={isFiltering}/>
                </div>
                <div className={styles.filterGroup}>
                    <div className={styles.inputLabel}>Funding Stage</div>
                    <CustomListbox filter={handleFundingFilter} items={props.stages} isFiltering={isFiltering}/>
                </div>
            </div>
            <div onClick={() => clearFilters()} className={isFiltering ? styles.clearFilters : styles.disabledClearFilters}>Clear filters</div>
        </div>
    );
}
