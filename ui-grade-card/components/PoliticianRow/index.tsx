import { Chip, Typography } from "@mui/material";
import Image from "next/future/image";
import { ReactElement } from "react";
import styles from "./index.module.scss";

interface Politician {
  name: string;
  photoUrl: string;
  role: string;
  location: string;
  stances: string[];
}

interface PoliticianRowProps {
  politician: Politician;
}

export default function PoliticianRow({
  politician,
}: PoliticianRowProps): ReactElement {
  const { name, photoUrl, role, location, stances } = politician;

  return (
    <div className={styles.politicianRow}>
      <div className={styles.photo}>
        <Image src={photoUrl} alt={name} height={140} width={100} />
      </div>
      <div className={styles.description}>
        <Typography variant="h5">{name}</Typography>
        <Typography variant="subtitle1">{role}</Typography>
        <Typography variant="subtitle1">{location}</Typography>
      </div>
      <div className={styles.stances}>
        {stances.map((stance) => (
          <Chip key={stance} variant="outlined" label={stance} clickable />
        ))}
      </div>
    </div>
  );
}
