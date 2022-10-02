import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField, Typography } from "@mui/material";
import type { NextPage } from "next";
import Image from "next/future/image";
import Link from "next/link";
import { useRouter } from "next/router";
import BaseLayout from "../../components/BaseLayout";
import Header from "../../components/Header";
import PoliticianAccordion from "../../components/PoliticianAccordion";
import styles from "../../styles/Stance.module.scss";

const Stance: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const stance = "Transparency";

  return (
    <BaseLayout>
      <Header />
      <div className={styles.container}>
        <Typography variant="h3" className={styles.title}>
          {stance}
        </Typography>
        <div className={styles.politicians}>
          <PoliticianAccordion
            politician={{
              name: "Hon. Abante, Bienvenido Jr. M.",
              picUrl:
                "https://hrep-website.s3.ap-southeast-1.amazonaws.com/members/19th/abante.jpg",
              role: "District Representative",
              location: "Manila, 6th District",
              stances: ["human rights", "local government", "education"],
              billsAuthored: 10,
            }}
            bills={[
              {
                id: "",
                billNum: "HB00001",
                title:
                  "AN ACT PROVIDING FOR GOVERNMENT FINANCIAL INSTITUTIONS UNIFIED INITIATIVES TO DISTRESSED ENTERPRISES FOR ECONOMIC RECOVERY (GUIDE)",
                dateField: "2022-06-30",
                significance: "National",
                stances: ["economy recovery", "MSMEs"],
              },
              {
                id: "",
                billNum: "HB00002",
                title:
                  "AN ACT PROVIDING FOR GOVERNMENT FINANCIAL INSTITUTIONS UNIFIED INITIATIVES TO DISTRESSED ENTERPRISES FOR ECONOMIC RECOVERY (GUIDE)",
                dateField: "2022-06-30",
                significance: "National",
                stances: ["economy recovery", "MSMEs"],
              },
            ]}
          />
          <PoliticianAccordion
            politician={{
              name: "Hon. Abante, Bienvenido Jr. M.",
              picUrl:
                "https://hrep-website.s3.ap-southeast-1.amazonaws.com/members/19th/abante.jpg",
              role: "District Representative",
              location: "Manila, 6th District",
              stances: ["human rights", "local government", "education"],
              billsAuthored: 3,
            }}
            bills={[
              {
                id: "",
                billNum: "HB00001",
                title:
                  "AN ACT PROVIDING FOR GOVERNMENT FINANCIAL INSTITUTIONS UNIFIED INITIATIVES TO DISTRESSED ENTERPRISES FOR ECONOMIC RECOVERY (GUIDE)",
                dateField: "2022-06-30",
                significance: "National",
                stances: ["economy recovery", "MSMEs"],
              },
              {
                id: "",
                billNum: "HB00002",
                title:
                  "AN ACT PROVIDING FOR GOVERNMENT FINANCIAL INSTITUTIONS UNIFIED INITIATIVES TO DISTRESSED ENTERPRISES FOR ECONOMIC RECOVERY (GUIDE)",
                dateField: "2022-06-30",
                significance: "National",
                stances: ["economy recovery", "MSMEs"],
              },
            ]}
          />
        </div>
      </div>
    </BaseLayout>
  );
};

export default Stance;
