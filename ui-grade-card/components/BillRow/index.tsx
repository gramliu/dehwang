import { Card, Typography } from "@mui/material";
import clsx from "clsx";
import Image from "next/future/image";
import Link from "next/link";
import { ReactElement, ReactNode } from "react";
import StancesContainer, { Stance } from "../ChipContainer";
import styles from "./index.module.scss";
import { DateTime } from "luxon";

export interface Bill {
  id: string;
  billNum: string;
  title: string;
  dateField: string;
  significance: string;
  stances: Stance[];
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
  const { id, billNum, title, dateField, significance, stances } = bill;

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
        <Link href={`/bill/${id || 1}`}>
          <a className={styles.nameLink}>
            <Typography variant="h5" className={styles.billNum}>
              {billNum}
            </Typography>
          </a>
        </Link>
        <Typography variant="h6">{toTitleCase(title)}</Typography>
        <Typography variant="subtitle1">
          Filed: {DateTime.fromISO(dateField).toFormat("MMM dd, yyyy")}
        </Typography>
        <Typography variant="subtitle1" fontWeight="bold">
          {significance}
        </Typography>
      </div>
      <StancesContainer stances={stances} />
    </ConditionalWrapper>
  );
}
