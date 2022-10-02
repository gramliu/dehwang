import { Typography } from "@mui/material";
import axios from "axios";
import type { NextPage } from "next";
import Image from "next/future/image";
import BaseLayout from "../../components/BaseLayout";
import BillRow, { Bill } from "../../components/BillRow";
import StancesContainer from "../../components/ChipContainer";
import Header from "../../components/Header";
import styles from "../../styles/Politician.module.scss";

const PoliticianPage: NextPage = ({ politician, bills, stances }: any) => {
  const { name, picUrl, role, location, billsAuthored } = politician;

  return (
    <BaseLayout>
      <Header />
      <div className={styles.container}>
        <div className={styles.profile}>
          <Image src={picUrl} height={210} width={150} alt={name} />
          <br />
          <Typography variant="h4" fontWeight="bold">
            {name}
          </Typography>
          <Typography variant="subtitle1">{role}</Typography>
          <Typography variant="subtitle1">{location}</Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            {bills.length} bills authored
          </Typography>
          <StancesContainer stances={stances} centered />
        </div>
        <Typography
          variant="h3"
          fontWeight="bold"
          className={styles.sectionHeader}
        >
          Bills
        </Typography>
        <div className={styles.bills}>
          {bills.map((bill: Bill, idx: number) => (
            <BillRow bill={bill} key={idx} className={styles.bill} />
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
  const res = await axios.get(`${process.env.BACKEND_URL}/politician/${id}`);
  const { politician, bills, stances } = res.data;
  const mappedBills = bills.map((entry: any) => entry.bill);
  return {
    props: { politician, bills: mappedBills, stances },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export default PoliticianPage;
