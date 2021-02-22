const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
var cors = require("cors");
//stuff

const app = express();
const port = 3001 || process.env.port;


let thefile = fs.readFileSync("mystocks1.json");
let thestringfile = JSON.stringify(thefile);
console.log(`this is what is being sent ${thefile}`);
app.use(cors());
app.use(express.json());
//json converts object to json and sets headers type to json
var jsonParser = bodyParser.json();
app.get("/stocks", (req, res) => {
  res.send(thefile);
});

app.post("/stock", (req, res) => {
  console.log("i got a request");
  console.log(`i am in the server recieving data ${JSON.stringify(req.body)}`);
  fs.writeFile("mystocks1.json",JSON.stringify(req.body), (err) => {
    if (err) console.log(err);
    else {
      console.log("File written successfully\n");
      console.log("The written file has the following contents:");
      console.log(fs.readFileSync("mystocks1.json", "utf8"));
    }
  });
  //  fs.writeFile("./mystocks.json"
  //   ,JSON.stringify(req.body))
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
// app.use(express.static('newwebsite'))
