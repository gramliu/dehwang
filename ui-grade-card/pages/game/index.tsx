import { Button, Card, Grid, Typography } from "@mui/material";
import type { NextPage } from "next";
import Image from "next/future/image";
import BaseLayout from "../../components/BaseLayout";
import { useState } from "react";
import Link from "next/link";
import styles from "../../styles/Game.module.scss";

const questions = [
  {
    summary:
      "The Department of Health (DOH) is seeking to set up a Medical Reserve Corps (MRC) to provide medical support in the event of a national or local health emergency. A bill has been filed in the House of Representatives to establish a Medical Reserve Corps (MRC) to augment the country's human health resources in times of disasters and public health emergencies. President Rodrigo Duterte has signed into law the 'Medical Reserve Corps Act.' The Department of Health (DOH) has set up the Medical Response Corps (MRC) to respond to disasters and other health emergencies in the country. The Department of Health (DOH) is hereby empowered to: All graduates of public and private colleges, universities and learning institutions covered under this Act are required to register with the Department of Health (DOH) as a member of the Medical Reserve Corps (MRC). The Department of Health (DOH) and the Armed Forces of the Philippines (AFP) have issued the following rules and regulations on the Mobilization of the Medical Reserve Corps (MRC).",
    billName:
      "AN ACT INSTITUTING THE MEDICAL RESERVE CORPS AND APPROPRIATING FUNDS THEREFOR",
    question: "What is the primary issue discussed in this extract?",
    choices: [
      "Healthcare",
      "Technology",
      "Economic Recovery",
      "Foreign Policy",
    ],
    answer: 0,
  },
  {
    summary:
      "The Department of Health (DOH) is seeking to set up a Medical Reserve Corps (MRC) to provide medical support in the event of a national or local health emergency. A bill has been filed in the House of Representatives to establish a Medical Reserve Corps (MRC) to augment the country's human health resources in times of disasters and public health emergencies. President Rodrigo Duterte has signed into law the 'Medical Reserve Corps Act.' The Department of Health (DOH) has set up the Medical Response Corps (MRC) to respond to disasters and other health emergencies in the country. The Department of Health (DOH) is hereby empowered to: All graduates of public and private colleges, universities and learning institutions covered under this Act are required to register with the Department of Health (DOH) as a member of the Medical Reserve Corps (MRC). The Department of Health (DOH) and the Armed Forces of the Philippines (AFP) have issued the following rules and regulations on the Mobilization of the Medical Reserve Corps (MRC).",
    billName:
      "AN ACT INSTITUTING THE MEDICAL RESERVE CORPS AND APPROPRIATING FUNDS THEREFOR",
    question: "Which stance is closest to that taken by this bill?",
    choices: [
      "Economic Growth",
      "Healthcare Infrastructure",
      "Inflation reduction",
      "Technology Adoption",
    ],
    answer: 1,
  },
  {
    summary:
      "(a) The Centers for Disease Control and Prevention (CDC) of the Department of Health (DOH) shall, in consultation with the DOH and other concerned agencies of government and the private sector as may be necessary, create or abolish units, offices, or Centers as needed to carry out all provisions of The Department of Health (DOH) and the Center for Disease Control and Prevention (CDC) of the Department of Science and Technology (DST) are hereby established to: The Center for Disease Control (CDC) of the Department of Health (DOH) shall be the technical authority on all matters regarding disease prevention and control. The Center for Disease Control (CDC) of the Department of Health (DOH) shall establish and operate the National Reference Laboratory (NRL). (a) The Department of Health (DOH) and the Civil Service Commission (CSC) shall establish a Centers for Disease Control and Prevention (CDC) within the DOH. The Centers for Disease Control and Prevention (CDC) of the US Department of Health and Human Services (DHHS) is charged with the following: The Centers for Disease Control and Prevention (CDC) shall be responsible for the following: The Centers for Disease Prevention and Control (CDC) of the Department of Health (DOH) shall have the following: All laws, orders, rules, and regulations or other issuances or parts thereof inconsistent with the provisions of this Act are hereby repealed or modified accordingly. This is a summary of the Philippine Center for Disease SEC Act of 2010. The Philippine Center for Disease Prevention and Control (CDC) is hereby created as an attached agency to the Department of Health (DOH) for policy and program coordination The 'proposed Philippine Center for Disease Prevention and Control (CDC) Act' is a consolidation of thirteen (13) House Bills establishing the CDC that were referred to the Committee on Health in the 18th Congress. The Department of Health (DOH) in the Philippines has proposed the creation of the Center for Disease Control (CDC).",
    billName:
      "AN ACT PROVIDING FOR THE MODERNIZATION OF THE PUBLIC HEALTH EMERGENCY PREPAREDNESS AND RESPONSE CAPABILITIES, ESTABLISHING FOR THIS PURPOSE THE CENTER FOR DISEASE PREVENTION AND CONTROL, AND APPROPRIATING FUNDS THEREFOR",
    question: "What is the primary issue discussed in this extract?",
    choices: [
      "Healthcare",
      "Technology",
      "Economic Recovery",
      "Foreign Policy",
    ],
    answer: 0,
  },
  {
    summary:
      "(a) The Centers for Disease Control and Prevention (CDC) of the Department of Health (DOH) shall, in consultation with the DOH and other concerned agencies of government and the private sector as may be necessary, create or abolish units, offices, or Centers as needed to carry out all provisions of The Department of Health (DOH) and the Center for Disease Control and Prevention (CDC) of the Department of Science and Technology (DST) are hereby established to: The Center for Disease Control (CDC) of the Department of Health (DOH) shall be the technical authority on all matters regarding disease prevention and control. The Center for Disease Control (CDC) of the Department of Health (DOH) shall establish and operate the National Reference Laboratory (NRL). (a) The Department of Health (DOH) and the Civil Service Commission (CSC) shall establish a Centers for Disease Control and Prevention (CDC) within the DOH. The Centers for Disease Control and Prevention (CDC) of the US Department of Health and Human Services (DHHS) is charged with the following: The Centers for Disease Control and Prevention (CDC) shall be responsible for the following: The Centers for Disease Prevention and Control (CDC) of the Department of Health (DOH) shall have the following: All laws, orders, rules, and regulations or other issuances or parts thereof inconsistent with the provisions of this Act are hereby repealed or modified accordingly. This is a summary of the Philippine Center for Disease SEC Act of 2010. The Philippine Center for Disease Prevention and Control (CDC) is hereby created as an attached agency to the Department of Health (DOH) for policy and program coordination The 'proposed Philippine Center for Disease Prevention and Control (CDC) Act' is a consolidation of thirteen (13) House Bills establishing the CDC that were referred to the Committee on Health in the 18th Congress. The Department of Health (DOH) in the Philippines has proposed the creation of the Center for Disease Control (CDC).",
    billName:
      "AN ACT PROVIDING FOR THE MODERNIZATION OF THE PUBLIC HEALTH EMERGENCY PREPAREDNESS AND RESPONSE CAPABILITIES, ESTABLISHING FOR THIS PURPOSE THE CENTER FOR DISEASE PREVENTION AND CONTROL, AND APPROPRIATING FUNDS THEREFOR",
    question: "Which stance is closest to that taken by this bill?",
    choices: [
      "Veteran support",
      "Economic Growth",
      "Emergency Preparedness",
      "Public Health Investment",
    ],
    answer: 3,
  },
];

