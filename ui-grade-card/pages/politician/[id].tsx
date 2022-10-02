import { Chip, Typography } from "@mui/material";
import type { NextPage } from "next";
import Image from "next/future/image";
import { useRouter } from "next/router";
import BaseLayout from "../../components/BaseLayout";
import BillRow from "../../components/BillRow";
import ChipContainer from "../../components/ChipContainer";
import Header from "../../components/Header";
import { Politician } from "../../components/PoliticianRow";
import styles from "../../styles/Politician.module.scss";

const politician: Politician = {
  name: "Hon. Abante, Bienvenido Jr. M.",
  photoUrl:
    "https://hrep-website.s3.ap-southeast-1.amazonaws.com/members/19th/abante.jpg",
  role: "District Representative",
  location: "Manila, 6th District",
  stances: ["human rights", "local government", "education"],
  billsAuthored: 3,
};

const bills = [
  {
    id: "",
    billNum: "HB00001",
    title:
      "AN ACT PROVIDING FOR GOVERNMENT FINANCIAL INSTITUTIONS UNIFIED INITIATIVES TO DISTRESSED ENTERPRISES FOR ECONOMIC RECOVERY (GUIDE)",
    dateFiled: "2022-06-30",
    significance: "National",
    stances: ["economy recovery", "MSMEs"],
  },
  {
    id: "",
    billNum: "HB00002",
    title:
      "AN ACT PROVIDING FOR GOVERNMENT FINANCIAL INSTITUTIONS UNIFIED INITIATIVES TO DISTRESSED ENTERPRISES FOR ECONOMIC RECOVERY (GUIDE)",
    dateFiled: "2022-06-30",
    significance: "National",
    stances: ["economy recovery", "MSMEs"],
  },
];

const Stance: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { name, photoUrl, role, location, stances, billsAuthored } = politician;

  return (
    <BaseLayout>
      <Header />
      <div className={styles.container}>
        <div className={styles.profile}>
          <Image src={photoUrl} height={210} width={150} alt={name} />
          <br />
          <Typography variant="h4" fontWeight="bold">
            {name}
          </Typography>
          <Typography variant="subtitle1">{role}</Typography>
          <Typography variant="subtitle1">{location}</Typography>
          {billsAuthored ? (
            <Typography variant="subtitle1" fontWeight="bold">
              {billsAuthored} bills authored
            </Typography>
          ) : null}
          <ChipContainer chips={stances} centered />
        </div>
        <Typography
          variant="h3"
          fontWeight="bold"
          className={styles.sectionHeader}
        >
          Bills
        </Typography>
        <div className={styles.bills}>
          {bills.map((bill, idx) => (
            <BillRow bill={bill} key={idx} className={styles.bill} />
          ))}
        </div>
      </div>
    </BaseLayout>
  );
};

export default Stance;
