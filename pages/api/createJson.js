import traits from "../../database/traitsTheArtOfOri.json";
let fs = require("fs");

export default function handler(req, res) {
    // console.log("=======dirname========", `${__dirname}`)
    const lenTraits = traits.length

    for (let i = 0; i < lenTraits; i++) {
      try {
          // let filePath = `${__dirname}/json/${i + 1}.json`
          let filePath = "database/json/" + `${i + 1}.json`
          console.log(filePath)
          fs.writeFile(filePath, JSON.stringify(traits[i]), () => {
              // fs.readFile(filePath, "utf8", (err, msg) => {
              // console.log(msg);
              // });
            });
          console.log("Add %s.json", i + 1)
      } catch(e) {
          console.log("Error while making json array to file | %s", i)
      }
    }
    
    res.statusCode = 200
    res.json(traits)
  }