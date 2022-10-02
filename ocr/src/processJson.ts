import sampleResponse from "./sampleResponse.json";

const { fullTextAnnotation } = sampleResponse;
const [page] = fullTextAnnotation.pages;
const { blocks } = page;
const [block] = blocks;
const { paragraphs } = block;
const [paragraph] = paragraphs;
const { words } = paragraph;
const parWords = words.map((word) => word.symbols);
console.log(parWords);
