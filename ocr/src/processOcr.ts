import { ImageAnnotatorClient } from "@google-cloud/vision";
import { existsSync, mkdirSync, readdirSync, writeFileSync } from "fs";

// Use Google Cloud Vision API to perform OCR on images
export default async function processOcr() {
  const client = new ImageAnnotatorClient();

  const bills = readdirSync("images");
  for (let i = 1; i < 10; i++) {
    const bill = bills[i];
    const files = readdirSync(`images/${bill}`);
    const dir = `text/${bill}`;
    if (!existsSync(dir)) {
      mkdirSync(dir);
    }

    for (const file of files) {
      console.log(file);
      const [fileName] = file.split(".");
      const [result] = await client.documentTextDetection(
        `./images/${bill}/${file}`
      );
      const text = result.fullTextAnnotation.text;
      writeFileSync(`text/${bill}/${fileName}.txt`, text);
    }
  }
}
