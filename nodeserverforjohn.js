const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
var cors = require("cors");

const app = express();
const port = process.env.port || 3001;

//app.use(bodyParser);
let thefile = fs.readFileSync("mystocks1.json");
let thestringfile = JSON.parse(thefile);
console.log(`this is what is being sent ${thefile}`);
//app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//app.use((req,res,next)=>{res.header('Access-Control-Allow-Origin','*')});
//This is like a body parser for the new version of express
//Need this for the post request to get the contents of the body
app.use(express.json());
//json converts object to json and sets headers type 
var jsonParser = bodyParser.json();

console.log(`this is the port ${port}`);

app.get("/stocks", (req, res) => {
  console.log(`this is sent ${res.data}`)
  res.json(thestringfile);
  console.log("i sent something");
});
//holy cow what do i need to do
app.post("/stock", (req, res) => {
  console.log("i got a request");
  console.log(`i am in the server recieving data ${(req.body)}`);
  fs.writeFile("mystocks1.json",JSON.stringify(req.body), (err) => {
    if (err) console.log(err);
    else {
      console.log("File written successfully\n");
      console.log("The written file has the following contents:");
      console.log(fs.readFileSync("mystocks1.json", "utf8"));
    }
    return res.send(`i got your updated post ${JSON.stringify(req.body)}`);
  });

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
// app.use(express.static('newwebsite'))
