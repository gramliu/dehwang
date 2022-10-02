import { Typography } from "@mui/material";
import type { NextPage } from "next";
import BaseLayout from "../../components/BaseLayout";
import { Bill, toTitleCase } from "../../components/BillRow";
import ChipContainer from "../../components/ChipContainer";
import Header from "../../components/Header";
import styles from "../../styles/Bill.module.scss";

const bill: Bill = {
  id: "",
  billNum: "HB00001",
  title:
    "AN ACT PROVIDING FOR GOVERNMENT FINANCIAL INSTITUTIONS UNIFIED INITIATIVES TO DISTRESSED ENTERPRISES FOR ECONOMIC RECOVERY (GUIDE)",
  dateFiled: "2022-06-30",
  significance: "National",
  stances: ["economy recovery", "MSMEs"],
};

const BillPage: NextPage = () => {
  const { id, billNum, title, dateFiled, significance, stances } = bill;

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
          <ChipContainer chips={stances} centered />
        </div>
      </div>
    </BaseLayout>
  );
};

export default BillPage;
