let searchInput=document.getElementById("searchInput")
searchInput.addEventListener("input",function(){
  getWeathers(searchInput.value)
  // console.log(searchInput.value)
})

navigator.geolocation.getCurrentPosition((position)=>{
    console.log(position.coords);

    let myLatitude = position.coords.latitude;
    let myLongitude = position.coords.longitude;
    getWeathers(`${myLatitude},${myLongitude}`)
   
})



async function getWeathers(term){
try{
  let response =await fetch(`https://api.weatherapi.com/v1/forecast.json?key=842c330c833a4d26a41234024241712&q=${term}&days=3&aqi=no&alerts=no`)
  if(response.ok){
      let data =await response.json()
      console.log(data)
    displayData(data)
  }
}
catch{
  console.error(error)
}
}




function nextDay(){
  let myNextData = new Date()
  myNextData.setDate(myNextData.getDate() + 1);  
 console.log(myNextData)
  let nextDayName=myNextData.toLocaleString("en-us",{weekday:"long"})
   console.log(nextDayName)
   return nextDayName
}

function thirdDay(){
  let myThirdData = new Date()
  myThirdData.setDate(myThirdData.getDate() + 2);  
 console.log(myThirdData)
  let thirdDayName=myThirdData.toLocaleString("en-us",{weekday:"long"})
   console.log(thirdDayName)
   return thirdDayName
}


function displayData(data){
    
   let dayToday =data.current.last_updated   ;
   console.log(dayToday)
   let myData = new Date(dayToday)

   let todayName=myData.toLocaleString("en-us",{weekday:"long"})
   console.log(todayName)
   
   let monthName=myData.toLocaleString("en-us",{month:"long"})
   console.log(monthName)

   let todayNumber=myData.getDate()
   console.log(todayNumber)

   let currentImg=data.current.condition.icon;
   let nextimg=data.forecast.forecastday[1].day.condition.icon;
   let thirdimg=data.forecast.forecastday[2].day.condition.icon;
    let maxTemp =data.forecast.forecastday[1].day.maxtemp_c;
    let minTemp =data.forecast.forecastday[1].day.mintemp_c;

 console.log(maxTemp)
 
  
   let cartona=`
          <div class=" body col-md-4  text-white rounded-start-4">
              <div class="head text-white d-flex flex-row justify-content-between">
                <div class="ps-2">
                  <p>${todayName}</p>
                </div>
                <div class="pe-2">
                  <p>${todayNumber} ${monthName}</p>
                </div>
              </div>
              <div class="mb-3" >
                <div class="town"><p>${data.location.country}</p></div>
              <div class="d-flex ">
                <div class="degree me-5">${data.current.temp_c}</div>
                <img src="https:${currentImg}"  alt="">
              </div>
                
              </div>
              <span class="my-3 text-info">${data.current.condition.text} </span>
              <div class="direction d-flex my-4">
                <span class="d-flex">
                  <img src="imges/icon-umberella.png" class="me-3" width="25px" height="25px" alt="">
                  <p>${data.current.humidity}</p>
                </span>
                <span class="d-flex ms-3">
                  <img src="imges/icon-wind.png" class="me-3" width="25px" height="25px" alt="">
                  <p>${data.current.wind_kph }</p>
                </span>
                <span class="d-flex ms-3">
                  <img src="imges/icon-compass.png" class="me-3" width="25px" height="25px" alt="">
                  <p>${data.current.wind_dir}</p>
                </span>
              </div>
            </div>
            <div class="body2 col-md-4">
              
                <div class="head2 d-flex justify-content-center">
                  <div class="my-2">${nextDay()}</div>
                </div>
                <div class="d-flex flex-column justify-content-center align-items-center  text-white">
                  <div class="img mt-5">
                    <img src="https:${nextimg}"  alt="">
                  </div>
                  <div class="degree my-3">${data.forecast.forecastday[1].day.maxtemp_c}</div>
                  <small>${data.forecast.forecastday[1].day.mintemp_c}</small>
                  <div class="text-info my-3">${data.forecast.forecastday[1].day.condition.text}</div>
                </div>
              
            </div>
            <div class="body3 col-md-4  rounded-end-4">
              
              <div class="head3 d-flex justify-content-center">
                <div class="my-2">${thirdDay()}</div>
              </div>
              <div class="d-flex flex-column justify-content-center align-items-center  text-white">
                <div class="img mt-5">
                  <img src="https:${thirdimg}"  alt="">
                </div>
                <div class="degree my-3">${data.forecast.forecastday[2].day.maxtemp_c}</div>
                <small>${data.forecast.forecastday[2].day.mintemp_c}</small>
                <div class="text-info my-3">${data.forecast.forecastday[2].day.condition.text}</div>
              </div>
            
          </div>
   
   
   
   `
document.getElementById("rowData").innerHTML=cartona
}












