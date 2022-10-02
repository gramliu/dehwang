from summary import summarize
from keywords import generate_stances

BILL_PATH = "../data/bill1.txt"


def generate(filename):
    with open(filename, "r") as f:
        text = " ".join(s[:-1] for s in f.readlines())
    return {"summary": summarize(text), "stances": generate_stances(text)}


print(generate(BILL_PATH))
