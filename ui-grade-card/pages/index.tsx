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
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import BaseLayout from "../components/BaseLayout";
import BillRow from "../components/BillRow";
import PoliticianRow from "../components/PoliticianRow";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  const router = useRouter();
  const { pathname, query } = router;
  const [focused, setFocused] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (pathname === "/" && focused) {
      router.push("/search", undefined, { shallow: true });
    }
  }, [focused, pathname, router]);

  return (
    <BaseLayout>
      <div className={styles.container}>
        <Link href="/" passHref>
          <a>
            <Image src="/gavel.png" alt="Gavel" width={128} height={128} />
          </a>
        </Link>

        <Typography variant="h1" className={styles.title}>
          Pol.Lit
        </Typography>
        <TextField
          variant="outlined"
          label="Search"
          fullWidth
          placeholder="Search for a politician, topic, or bill"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
    </BaseLayout>
  );
};

export default Home;
