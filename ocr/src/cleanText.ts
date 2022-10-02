import { existsSync, mkdirSync, readdirSync, writeFileSync, readFileSync } from "fs";

const lenThreshold = 70;

function shouldKeepLine(line, index, lines) {
    const len = line.length;
    const numOnes = line.split('1');
    const numTwos = line.split('2');
    return (numOnes.length < 5 && numTwos.length < 5) && (len > lenThreshold || ((line.charAt(len-1) == '.') && index > 0 && lines[index-1].length > lenThreshold));
}
const bills = readdirSync(`../text`);

for (const bill of bills) {
    const files = readdirSync(`../text/${bill}`);

    for (const file of files) {
        const fileRead = readFileSync(`../text/${bill}/${file}`, 'utf-8');
        const newFile = fileRead.split(/\r?\n/).filter(shouldKeepLine).join('\r\n');
        
        writeFileSync(`../text/${bill}/cleaned_${file}`, newFile);
    }
}