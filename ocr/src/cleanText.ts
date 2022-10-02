import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "fs";

const lenThreshold = 70;

function shouldKeepLine(line: string, index: number, lines: string[]) {
  const len = line.length;
  const numOnes = line.split("1");
  const numTwos = line.split("2");
  return (
    numOnes.length < 5 &&
    numTwos.length < 5 &&
    (len > lenThreshold ||
      (line.charAt(len - 1) == "." &&
        index > 0 &&
        lines[index - 1].length > lenThreshold))
  );
}

export default function cleanText() {
  const bills = readdirSync(`text`);

  for (const bill of bills) {
    const files = readdirSync(`text/${bill}`);

    if (!existsSync(`clean/${bill}`)) {
      mkdirSync(`clean/${bill}`);
    }

    for (const file of files) {
      const fileRead = readFileSync(`text/${bill}/${file}`, "utf-8");
      const newFile = fileRead
        .split(/\r?\n/)
        .filter(shouldKeepLine)
        .join("\r\n");

      writeFileSync(`clean/${bill}/cleaned_${file}`, newFile);
    }
  }
}
