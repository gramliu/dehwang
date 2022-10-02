import { Card, Chip, Typography } from "@mui/material";
import Image from "next/future/image";
import Link from "next/link";
import { ReactElement } from "react";
import { ConditionalWrapper } from "../BillRow";
import StancesContainer, { Stance } from "../ChipContainer";
import styles from "./index.module.scss";

export interface Politician {
  _id?: string;
  id?: string;
  name: string;
  picUrl: string;
  role: string;
  location: string;
  stances?: Stance[];
  billsAuthored?: number;
  authorType?: "PRINCIPAL" | "SECONDARY";
}

interface PoliticianRowProps {
  politician: Politician;
  useCard?: boolean;
}

export default function PoliticianRow({
  politician,
  useCard = true,
}: PoliticianRowProps): ReactElement {
  const {
    _id: id,
    name,
    picUrl,
    role,
    location,
    stances,
    billsAuthored,
  } = politician;

  return (
    <ConditionalWrapper useCard={useCard} className={styles.politicianRow}>
      <div className={styles.photo}>
        <Link href={`/politician/${id ?? 1}`}>
          <a>
            <Image src={picUrl} alt={name} height={140} width={100} />
          </a>
        </Link>
      </div>
      <div className={styles.description}>
        <Link href={`/politician/${id ?? 1}`}>
          <a className={styles.nameLink}>
            <Typography variant="h5" fontWeight="bold">
              {name}
            </Typography>
          </a>
        </Link>
        <Typography variant="subtitle1">{role}</Typography>
        <Typography variant="subtitle1">{location}</Typography>
        {billsAuthored ? (
          <Typography variant="subtitle1" fontWeight="bold">
            {billsAuthored} bills authored
          </Typography>
        ) : null}
      </div>
      {stances != null ? <StancesContainer stances={stances} /> : null}
    </ConditionalWrapper>
  );
}
