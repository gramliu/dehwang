import axios from "axios";
import { createWriteStream } from "fs";

const BASE_URL =
  "https://hrep-website.s3.ap-southeast-1.amazonaws.com/legisdocs/basic_19";

function pad(n: number, length: number) {
  const numString = new String(n);
  const padCount = length - numString.length;
  const pad = "0".repeat(padCount);
  return pad + numString;
}

// Download House Bills from 1 - billCount
export default async function downloadPdfs(billCount: number) {
  const promises = [];
  for (let i = 1; i <= billCount; i++) {
    const paddedIdx = pad(i, 5);
    const url = `${BASE_URL}/HB${paddedIdx}.pdf`;
    console.log(url);

    promises.push(axios.get(url, { responseType: "stream" }));
  }

  const responses = await Promise.all(promises);
  for (let i = 1; i <= billCount; i++) {
    const paddedIdx = pad(i, 5);
    const response = responses[i - 1];
    const file = createWriteStream(`pdfs/HB${paddedIdx}.pdf`);
    response.data.pipe(file);
  }
}
