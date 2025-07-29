const { urlencoded } = require("body-parser");
const axios =  require("axios").default;
const express =  require("express");
const app =  express();
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
  let days =  [];
  let paramsApi = {
    q: req.body.locale, //LOCALIZAÇÃO,
    days: 5,
    endpoint: `forecast.json` //current = atual, forecast = previsão //DIAS DE PREVISÃO,
  }

  let urlfull = `${coreApi.baseUrl}/${paramsApi.endpoint}?key=${coreApi.key}&q=${paramsApi.q}&days=${paramsApi.days}&lang=${coreApi.lang}`;

  console.log(urlfull);

  axios.get(urlfull)
       .then(response =>{
        let baseCurrent = response.data.current;
        let baseForecastDay =  response.data.forecast.forecastday[0].day;
        let baseForecastDays = response.data.forecast.forecastday;
        
        //filtrar informações 
        let subVetForecastDaysInf = [];
        baseForecastDays.forEach(dayinf =>{

          let dayGeneral = dayinf.day;

          let dayUtilInf = {
            data: dayinf.date,
            mediatemp: dayGeneral.avgtemp_c,
            humidade: dayGeneral.avghumidity,
            vento: dayGeneral.maxwind_kph,
            chuva: dayGeneral.daily_chance_of_rain
          }
          subVetForecastDaysInf.push(dayUtilInf);
        });

        res.render("rerend.ejs", {
          local: response.data.location.name,
          temp: baseCurrent.temp_c,
          humidade: baseCurrent.humidity,
          vento: baseCurrent.wind_kph,
          chuva: baseForecastDay.daily_chance_of_rain,
          prev: subVetForecastDaysInf
        });
       });
})

app.listen(port, ()=>{
  console.log(`SERVIDOR ATIVO ON http://127.0.0.1:${port}`)
});