const axios = require("axios");
const { readFileSync, createReadStream } = require("fs");
const csv = require("csv-parser");

const BASE_URL = "http://localhost:3000";

const results = [];
createReadStream("dump.txt")
  .pipe(
    csv({
      separator: ";",
      headers: ["name", "partyList", "role", "location", "url"],
      quote: "|",
    })
  )
  .on("data", (data) => results.push(data))
  .on("end", async () => {
    const politicians = results.map((entry) => {
      const { name, partyList, role, location, url } = entry;
      if (partyList == null || partyList.length == 0) {
        return { name, role, location, url };
      } else {
        return { name, role: partyList, location, url };
      }
    });

    const promises = [];
    for (const politician of politicians) {
      const { name, role, location, url } = politician;
      const body = { name, role, picUrl: url };
      if (location != null && location.length != 0) {
        body["location"] = location;
      }
      const promise = axios.post(BASE_URL + "/politician", body);
      promises.push(promise);
      break;
    }
    await Promise.all(promises);
  });
