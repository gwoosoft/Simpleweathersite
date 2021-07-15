const express = require('express');
const app=express();
const https= require("https");
const bodyparser =require("body-parser");



app.get("/", function(request, response){
  response.sendFile(__dirname+"/index.html");

});


app.use(bodyparser.urlencoded({extended: true}));



app.post("/", function(request, response){
   console.log(request.body.cityName);
   console.log("post received.");
   const query=request.body.cityName;
   const apikey="be983c136171a2fd1f433e01e3cbcd2f";
   const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ query + "&appid=" +apikey +"&units="+unit;

    https.get(url, function(res){
      console.log(res);
      res.on("data",function(data){
        const weatherdata = JSON.parse(data);
        console.log(weatherdata);
        const temp=weatherdata.main.temp;
        const weatherdes= weatherdata.weather[0].description;
        const icon = weatherdata.weather[0].icon;
        const imageurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
        response.write("<h1>the temp in "+ query+" is " +temp+" celsius and it would be "+ weatherdes+"</h1>");
        response.write("<img src="+imageurl+">");
        response.send();
      })
    })
});



app.listen(3000, function(){
  console.log("server started with 3000");
});
