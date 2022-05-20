import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Router from "next/router";
import { prisma } from "../lib/prisma.js";
import { GetServerSideProps } from "next";
import HeaderCompanyOptions from "../components/HeaderCompanyOptions";
import CompanySection from "../components/CompanySection";
import Filters from "../components/Filters";
import { useState } from "react";

export const getStaticProps = async () => {
	if (prisma === null) {
		return null;
	}

  var companies = [];
  var categories = [];
  // try {
    companies = await prisma.company.findMany({
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

    categories = await prisma.category.findMany();
  // } catch {
  //   console.log("error loading companies")
  //   console.log("error loading categories")
  // }

	
	console.log("categries");
	console.log(categories);

	return { props: { companies, categories } };
};

export default function Home(props) {
  const [cf, setCF] = useState('');
  const [nf, setNF] = useState('');
  const [founderf, setFounderF] = useState('');
  const [yf, setYF] = useState('');
  const [fundingf, setFundingF] = useState('');

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

	return (
		<div className={styles.container}>
			<Head>
				<title>HoosBuilding</title>
				<meta name="description" content="Generated by create next app" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚀</text></svg>"/>
			</Head>

			<main className={styles.main}>
				<div className={styles.splash}>
					<div className={styles.splashContent}>
						<div className={styles.left}>
							<div className={styles.leftText}>
								<h1 className={styles.tagline}>
									The largest community of student builders at the University of
									Virginia.
								</h1>
								<p className={styles.desc}>
									We’re bringing together the best and brightest builders in
									Charlottesville. Members have access to exclusive yada yada
									yada blah blah blah words etc. etc.
								</p>
							</div>
							<div className={styles.interestedContainer}>
								<div
									className={styles.interested}
									onClick={() => console.log("Im interested clicked")}
								>
									I'm interested
								</div>
							</div>
						</div>
						<HeaderCompanyOptions />
					</div>
				</div>
				<div className={styles.filters}>
					<Filters categories={props.categories} stages={stages} setCategoryFilter={setCF} setNameFilter={setNF} setFounderFilter={setFounderF} setYearFilter={setYF} setFundingFilter={setFundingF}/>
				</div>
				<CompanySection
					companies={props.companies}
          catFilter={props.categories.filter(c => c.name === cf)[0]}
          catFilterName={cf}
					nameFilter={nf}
					founderFilter={founderf}
					yearFilter={yf}
					fundingFilter={fundingf}
          categoriesList={props.categories}
				/>
			</main>

			<p className={styles.myFooter}>
				Managed by v1 Virginia, Inspired by GSBuilds
			</p>
		</div>
	);
}
