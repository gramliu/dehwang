import { Typography } from "@mui/material";
import Image from "next/future/image";
import Link from "next/link";
import { ReactElement } from "react";
import styles from "./index.module.scss";

export default function Header(): ReactElement {
  return (
    <div className={styles.header}>
      <Link href="/" passHref>
        <a>
          <Image src="/gavel.png" alt="Gavel" width={64} height={64} />
          <Typography variant="h4" className={styles.title}>
            Pol.Lit
          </Typography>
        </a>
      </Link>
    </div>
  );
}
