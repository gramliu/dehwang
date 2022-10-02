import { Chip, Typography } from "@mui/material";
import clsx from "clsx";
import Image from "next/future/image";
import { ReactElement } from "react";
import ChipContainer from "../ChipContainer";
import styles from "./index.module.scss";

export interface Bill {
  id: string;
  billNum: string;
  title: string;
  dateFiled: string;
  significance: string;
  stances: string[];
}

interface BillRowProps {
  bill: Bill;
  className?: string;
}

function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt: string) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export default function BillRow({
  bill,
  className,
}: BillRowProps): ReactElement {
  const { id, billNum, title, dateFiled, significance, stances } = bill;

  return (
    <div className={clsx(styles.billRow, className)}>
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
      <ChipContainer chips={stances} />
    </div>
  );
}
