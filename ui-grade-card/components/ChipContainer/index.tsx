import { Chip } from "@mui/material";
import { ReactElement } from "react";
import styles from "./index.module.scss";
import clsx from "clsx";

export interface Stance {
  _id: string;
  name: string;
}

interface ChipContainerProps {
  stances: Stance[];
  centered?: boolean;
}

export default function StancesContainer({
  stances,
  centered = false,
}: ChipContainerProps): ReactElement {
  return (
    <div
      className={clsx(
        styles.chipContainer,
        centered ? styles.chipCentered : styles.chipLeft
      )}
    >
      {stances.map((stance, index) => (
        <Chip
          key={index}
          label={stance.name}
          variant="outlined"
          clickable
          component="a"
          href={`/stance/${stance._id}`}
        />
      ))}
    </div>
  );
}
