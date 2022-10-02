import { Chip } from "@mui/material";
import { ReactElement } from "react";
import styles from "./index.module.scss";
import clsx from "clsx";

interface ChipContainerProps {
  chips: string[];
  centered?: boolean;
}

export default function ChipContainer({
  chips,
  centered = false,
}: ChipContainerProps): ReactElement {
  return (
    <div
      className={clsx(
        styles.chipContainer,
        centered ? styles.chipCentered : styles.chipLeft
      )}
    >
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
