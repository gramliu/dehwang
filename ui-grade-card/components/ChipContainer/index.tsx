import { Chip } from "@mui/material";
import { ReactElement } from "react";
import styles from "./index.module.scss";

interface ChipContainerProps {
  chips: string[];
}

export default function ChipContainer({
  chips,
}: ChipContainerProps): ReactElement {
  return (
    <div className={styles.chipContainer}>
      {chips.map((chip, index) => (
        <Chip
          key={index}
          label={chip}
          variant="outlined"
          clickable
          component="a"
          href={`/stance/${index}`}
        />
      ))}
    </div>
  );
}
