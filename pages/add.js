import { prisma } from "../lib/prisma.js";
import Router from "next/router";
import React, { useState } from "react";
import styles from "../styles/AddCompany.module.css";

export const getStaticProps = async () => {
	const companies = await prisma.company.findMany({
		where: { published: true },
		include: {
			founders: {
				select: {
					name: true,
					grad_year: true,
					url: true,
					email: true,
				},
			},
			funding_stage: {
				select: {
					name: true,
				},
			},
		},
	});
	companies.map((item) => {
		if (item.createdAt !== null) {
			item.createdAt = item.createdAt.toString();
		}
	});

	return { props: { companies } };
};

export default function Add() {
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

	const submitData = async () => {
		try {
			const body = {
				name,
				url,
				description,
				founding_year,
				location,
				category,
				funding_stage,
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
			await Router.push("/");
		} catch (error) {
			console.error(error);
		}
	};

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
				<div className={styles.inputGroup}>
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
				<div className={styles.inputGroup}>
					<label className={styles.inputLabel}>
						<b>Founding Year</b>
					</label>
					<input
						className={styles.formInput}
						onChange={(e) => setFoundingYear(e.target.value)}
					></input>
				</div>
				<div className={styles.inputGroup}>
					<label className={styles.inputLabel}>
						<b>Company Location</b>
					</label>
					<input
						className={styles.formInput}
						onChange={(e) => setLocation(e.target.value)}
					></input>
				</div>
			</div>
			<div className={styles.inputSection}>
				<div className={styles.inputGroup}>
					<label className={styles.inputLabel}>
						<b>Category</b>
					</label>
					<input
						className={styles.formInput}
						onChange={(e) => setCategory(e.target.value)}
					></input>
				</div>
				<div className={styles.inputGroup} id={styles.email}>
					<label className={styles.inputLabel}>
						<b>Funding Stage</b>
					</label>
					<input
						className={styles.formInput}
						onChange={(e) => setFundingStage(e.target.value)}
					></input>
				</div>
			</div>

			<div className={styles.inputSection}>
				<div className={styles.inputGroup}>
					<label className={styles.inputLabel}>
						<b>Founder Name</b>
					</label>
					<input
						className={styles.formInput}
						onChange={(e) => setFounderName(e.target.value)}
					></input>
				</div>
				<div className={styles.inputGroup}>
					<label className={styles.inputLabel}>
						<b>Founder Grad Year</b>
					</label>
					<input
						className={styles.formInput}
						onChange={(e) => setFounderGradYear(e.target.value)}
					></input>
				</div>
				<div className={styles.inputGroup}>
					<label className={styles.inputLabel}>
						<b>Founder URL</b>
					</label>
					<input
						className={styles.formInput}
						onChange={(e) => setFounderURL(e.target.value)}
					></input>
				</div>
			</div>
      <button className={styles.submitButton} onClick={submitData}>Submit</button>
		</div>
	);
}
