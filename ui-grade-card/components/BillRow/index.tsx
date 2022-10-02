import { Card, Chip, Typography } from "@mui/material";
import clsx from "clsx";
import Image from "next/future/image";
import { ReactElement, ReactNode } from "react";
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
  useCard?: boolean;
}

interface ConditionalWrapperProps {
  className?: string;
  useCard?: boolean;
  children: ReactNode;
}

export function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt: string) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function ConditionalWrapper({
  useCard,
  children,
  className,
}: ConditionalWrapperProps): ReactElement {
  if (useCard) {
    return <Card className={className}>{children}</Card>;
  } else {
    return <div className={className}>{children}</div>;
  }
}

export default function BillRow({
  bill,
  className,
  useCard = true,
}: BillRowProps): ReactElement {
  const { id, billNum, title, dateFiled, significance, stances } = bill;

  return (
    <ConditionalWrapper
      className={clsx(styles.billRow, className)}
      useCard={useCard}
    >
      <div className={styles.photo}>
        <Image
          src="/document.png"
          width={100}
          height={100}
          alt="Document icon"
        />
      </div>
      <div className={styles.description}>
        <Typography variant="h5" className={styles.billNum}>
          {billNum}
        </Typography>
        <Typography variant="h6">{toTitleCase(title)}</Typography>
        <Typography variant="subtitle1">Filed: {dateFiled}</Typography>
        <Typography variant="subtitle1" fontWeight="bold">
          {significance}
        </Typography>
      </div>
      <ChipContainer chips={stances} />
    </ConditionalWrapper>
  );
}