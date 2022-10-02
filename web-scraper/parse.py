from bs4 import BeautifulSoup

def parse_bill(data):

    soup = BeautifulSoup(data, 'html.parser')

    tds = soup.find_all('td')

    billNum = tds[0].b.string

    title1 = tds[1].string.split(":")[1].strip().split("\n")
    title = title1[0]

    for i in range(1, len(title1)):
        title += " " + title1[i].strip()

    abstract1 = tds[2].string.split(":")[1].strip().split("\n")
    abstract = abstract1[0]

    for i in range(1, len(abstract1)):
        abstract += " " + abstract1[i].strip()

    split = tds[3].b.string.split(',')

    authors1 = []

    for i in range(0,len(split),2):
        split[i] = split[i].strip('\n').strip()
        authors1.insert(-1, split[i].strip('\n').strip() + ", " + split[i+1].strip('\n').strip())

    dateFiled = tds[4].string

    significance = tds[5].string
    status = tds[-1].string

    authors2 = []

    for i in range(7, len(tds)-2):
        authors2.insert(-1, tds[i].string.split(' ')[1])

    final_dict = {"billNum":billNum,
                "title":title,
                "abstract":abstract,
                "principal_authors":authors1,
                "dateField":dateFiled.split(":")[1].strip(),
                "significance":significance.split(":")[1].strip(),
                "co-authors":authors2}

    return final_dict

html_file = open('sample.txt', 'r')
data = html_file.read()
html_file.close()
print(parse_bill(data))