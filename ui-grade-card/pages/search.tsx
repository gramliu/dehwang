import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField, Typography } from "@mui/material";
import axios from "axios";
import type { NextPage } from "next";
import Image from "next/future/image";
import Link from "next/link";
import { useState } from "react";
import BaseLayout from "../components/BaseLayout";
import BillRow from "../components/BillRow";
import StancesContainer from "../components/ChipContainer";
import PoliticianRow from "../components/PoliticianRow";
import styles from "../styles/Search.module.scss";

const Search: NextPage = () => {
  const [focused, setFocused] = useState(false);
  const [searchText, setSearchText] = useState(null);
  const [loading, setLoading] = useState(false);

  const [stances, setStances] = useState([]);
  const [politicians, setPoliticians] = useState([]);
  const [bills, setBills] = useState([]);

  async function search(query: string) {
    setLoading(true);
    const result = await axios.get(`${process.env.BACKEND_URL}/search`, {
      params: { query },
    });
    const { bills, politicians, stances } = result.data;
    const mappedBills = bills.map((entry: any) => entry.bill);
    setBills(mappedBills);
    setPoliticians(politicians);
    setStances(stances);

    setLoading(false);
  }

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
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              search(searchText);
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        {stances.length > 0 ? <StancesContainer stances={stances} /> : null}
        {/* Politicians section */}
        {politicians.length > 0 ? (
          <>
            <Typography variant="h3" className={styles.sectionHeader}>
              Politicians
            </Typography>
            <div className={styles.politicians}>
              {politicians.map((politician, idx) => (
                <PoliticianRow key={idx} politician={politician} />
              ))}
            </div>
          </>
        ) : null}

        {/* Bills section */}
        {bills.length > 0 ? (
          <>
            <Typography variant="h3" className={styles.sectionHeader}>
              Bills
            </Typography>
            <div className={styles.bills}>
              {bills.map((bill, idx) => (
                <BillRow key={idx} bill={bill} />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </BaseLayout>
  );
};

export default Search;
