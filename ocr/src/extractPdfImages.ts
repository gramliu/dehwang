import { execSync } from "child_process";
import { existsSync, mkdirSync, readdirSync } from "fs";

// Extract images from pdf
export default async function extractPdfImages() {
  const pdfs = readdirSync("pdfs");
  for (const pdf of pdfs) {
    const fileName = pdf.split(".")[0];
    const dir = `images/${fileName}`;
    if (!existsSync(dir)) {
      mkdirSync(dir);
    }
    execSync(
      `convert -density 150 pdfs/${pdf} -quality 90 images/${fileName}/${fileName}-%03d.jpg`
    );
  }
}
