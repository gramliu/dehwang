import { Chip, Typography } from "@mui/material";
import { style } from "@mui/system";
import Image from "next/future/image";
import { ReactElement } from "react";
import styles from "./index.module.scss";

interface Bill {
  id: string;
  billNum: string;
  title: string;
  dateFiled: string;
  significance: string;
  stances: string[];
}

interface BillRowProps {
  bill: Bill;
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export default function BillRow({ bill }: BillRowProps): ReactElement {
  const { id, billNum, title, dateFiled, significance, stances } = bill;

  return (
    <div className={styles.billRow}>
      <div className={styles.photo}>
        <Image src="/document.png" width={64} height={64} alt="Document icon" />
      </div>
      <div className={styles.description}>
        <Typography variant="h5" className={styles.billNum}>
          {billNum}
        </Typography>
        <Typography variant="h6">{toTitleCase(title)}</Typography>
        <Typography variant="subtitle1">Filed: {dateFiled}</Typography>
        <Typography variant="subtitle1">{significance}</Typography>
      </div>
      <div className={styles.stances}>
        {stances.map((stance) => (
          <Chip key={stance} variant="outlined" label={stance} clickable />
        ))}
      </div>
    </div>
  );
}
