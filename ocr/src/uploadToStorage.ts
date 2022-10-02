import { Bucket, Storage } from "@google-cloud/storage";
import { readdirSync, readFileSync } from "fs";

const BUCKET_NAME = "pollit-hackmit";

// Upload files in images to google cloud storage bucket
export default async function uploadFiles() {
  const storage = new Storage();
  const bucket = storage.bucket(BUCKET_NAME);

  const bills = readdirSync("images");
  for (const bill of bills) {
    console.log(bill);
    const files = readdirSync(`images/${bill}`);
    for (const file of files) {
      writeFile(bucket, bill, file);
    }
  }
}

// Write a single file to the storage bucket
function writeFile(bucket: Bucket, bill: string, file: string) {
  const blob = bucket.file(`${bill}/${file}`);
  const writeStream = blob.createWriteStream();
  const fileContent = readFileSync(`images/${bill}/${file}`);

  writeStream.end(fileContent);
}
