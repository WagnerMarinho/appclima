module.exports = {
  setDaysForecast : ()=>{
    let daysSig = ["dom","seg", "ter", "qua", "qui", "sex", "sab"];
    let numbDay = parseInt(new Date().getDay());

    let daysOrder = [];

    for(let i = 1; i <= 5; i++){
      console.log(numbDay)
      if(numbDay == 6){ 
        daysOrder.push(daysSig[numbDay-1]);
        numbDay = 1;
      }else if(numbDay == 0){
         daysOrder.push(daysSig[numbDay]);
      }else{
        daysOrder.push(daysSig[numbDay]);
      }
     
      numbDay++
    }

    console.log(daysOrder);

    return daysOrder;
  }
}