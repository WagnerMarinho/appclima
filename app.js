const { urlencoded } = require("body-parser");
const connect = require("./database/configs/connect");
const axios =  require("axios").default;
const express =  require("express");
const app =  express();
const port = process.env.PORT || 3200;
const host = `http://127.0.0.1:${port}`
const home = require("./controllers/home.js")

app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

connect.authenticate()
       .then(() => {console.log("Connected!")})
       .catch(err => console.log("Failed to authenticate"));

app.use(home);
//Home
app.get("/",(_, res)=>{
  let limitConsult = 5;
  res.render("index.ejs");
})

app.listen(port, ()=>{
  console.log(`SERVIDOR ATIVO ON http://127.0.0.1:${port}`)
});