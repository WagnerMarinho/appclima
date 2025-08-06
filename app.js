const { urlencoded } = require("body-parser");
const axios =  require("axios").default;
const express =  require("express");
const app =  express();

const utils = require("./utils/responseHandler.js");
const utilsf = require("./utils/format.js")

const port = process.env.PORT || 3200;
const host = `http://127.0.0.1:${port}`

const coreApi = {
  baseUrl : "http://api.weatherapi.com/v1",
  key: "d8aee1ec792143a88c8234714252307",
  lang: "pt" // IDIOMA,
}

app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

//Home
app.get("/",(_, res)=>{
  res.render("index.ejs");
})

app.post("/sendLocale", (req, res)=>{
  let paramsApi = {
    q: req.body.locale, //LOCALIZAÇÃO,
    days: 6,
    endpoint: `forecast.json` //current = atual, forecast = previsão //DIAS DE PREVISÃO,
  }

  let urlfull = `${coreApi.baseUrl}/${paramsApi.endpoint}?key=${coreApi.key}&q=${paramsApi.q}&days=${paramsApi.days}&lang=${coreApi.lang}`;

  console.log(urlfull);

  axios.get(urlfull)
       .then(response =>{
z
          console.log(response.data.location);
          //filtrar informações 
          res.render("rerend.ejs", {
            local: response.data.location.name,
            temp: baseCurrent.temp_c,
            humidade: baseCurrent.humidity,
            vento: baseCurrent.wind_kph,
            chuva: response.data.forecast.forecastday[0].day.daily_chance_of_rain,
            prev: utils.forecastJson(response.data.forecast.forecastday),
            days: utilsf.setDaysForecast()
          });
        }).catch(e=>{
          console.log(e)
          res.render("error.ejs");
        });
})

app.listen(port, ()=>{
  console.log(`SERVIDOR ATIVO ON http://127.0.0.1:${port}`)
});