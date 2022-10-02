from summary import summarize
from keywords import generate_stances
import os
import pandas as pd

# Remove preamble
# loop through each file
   # loop through each page
    # generate summary for each page - summary for doc is appending these summaries
    # combine the pages and run through keyword generation to get keywords

#(filename, combined summary - p sentences for p page bill, [5 stances for combined text])

BILL_PATH = "../data/bill1.txt"

CLEANED_PATH = "../ocr/clean"

def extended_generate():
    df = pd.DataFrame()

    text = []
    summary = []
    stances = []

    for billDir in os.listdir(CLEANED_PATH):
        print("******************Starting bill******************")
        currDir = os.path.join(CLEANED_PATH, billDir)
        billText = []
        summaries = []
        for pageFileName in os.listdir(currDir):
            pageFileDir = os.path.join(currDir, pageFileName)
            with open(pageFileDir, "r") as f:
                pageText = " ".join(s[:-1] for s in f.readlines())
                billText.append(pageText)
                summaries.append(summarize(pageText))
        
        billTextStr = "\n".join(billText)
        stanceList = generate_stances(billTextStr)
        summaryStr = " ".join(summaries)
        text.append(billTextStr)
        summary.append(summaryStr)
        stances.append(stanceList)
    
    df['text'] = text
    df['summary'] = summary
    df['stances'] = stances

    df.to_csv('bills.csv')





def generate(filename):
    with open(filename, "r") as f:
        text = " ".join(s[:-1] for s in f.readlines())
    return {"summary": summarize(text), "stances": generate_stances(text)}


extended_generate()
