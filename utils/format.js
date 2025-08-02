module.exports = {
  setDaysForecast : ()=>{
    let daysSig = ["seg", "ter", "qua", "qui", "sex", "sab", "dom"];
    let numbDay = parseInt(new Date().getDay());

    let daysOrder = [];

    for(let i = 1; i < 5; i++){
      console.log(numbDay)
      if(numbDay == 7){
        daysOrder.push(daysSig[numbDay-1]);
        numbDay = 1;
      }
      daysOrder.push(daysSig[numbDay-1]);
      numbDay++
    }

    console.log(daysOrder);

    return daysOrder;
  }
}