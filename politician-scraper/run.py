import requests
from bs4 import BeautifulSoup as bs
import re

BASE_URL = "https://www.congress.gov.ph/"


def replace_breaks(line: str) -> str:
    return re.sub("<[\/]?br[ ]?[\/]?>", "\n", line).strip()


def scrape_member(link: str):
    r = requests.get(link)
    page = r.text
    soup = bs(page, features="html.parser")
    img = soup.find("img", src=re.compile("^https://hrep-website.+"))

    siblings = img.find_next_siblings()
    desc = siblings[1]
    role_location = replace_breaks(
        desc.find("small").encode_contents().decode("utf-8"))
    role = location = party_list = None
    if len(role_location.split("\n")) > 1:
        role, location = role_location.split("\n")[:2]
    else:
        party_list = role_location

    designation = desc.find("p")
    designation = str(designation).strip()[
        3:-4]
    designation = replace_breaks(designation)

    if role is not None:
        return img["src"], (role, location)
    else:
        return img["src"], (party_list,)


def main():
    r = requests.get("https://www.congress.gov.ph/members/")
    page = r.text
    soup = bs(page)
    form = soup.find_all("form")[0]
    table = form.find_next_sibling("table")
    anchors = table.find_all("a")
    anchors = list(
        map(lambda anchor: (f"{BASE_URL}{anchor['href'][3:]}", anchor.text), anchors))

    with open("dump.txt", "w") as file:
        for link, name in anchors:
            print(name)
            img, position = scrape_member(link)
            if len(position) == 1:
                party_list, = position
                file.write(f"{name};{party_list};;;{img}")
            else:
                role, location = position
                file.write(f"{name};;{role};{location};{img}")
            file.write("\n")


if __name__ == "__main__":
    main()
