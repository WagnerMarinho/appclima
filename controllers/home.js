const express = require("express");
const axios = require("axios");
const utils = require("../utils/responseHandler.js");
const utilsf = require("../utils/format.js")

const router = express.Router();

router.post("/sendLocale", (req, res)=>{
  let urlfull = `http://api.weatherapi.com/v1/forecast.json?key=d8aee1ec792143a88c8234714252307&q=${req.body.locale}&days=5&lang=pt`;//Url para fazer a consulta
  axios.get(urlfull)
       .then(response =>{
          let baseCurrent = response.data.current;
          console.log(response.data.forecast.forecastday)
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

module.exports = router;