const Game: NextPage = () => {
  const [started, setStarted] = useState(false);
  const [currQuestion, setCurrQuestion] = useState(0);

  return (
    <BaseLayout>
      <div className={styles.container}>
        <Link href="/" passHref>
          <a>
            <Image src="/gavel.png" alt="Gavel" width={128} height={128} />
          </a>
        </Link>
        <Typography variant="h1" className={styles.title}>
          Poll.it
        </Typography>
        {started ? (
          <div>
            <Typography variant="h4" align="left" marginBottom={4}>
              {questions[currQuestion].question}
            </Typography>
            <Card>
              <Typography variant="subtitle1" marginBottom={4} marginTop={4}>
                {questions[currQuestion].billName}
              </Typography>
              <Typography marginX={2} marginY={2}>
                {questions[currQuestion].summary}
              </Typography>
            </Card>
            <Grid container spacing={3} marginTop={4}>
              {questions[currQuestion].choices.map((choice, index) => (
                <Grid item xs={12} md={6} key="choice">
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={(e) => {
                      if (index == questions[currQuestion].answer) {
                        alert("Correct. Let's move on to the next question");
                        setCurrQuestion((currQuestion + 1) % 4);
                      } else {
                        alert("Your answer wasn't quite right. Keep trying :)");
                      }
                    }}
                  >
                    {choice}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </div>
        ) : (
          <Button onClick={(e) => setStarted(true)} variant="contained">
            Start Game
          </Button>
        )}
      </div>
    </BaseLayout>
  );
};

export default Game;
