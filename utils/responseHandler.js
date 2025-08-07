module.exports = {
  forecastJson: (fullJson)=>{
    let subVetForecastDaysInf = [];
      fullJson.forEach(dayinf =>{
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
      console.log(subVetForecastDaysInf);
      return subVetForecastDaysInf;
  },
}