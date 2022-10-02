import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Typography,
} from "@mui/material";
import Image from "next/future/image";
import { ReactElement, useState } from "react";
import BillRow, { Bill } from "../BillRow";
import PoliticianRow, { Politician } from "../PoliticianRow";
import styles from "./index.module.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface PoliticianAccordionProps {
  politician: Politician;
  bills: Bill[];
}

export default function PoliticianAccordion({
  politician,
  bills,
}: PoliticianAccordionProps): ReactElement {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <PoliticianRow politician={politician} useCard={false} />
      </AccordionSummary>
      <AccordionDetails>
        <div className={styles.bills}>
          {bills.map((bill, idx) => (
            <BillRow
              key={idx}
              bill={bill}
              className={styles.bill}
              useCard={false}
            />
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
