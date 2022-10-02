import { Button, Typography } from "@mui/material";
import type { NextPage } from "next";
import Image from "next/future/image";
import BaseLayout from "../../components/BaseLayout";
import { useState } from "react";
import Link from "next/link";
import styles from "../../styles/Game.module.scss";

const Game: NextPage = () => {
  const [started, setStarted] = useState(false);

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
        {started ? null : (
          <Button onClick={(e) => setStarted(true)} variant="contained">
            Start Game
          </Button>
        )}
      </div>
    </BaseLayout>
  );
};

export default Game;
