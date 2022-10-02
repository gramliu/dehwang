import os
from bs4 import BeautifulSoup
import requests


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

    for i in range(0, len(split), 2):
        split[i] = split[i].strip('\n').strip()
        authors1.insert(-1, split[i].strip('\n').strip() +
                        ", " + split[i+1].strip('\n').strip())

    dateFiled = tds[4].string

    significance = tds[5].string
    status = tds[-1].string

    authors2 = []

    for i in range(7, len(tds)-2):
        authors2.insert(-1, tds[i].string.split(' ')[1])

    final_dict = {"billNum": billNum,
                  "title": title,
                  "abstract": abstract,
                  "principal_authors": authors1,
                  "dateField": dateFiled.split(":")[1].strip(),
                  "significance": significance.split(":")[1].strip(),
                  "co-authors": authors2}

    return final_dict


BASE_URL = "http://localhost:3000"
stances = [
    ['rediscount loans', 'tax exemption', 'pending tax',
        'rediscounted loans', 'tax exemptions'],
    ['years medical', 'medical doctors', 'medical students',
        'graduates medicine', 'licensed physicians'],
    ['development faculty', 'ict development',
        'developing updating', 'ict counseling', 'ict trainings'],
    ['transacting internet', 'online merchant', 'fight cybercrime',
        'directing website', 'cybercrime prevention'],
    ['city resettlement', 'reform housing', 'resettlement urban',
        'housing resettlement', 'metro manila'],
    ['internet throttling', 'money latest', 'underdeveloped ict',
        'internet unfortunately', 'costliest world'],
    ['fund manager', 'audit accounting', 'insurance promulgate',
        'accounting auditing', 'auditing laws'],
    ['government lawyer', 'justice 18th', 'house representatives',
        'lawyer payment', '18th congress'],
    ['president list', 'secretaries submit', 'president speaker',
        'appointed president', 'recommend president'],
    ['collaborating research', 'vip research', 'virology genomics',
        'internships scholarships', 'bacteriophages nanotechnology']
]
tldrs = [
    """Here is the full text of the bill: President Rodrigo Duterte has signed into law the following bill: This is a summary of the provisions of the "GUIDE" Act. Section 3 of the Development Bank of the Philippines (DBP) Act of 2010: The House of Representatives has passed a bill imposing strict rules and regulations on the operations of the Land Bank of the Philippines (LBP) and the Development Bank of the Philippines (DBP). A proposed legislative measure has been filed in the House of Representatives aimed at rehabilitating strategically important companies affected by the recent pandemic in the Philippines. President Benigno Aquino III has signed into law the following bills: Here is the full text of the bill signed into law by President Gloria Macapagal-Arroyo: The Saipan H1N1 pandemic relief corporation (SHC) is hereby created and established as follows: Here is the full text of the SHC Act: The Land Bank of the Philippines (LBP), the Development Bank of the Philippines (DBP), and the private equity investor(s) shall set up a Stock Holding Company (SHC) to invest in publicly traded companies.""",
    """The Department of Health (DOH) is seeking to set up a Medical Reserve Corps (MRC) to provide medical support in the event of a national or local health emergency. A bill has been filed in the House of Representatives to establish a Medical Reserve Corps (MRC) to augment the country's human health resources in times of disasters and public health emergencies. President Rodrigo Duterte has signed into law the "Medical Reserve Corps Act." The Department of Health (DOH) has set up the Medical Response Corps (MRC) to respond to disasters and other health emergencies in the country. The Department of Health (DOH) is hereby empowered to: All graduates of public and private colleges, universities and learning institutions covered under this Act are required to register with the Department of Health (DOH) as a member of the Medical Reserve Corps (MRC). The Department of Health (DOH) and the Armed Forces of the Philippines (AFP) have issued the following rules and regulations on the Mobilization of the Medical Reserve Corps (MRC).""",
    """The Department of Information and Communications Technology (DICT) has created the Philippine Academy of Information and Communications Technology (ICT Academy) to: The Department of Information and Communications Technology (DICT) is hereby established as a body corporate to be known as: The Philippine Information Network (IGN) and all networks interconnected to and interoperable with it, the Philippine Information Database, the Public Service Directory, the portals, and websites: The chairman and members of the board of directors of the Philippine Information and Communications Technology Institute (ICTI) may from time to time be found guilty of any of the following: a. The Department of Information and Communications Technology (DICT) Academy shall collect donations and fees from the public for the purpose of its operations. President Benigno Aquino III has signed into law the Philippine Information and Communications Technology (ICT) Act of 2010. The Philippine Institute of Legal Counsel (PILC) is hereby established as a public corporation under the laws of the Philippines for the purpose of: The Philippine International Bank Corporation is hereby established as a corporation under the laws of the Philippines and its by-laws, and is governed by the following: The Department of Information and Communications Technology (DICT) of the Philippines is hereby established as the "Department of Information and Communications Technology (DICT) of the Philippines." The Department of Information and Communications Technology (DICT) has created the Department of Information and Communications Technology Development Corporation (DIC). The Philippine Information and Communications Technology Corporation (PICT) has been established under Republic Act (RA) 9165 or the Information and Communications Technology Act of the Philippines. The Philippine Information and Communications Technology Act of 2010 provides for the following: The Department of the Interior and Local Government (DILG) hereby sets out the following: The Department of Information and Communications Technology (DICT) is charged with: The Department of Information and Communications Technology (DICT) shall: a. Harmonize and coordinate all national ICT plans and initiatives to ensure knowledge, information and resource-sharing, database-building, and agency networking linkages among government agencies, consistent with E-Government objectives in particular The Department of Information and Communications Technology (DICT) is hereby established as the Department of Information and Communications Technology of the Philippines. The Department of Information and Communications Technology (DICT) is hereby established to: a. - All applications and/or requests submitted through the portal shall be acted upon by the assigned officer or employee within five working days from the date the request or application was received. All government offices and agencies which provide frontline services are hereby mandated to establish and maintain measures to ensure that such services are accessible and capable of delivery to the public through the online public service portal. The Department of Information and Communications Technology (DICT) shall: a. President Rodrigo Duterte has signed into law the E-Governance Act of 2017. The Department of Information and Communications Technology (DICT) has established the Department of Public Information and Communications Technology (DICT) Center for Citizen Complaints. The following is a summary of the provisions of the Philippine government's website and e-bulletin board law. This Act is hereby signed into law by the President of the United States. The Center for Citizen Complaints and Grievances of the Department of the Interior and Local Government (DILG) is hereby established as follows: We, the members of the House of Representatives, would like to express our sincere gratitude to the President of the United States, Barack Obama, for signing into law the American Recovery and Reinvestment Act of 2009. It is time for the Philippine government to move from paper-based services to digital services. The Department of the Interior and Local Government (DILG) has issued the following rules on the online delivery of public services:""",
    """The Department of Trade and Industry (DTI) and the Department of Information and Communications Technology (DICT) have entered into an agreement on the development, management, operation, and maintenance of a Register of Online Businesses (ROB). A glossary of terms: This Act may be cited as follows: The Department of Trade and Industry (DTI) has issued a cease and desist order against the following companies: A glossary of terms: The Bureau of Customs ( Bureau) has the power to issue a subpoena ad testificandum or subpoena duces tecum to any person or entity engaged in the business of online shopping ( eCommerce). The Department of Trade and Industry (DTI) has established the Bureau of Customs (Bureau) to: Digital content refers to data which are produced and supplied in electronic form; Digital service refers to a service that allows the consumer to create, process, store or access data in electronic form or allows the sharing of or any other interaction with data in electronic form uploaded or created by the consumer or other user The following is a summary of the provisions of Republic Act (RA) 9165 otherwise known as the "Anti-Counterfeiting and Electronic Commerce Act of the Philippines": (a) eCommerce platform operators shall be solidarily liable with an online merchant to the consumer only to the extent of civil damages suffered by In our series of letters from African journalists, film-maker and columnist Farai Sevenzo looks at the rise of e-commerce in ASEAN. A person who engages in eCommerce in the Philippines and who facilitates the sale of a digital product or service by one who is not so authorized is deemed primarily liable for any obligation, damage, or fine, that may arise from the transaction or from the digital product. The Department of Trade and Industry (DTI) has issued a code of conduct for businesses selling goods and services online in the Philippines. The following is the text of the Philippine Electronic E-commerce Bill: The Department of Trade and Industry (DTI) through the Bureau of Internal Revenue (BIR) and the Department of Justice (DOJ) will lead the development of an eCommerce Philippin. The Department of Trade and Industry (DTI) is committed to promoting the growth and development of e-commerce in the Philippines. The Philippine Senate has passed the Internet Transactions Act of 2015. The Speaker of the House of Representatives, Gloria Macapagal-Arroyo, has sent to the Senate a bill that seeks to regulate the use of the internet in the Philippines. The following laws and regulations apply to online shopping in the Philippines: The Department of Trade and Industry (DTI) has launched an Online Dispute Resolution (ODR) platform on its website: The Department of Trade and Industry (DTI) has created the Office of Dispute Resolution (ODR) as a single point of entry for consumers, online merchants, and eCommerce platform operators seeking out-of-court resolution of disputes. The Department of Trade and Industry (DTI) hereby dissolves the Department of Commerce and Industry's (DCI) eCommerce Division. - It is unlawful for an online merchant to charge more than the value of the goods received by the consumer if the goods are not in conformity with the contract. The Department of Trade and Industry (DTI) has established a Trustmark system to promote the public reliable and trustworthy eCommerce services in the Philippines. All online merchants are required to maintain a file of all online merchants registered under their platform containing the information provided by online merchants in paragraph (a) of this Section; number, and a valid electronic mail address, which makes it possible to immediately and easily contact and communicate with the online merchant. The United States Department of Commerce's Bureau of Consumer Protection ( the "Bureau"), which is part of the US Department of Commerce, enforces the following laws and regulations: Here are the key provisions of the Internet Transactions Act: Where the goods delivered under the contract are not conformity with the goods with the contract, the consumer may exercise the right to terminate the contract by giving notice to the online merchant. Act as a virtual central unit tasked to receive and address consumer complaints on internet transactions, facilitate the speedy resolution of consumer complaints by the respective government agency which has jurisdiction over it, and track complaints referred to or initiated by it to ensure the speedy and appropriate action The following terms and conditions apply to the purchase of goods from an online merchant: (a) Where the contract provides that the digital content or digital service is to be supplied or made accessible to the consumer over a period of time, the online merchant may modify the digital content or digital service beyond what is necessary to The following terms and conditions apply to the sale of goods on the internet: The Philippine Online Commerce and Retailing Act of 2016 (the "Act"), otherwise known as the Philippine Online Commerce and Retailing Act of 2016, or the " eCommerce Act", provides the following: Details of the goods to be bought and the price at which the goods were sold. The following rules apply to the sale of goods online:
""",
    """All photographs are copyrighted. The Philippine House of Representatives has passed the Urban Development and Housing National Housing Authority of upgrading and improving squatter area law. A bill has been filed in the House of Representatives to amend Republic Act 7279 or the Agrarian Reform Act of Agrarian Reform to provide for the establishment of a local g unit led on-site, in-city, near-city, or off-city resettlement program which recognizes the people's right Here is the full text of House Bill 8248, otherwise known as "An Act Establishing an On-Site, In-City, Near-City, or Off-City Local Government Resettlement Program for Informal Settler Families in Accordance with a People's Plan and Mandating the Implementing Local Government Unit A selection of photos from around the world this week: A selection of photos from around the world this week: A selection of photos from around the world this week: The House of Representatives has approved the following bill: A selection of photos from around the world this week: President Rodrigo Duterte has signed into law the People's Plan for the Development of the Philippines, otherwise known as the "Revised People's Plan." A selection of photos from around the world this week: The Department of Social Welfare and Development (DSWD) in coordination with the Department of Environment and Natural Resources (DENR) and the Department of Housing and Urban Development (HUD) and the Department of Environment and Natural Resources (DENR) and the Department of Public Works and Highways (DPW) and the The Department of Social Welfare and Development (DSWD) has issued the following guidelines on the implementation of the Millennium Development Goals (MDGs) in the Philippines:
""",
    """A copy of this Act may be found on the website of the Ministry of Justice at www.modh.gov.uk. In our series of letters from African journalists, film-maker and columnist Bong Pedalino considers the proposed Philippine Data Transmission Bill. We, the Representatives of the 17th and 18th Congresses, respectfully submit the following resolution: A glossary of terms used in the telecommunications industry: The President of the Philippines, Rodrigo Duterte, has signed into law the "Philippines Data Transmission Policy", which aims to narrow the digital divide in the country by encouraging the development of data transmission infrastructure and removing any barrier to competition in data transmission services. The National Telecommunications Commission (NTC) has issued the following rules: (a) A data transmission industry participant violating any provision of this Act shall be liable to a fine of not less than Fifty thousand pesos (P50,000.00) and not more than Two million pesos (P2,000,000.00). The Department of Information and Communications Technology (DICT) shall be responsible for the following: The National Telecommunications Commission (NTC) hereby adopts the following rules and regulations: The National Telecommunications Commission (NTC) has issued the following rules on data transmission: The National Telecommunications Commission (NTC) and the Department of Information and Communications Technology (DICT) have agreed on the following: The Philippine Telecommunications Act of 2010 (the "Act"), otherwise known as the Information and 35 Communications Technology (ICT) Act of 2010, has the following provisions: The Department of Information and Communications Technology (DICT) and the National Telecommunications Commission (NTC) shall ensure the efficient and effective use of data transmission infrastructure, including passive infrastructure used to support data transmission. The Philippine Communications Commission (PCC) and the National Telecommunications Commission (NTC) are hereby empowered to: Here is the full text of the Philippine Competition Act:
""",
    """The President hereby appoints the following: All laws, rules and regulations, and other issuances or parts thereof, which are inconsistent with the provisions of this Act, are hereby repealed, amended, or modified accordingly. This Act provides for the establishment of a new system of retirement and separation for military personnel of the Armed Forces of the Philippines and for (c) Section 11 of Republic Act No. 340, as amended, entitled "An Act to Establish a Uniform Retirement System for the Armed Forces of the Philippines, to Provide for The President of the Philippines has signed into law the Military and Uniformed Personnel Trust Fund Act, which provides for the payment of pension and pension under existing laws and the disability and other benefits under this Act. Here is the full text of the MUP Trust Fund Act: (a) The Military Unified Pension (MUP) Trust Fund for the separation, retirement, and pension benefits of military and uniformed personnel. A summary of key provisions of the Military and Uniformed Personnel Trust Fund Act of 2010: The Philippine Congress has passed a law to protect the country's military and uniformed personnel against the extraordinary hazards, risks, and dangers that they encounter in the performance of their duties. The Department of the Interior and Local Government (DILG) and the Armed Forces of the Philippines (AFP) are calling for urgent action to save the country's pension system. The military and uniformed services in the Philippines are facing a massive unfunded pension liability of more than P10trillion, of which more than half (P4trillion) is due in the next five years. The powers and functions of units or instrumentalities of agencies that employ military and uniformed personnel and administer their pension system or parts thereof are hereby transferred to the MUP Trust Fund Committee. A committee appointed by the President to oversee the disposition of the assets of the military and uniformed services is hereby established.
""",
    """A selection of photos from around the world this week: This is the text of the bill seeking to grant free legal assistance to military and uniformed personnel who have pending cases before the prosecutor's office, the courts, or any quasi-judicial or administrative body involving service-related incidents. The Free Legal Assistance for Military and Uniformed Personnel Act of 2010 has been signed into law by President Benigno Aquino III. The Philippine National Police (PNP) through the Armed Forces of the Philippines (AFP) and the Bureau of Fire Protection (BFP) and the Philippine Coast Guard (PCG) through the Police Commission of the Philippines (PCG) and the Philippine National Police (PNP) through the Police Commission of the Philippines President Benigno "Noy" Aquino III has signed into law the Armed Forces of the Philippines (AFP), Bureau of Fire Protection (BFP), Bureau of Jail Management and Penology (BJMP), Philippine Coast Guard (PCG), Philippine National Police (PNP) and Philippine Police Force (BFP)
""",
    """(a) The Centers for Disease Control and Prevention (CDC) of the Department of Health (DOH) shall, in consultation with the DOH and other concerned agencies of government and the private sector as may be necessary, create or abolish units, offices, or Centers as needed to carry out all provisions of The Department of Health (DOH) and the Center for Disease Control and Prevention (CDC) of the Department of Science and Technology (DST) are hereby established to: The Center for Disease Control (CDC) of the Department of Health (DOH) shall be the technical authority on all matters regarding disease prevention and control. The Center for Disease Control (CDC) of the Department of Health (DOH) shall establish and operate the National Reference Laboratory (NRL). (a) The Department of Health (DOH) and the Civil Service Commission (CSC) shall establish a Centers for Disease Control and Prevention (CDC) within the DOH. The Centers for Disease Control and Prevention (CDC) of the US Department of Health and Human Services (DHHS) is charged with the following: The Centers for Disease Control and Prevention (CDC) shall be responsible for the following: The Centers for Disease Prevention and Control (CDC) of the Department of Health (DOH) shall have the following: All laws, orders, rules, and regulations or other issuances or parts thereof inconsistent with the provisions of this Act are hereby repealed or modified accordingly. This is a summary of the Philippine Center for Disease SEC Act of 2010. The Philippine Center for Disease Prevention and Control (CDC) is hereby created as an attached agency to the Department of Health (DOH) for policy and program coordination The proposed "Philippine Center for Disease Prevention and Control (CDC) Act" is a consolidation of thirteen (13) House Bills establishing the CDC that were referred to the Committee on Health in the 18th Congress. The Department of Health (DOH) in the Philippines has proposed the creation of the Center for Disease Control (CDC).
""",
    """The Department of Science and Technology (DOST) has released the full text of Republic Act 9184 or the "Government Procurement Reform Act" (IRR), which provides for the establishment of the Virology Institute of the Philippines (VIP). The Department of Science and Technology (DST) and the Department of Foreign Affairs (DFA) have signed into law the Philippine VIP Act, creating the Department of Science and Technology (DST) and the Department of Foreign Affairs (DFA) as VIPs. The Virology Institute of the Philippines (VIP) of the Department of Science and Technology (DOST) is hereby established as follows: The Department of Science and Technology (DST) has established the Tropical Institute for Research and Development (VIP) to: A glossary of terms: a) Bacteriophage refers to any group of viruses that infect specific bacteria, usually causing their b) Biosafety refers to a condition in which the probability of harm, injury, and damage resulting from the intentional and unintentional introduction or use of a regulated article is within b) Bio The Department of Science and Technology (DST) is hereby abolished and its units and offices transferred to the Department of Budget and Management (DBM) and the Department of Health (DOH). 7. Virology is the study and prevention of infectious diseases and viral infections in humans, plants, and animals. This article is copyrighted. The Philippines is still reeling from the devastating effects of the CO 19 pandemic that struck the country in April 2009. The Philippine Senate has passed the Virology Institute of the Philippines Act, which aims to establish a virology institute that will conduct in-depth studies on viruses and their potential discase-causing agents that affect people, order to provide the scientific bases for the treatment of viral diseases, and for the formulation of policies
"""
]


def main():
    politicians = requests.get(BASE_URL + "/politician").json()
    mapping = {}
    # Build last name to id mapping
    for politician in politicians:
        name = politician["name"]
        id = politician["_id"]
        lastName = name.split(",")[0].lower()
        mapping[lastName] = id

    for i in range(3, 21):
        with open(f"data/HB{str(i).zfill(5)}.html", "r") as file:
            html = file.read()
            data = parse_bill(html)
        data["date"] = data["dateField"]
        data["primary"] = list(
            map(lambda x: mapping[get_last_name(x)], filter(lambda x: get_last_name(x) in mapping, data["principal_authors"])))
        data["secondary"] = list(map(lambda x: mapping[get_last_name(x)],
                                     filter(lambda x: get_last_name(x) in mapping, data["co-authors"])))
        data["tldr"] = tldrs[i-1]
        data["stanceNames"] = stances[i-1]
        res = requests.post(BASE_URL + "/bill", json=data)


def get_last_name(name: str) -> str:
    last_name = name.split(",")[0].lower()
    return last_name


if __name__ == "__main__":
    main()

# html_file = open('sample.txt', 'r')
# data = html_file.read()
# html_file.close()
# print(parse_bill(data))
