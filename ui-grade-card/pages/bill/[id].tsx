import { Typography } from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import BaseLayout from "../../components/BaseLayout";
import { Bill, toTitleCase } from "../../components/BillRow";
import StancesContainer from "../../components/ChipContainer";
import Header from "../../components/Header";
import styles from "../../styles/Bill.module.scss";
import axios from "axios";
import PoliticianRow, { Politician } from "../../components/PoliticianRow";

const BillPage: NextPage = ({ bill, politicians }: any) => {
  const { billNum, title, dateFiled, significance, stances } = bill;

  const mapped = politicians.map((politician: any) => ({
    ...politician,
    ...politician["author"],
  }));

  const primary = mapped.filter(
    (politician: Politician) => politician.authorType === "PRINCIPAL"
  );
  const secondary = mapped.filter(
    (politician: Politician) => politician.authorType === "SECONDARY"
  );

  return (
    <BaseLayout>
      <Header />
      <div className={styles.container}>
        <div className={styles.profile}>
          <Typography variant="h4" fontWeight="bold">
            {billNum}
          </Typography>
          <div className={styles.titleWrapper}>
            <Typography variant="h5">{toTitleCase(title)}</Typography>
          </div>
          <Typography variant="subtitle1">Filed: {dateFiled}</Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            {significance}
          </Typography>
          <StancesContainer stances={stances} centered />
        </div>
        <Typography variant="h3" className={styles.sectionHeader}>
          Principal Authors
        </Typography>
        <div className={styles.authors}>
          {primary.map((politician: Politician, idx: number) => (
            <PoliticianRow key={idx} politician={politician} />
          ))}
        </div>
        <Typography variant="h3" className={styles.sectionHeader}>
          Co-authors
        </Typography>
        <div className={styles.authors}>
          {secondary.map((politician: Politician, idx: number) => (
            <PoliticianRow key={idx} politician={politician} />
          ))}
        </div>
      </div>
    </BaseLayout>
  );
};

interface StaticProps {
  params: Record<string, string>;
}

export async function getStaticProps({ params }: StaticProps) {
  const { id } = params;
  const res = await axios.get(`${process.env.BACKEND_URL}/bill/${id}`);
  const { bill, politicians } = res.data;
  return {
    props: { bill, politicians },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export default BillPage;
