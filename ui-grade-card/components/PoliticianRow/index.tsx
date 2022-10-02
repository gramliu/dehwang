import { Chip, Typography } from "@mui/material";
import Image from "next/future/image";
import { ReactElement } from "react";
import styles from "./index.module.scss";

export interface Politician {
  name: string;
  photoUrl: string;
  role: string;
  location: string;
  stances: string[];
  billsAuthored?: number;
}

interface PoliticianRowProps {
  politician: Politician;
}

export default function PoliticianRow({
  politician,
}: PoliticianRowProps): ReactElement {
  const { name, photoUrl, role, location, stances, billsAuthored } = politician;

  return (
    <div className={styles.politicianRow}>
      <div className={styles.photo}>
        <Image src={photoUrl} alt={name} height={140} width={100} />
      </div>
      <div className={styles.description}>
        <Typography variant="h5">{name}</Typography>
        <Typography variant="subtitle1">{role}</Typography>
        <Typography variant="subtitle1">{location}</Typography>
        {billsAuthored ? (
          <Typography variant="subtitle1" fontWeight="bold">
            {billsAuthored} bills authored
          </Typography>
        ) : null}
      </div>
      <div className={styles.stances}>
        {stances.map((stance) => (
          <Chip key={stance} variant="outlined" label={stance} clickable />
        ))}
      </div>
    </div>
  );
}
