import SearchIcon from "@mui/icons-material/Search";
import {
  Chip,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";
import Image from "next/future/image";
import BaseLayout from "../components/BaseLayout";
import BillRow from "../components/BillRow";
import PoliticianRow from "../components/PoliticianRow";
import styles from "../styles/Search.module.scss";

const Home: NextPage = () => {
  return (
    <BaseLayout>
      <div className={styles.container}>
        <Image src="/gavel.png" alt="Gavel" width={128} height={128} />
        <Typography variant="h1" className={styles.title}>
          Pol.Lit
        </Typography>
        <TextField
          variant="outlined"
          label="Search"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <div className={styles.chipContainer}>
          <Chip
            label="Transparency"
            variant="outlined"
            clickable
            component="a"
            href="#transparency"
          />
          <Chip
            label="Accountability"
            variant="outlined"
            clickable
            component="a"
            href="#accountability"
          />
        </div>
        {/* Politicians section */}
        <Typography variant="h3" className={styles.sectionHeader}>
          Politicians
        </Typography>
        <div className={styles.politicians}>
          <PoliticianRow
            politician={{
              name: "Hon. Abante, Bienvenido Jr. M.",
              photoUrl:
                "https://hrep-website.s3.ap-southeast-1.amazonaws.com/members/19th/abante.jpg",
              role: "District Representative",
              location: "Manila, 6th District",
              stances: ["human rights", "local government", "education"],
            }}
          />
          <PoliticianRow
            politician={{
              name: "Hon. Abante, Bienvenido Jr. M.",
              photoUrl:
                "https://hrep-website.s3.ap-southeast-1.amazonaws.com/members/19th/abante.jpg",
              role: "District Representative",
              location: "Manila, 6th District",
              stances: ["human rights", "local government", "education"],
            }}
          />
        </div>
        {/* Bills section */}
        <Typography variant="h3" className={styles.sectionHeader}>
          Bills
        </Typography>
        <div className={styles.bills}>
          <BillRow
            bill={{
              id: "",
              billNum: "HB00001",
              title:
                "AN ACT PROVIDING FOR GOVERNMENT FINANCIAL INSTITUTIONS UNIFIED INITIATIVES TO DISTRESSED ENTERPRISES FOR ECONOMIC RECOVERY (GUIDE)",
              dateFiled: "2022-06-30",
              significance: "National",
              stances: ["economy recovery", "MSMEs"],
            }}
          />
        </div>
      </div>
    </BaseLayout>
  );
};

export default Home;
