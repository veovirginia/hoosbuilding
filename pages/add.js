import { prisma } from "../lib/prisma.js";
import Router from "next/router";
import React, { useState } from "react";
import styles from "../styles/AddCompany.module.css";
import CustomListbox from "../components/CustomListbox.js";
import { useEffect } from "react";

export const getStaticProps = async () => {
	var categories = await prisma.category.findMany();

	return { props: { categories } };
};

const stages = [
	{ id: "cl36sm4qe0013xitpinimct0t", name: "Idea" },
	{
		id: "cl36smhn30036xitpcw3ywn0t",
		name: "Pre-Institutional Funding",
	},
	{
		id: "cl36sn2k80081xitpkach7tpb",
		name: "Institutional Funding or Profitable",
	},
	{ id: "cl36snm5i0126xitpgdvyf1uy", name: "Exited/IPO" },
	{ id: "cl36snrcv0149xitp9watb5bw", name: "Dissolved" },
];

function generateJSONOfYears(since, to) {
	var max = new Date().getFullYear() + to;
	var min = since;
	console.log("max: " + max);
	console.log("min: " + min);
	var years = [];

	for (var i = max; i >= min; i--) {
		years.push(i);
	}

	var toReturn = [];
	for (var i in years) {
		toReturn.push({ id: years[i], name: years[i] });
	}

	console.log(toReturn);

	return toReturn;
}

export default function Add(props) {
	const [name, setName] = useState("");
	const [url, setCompanyURL] = useState("");
	const [description, setDescription] = useState("");
	const [founding_year, setFoundingYear] = useState("");
	const [location, setLocation] = useState("");
	const [category, setCategory] = useState("");
	const [funding_stage, setFundingStage] = useState("");

	const [founder_name, setFounderName] = useState("");
	const [founder_grad_year, setFounderGradYear] = useState("");
	const [founder_url, setFounderURL] = useState("");

	const [canSubmit, setCanSubmit] = useState(false);

	useEffect(() => {
		if (name !== "" && url !== "" && description !== "" && founding_year !== "" && location !== "" && category !== "" && funding_stage !== "" && founder_name !== "" && founder_grad_year !== "" && founder_url !== "") {
			setCanSubmit(true);
		}
	}, [name, url, description, founding_year, location, category, funding_stage, founder_name, founder_grad_year, founder_url]);

	// function that gets the id of a stage given the name
	const getStageId = (name) => {
		for (var i = 0; i < stages.length; i++) {
			if (stages[i].name === name) {
				return stages[i].id;
			}
		}
	}

	//function that gets the id of a category given the name
	const getCategoryId = (name) => {
		for (var i = 0; i < props.categories.length; i++) {
			if (props.categories[i].name === name) {
				return props.categories[i].id;
			}
		}
	}

	const submitData = async () => {
		if (!canSubmit) {
			return;
		}

		const stageId = getStageId(funding_stage);
		const categoryId = getCategoryId(category);

		try {
			const body = {
				name,
				url,
				description,
				founding_year,
				location,
				categoryId,
				stageId,
				founder_name,
				founder_grad_year,
				founder_url,
			};
			await fetch("/api/add", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
			//   .then(fetch('api/founder', {
			//     method: 'POST',
			//     headers: { 'Content-Type': 'application/json' },
			//     body: JSON.stringify(body),
			//   }))
			props.handleSuccess()
		} catch (error) {
			console.error(error);
		}
	};

	function handleFundingChange(e) {
		setFundingStage(e);
	}

	function handleCategoryChange(e) {
		setCategory(e);
	}

	function handleYearChange(e) {
		setFoundingYear(e);
	}

	function handleGradYearChange(e) {
		setFounderGradYear(e);
	}



	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Add a company</h1>
			<div className={styles.inputSection}>
				<div className={styles.inputGroup}>
					<label className={styles.inputLabel}>
						<b>Company Name</b>
					</label>
					<input
						className={styles.formInput}
						onChange={(e) => setName(e.target.value)}
					></input>
				</div>
				<div className={styles.inputGroup} id={styles.companyURL}>
					<label className={styles.inputLabel}>
						<b>Company URL</b>
					</label>
					<input
						className={styles.formInput}
						onChange={(e) => setCompanyURL(e.target.value)}
					></input>
				</div>
			</div>
			<div className={styles.labelGroup}>
				<label className={styles.inputLabel}>
					<b>Company Description</b>
				</label>
				<label className={styles.labelSubtitle}>
					(e.g. This company is building the first...)
				</label>
			</div>
			<input
				className={styles.formInput}
				onChange={(e) => setDescription(e.target.value)}
			></input>
			<div className={styles.inputSection}>
				<div className={styles.inputGroup} id={styles.foundingYear}>
					<label className={styles.inputLabel}>
						<b>Founding Year</b>
					</label>
					<CustomListbox
						filter={handleYearChange}
						items={generateJSONOfYears(2000, 0)}
						isFiltering={true}
					/>
				</div>
				<div className={styles.inputGroup} id={styles.category}>
					<label className={styles.inputLabel}>
						<b>Category</b>
					</label>
					<CustomListbox
						filter={handleCategoryChange}
						items={props.categories}
						isFiltering={true}
					/>
				</div>
				<div className={styles.inputGroup} id={styles.fundingStage}>
					<label className={styles.inputLabel}>
						<b>Funding Stage</b>
					</label>
					<CustomListbox
						filter={handleFundingChange}
						items={stages}
						isFiltering={true}
					/>
				</div>
				<div className={styles.inputGroup} id={styles.companyLocation}>
					<label className={styles.inputLabel}>
						<b>Company Location</b>
					</label>
					<input
						className={styles.formInput}
						onChange={(e) => setLocation(e.target.value)}
					></input>
				</div>
			</div>

			<br />

			<div className={styles.inputSection}>
				<div className={styles.inputGroup} id={styles.founderName}>
					<label className={styles.inputLabel}>
						<b>Founder Name</b>
					</label>
					<input
						className={styles.formInput}
						onChange={(e) => setFounderName(e.target.value)}
					></input>
				</div>
				<div className={styles.inputGroup} id={styles.founderGradYear}>
					<label className={styles.inputLabel}>
						<b>Founder Grad Year</b>
					</label>
					<CustomListbox
						filter={handleGradYearChange}
						items={generateJSONOfYears(2000, 4)}
						isFiltering={true}
					/>
				</div>
				<div className={styles.inputGroup} id={styles.founderURL}>
					<label className={styles.inputLabel}>
						<b>Founder URL</b>
					</label>
					<input
						className={styles.formInput}
						onChange={(e) => setFounderURL(e.target.value)}
					></input>
				</div>
			</div>
			<div className={canSubmit ? styles.submitButton : styles.disabledSubmitButton} onClick={submitData}>
				Submit
			</div>
		</div>
	);
}
