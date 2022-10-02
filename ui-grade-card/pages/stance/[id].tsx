import { Typography } from "@mui/material";
import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import BaseLayout from "../../components/BaseLayout";
import { toTitleCase } from "../../components/BillRow";
import Header from "../../components/Header";
import PoliticianAccordion from "../../components/PoliticianAccordion";
import { Politician } from "../../components/PoliticianRow";
import styles from "../../styles/Stance.module.scss";

const Stance: NextPage = ({ topAuthors, bills, stance }: any) => {
  return (
    <BaseLayout>
      <Header />
      <div className={styles.container}>
        <Typography variant="h3" className={styles.title}>
          {toTitleCase(stance.name)}
        </Typography>
        <div className={styles.politicians}>
          {topAuthors.map((politician: Politician, idx: number) => (
            <PoliticianAccordion
              key={idx}
              politician={politician}
              bills={bills}
            />
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
  const res = await axios.get(`${process.env.BACKEND_URL}/stance/${id}`);
  const { topAuthors, bills, stance } = res.data;
  return {
    props: { topAuthors, bills, stance },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export default Stance;
