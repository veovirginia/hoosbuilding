import { prisma } from '../lib/prisma.js';
import Router from 'next/router';
import React, { useState } from 'react';
import styles from '../styles/AddCompany.module.css'


export const getStaticProps = async () => {
  const companies = await prisma.company.findMany(
    {where: { published: true },
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
     } );
  companies.map((item) => {
    if (item.createdAt !== null) {
      item.createdAt = item.createdAt.toString();
    }
  });

  return { props: { companies } };
};


export default function Add() {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [founding_year, setFoundingYear] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [funding_stage, setFundingStage] = useState('');

    const [founder_name, setFounderName] = useState('');
    const [founder_grad_year, setFounderGradYear] = useState('');
    const [founder_url, setFounderURL] = useState('');

    const submitData = async () => {
        try {
          const body = { name, description, founding_year, location, category, funding_stage, founder_name, founder_grad_year, founder_url };
          await fetch('/api/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          })
        //   .then(fetch('api/founder', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(body),
        //   }))
          await Router.push('/');
        } catch (error) {
          console.error(error);
        }
    };

  return (
    <div className={styles.container}>
        <div className={styles.addCompany}>
            <h2>company</h2>
            <label>name</label>
            <input onChange={(e) => setName(e.target.value)}></input>
            <label>description</label>
            <input  onChange={(e) => setDescription(e.target.value)}></input>
            <label>founding year</label>
            <input  onChange={(e) => setFoundingYear(e.target.value)}></input>
            <label>location</label>
            <input  onChange={(e) => setLocation(e.target.value)}></input>
            <label>category</label>
            <input  onChange={(e) => setCategory(e.target.value)}></input>
            <label>funding stage</label>
            <input  onChange={(e) => setFundingStage(e.target.value)}></input>
            <br/>
            <h2>founder</h2>
            <label>name</label>
            <input  onChange={(e) => setFounderName(e.target.value)}></input>
            <label>grad year</label>
            <input  onChange={(e) => setFounderGradYear(e.target.value)}></input>
            <label>url</label>
            <input  onChange={(e) => setFounderURL(e.target.value)}></input>
            <button onClick={submitData}>Submit</button>
        </div>
    </div>
  )
}
