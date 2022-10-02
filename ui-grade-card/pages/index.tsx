import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, Stack, TextField, Typography } from "@mui/material";
import type { NextPage } from "next";
import Image from "next/future/image";
import BaseLayout from "../components/BaseLayout";
import styles from "../styles/Home.module.scss";

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
        <Typography variant="h4">Trending</Typography>
      </div>
    </BaseLayout>
  );
};

export default Home;
