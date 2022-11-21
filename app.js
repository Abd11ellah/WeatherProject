const express=require("express");
const https=require("https");
const bodyParser = require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html")
})
app.post("/",function(req,res){
var city = req.body.city
var apikey ="20d9906b44a839f58837d0389d96dfc0";
var unit="metric";

const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apikey+"&units="+unit;

https.get(url,function(response){
console.log(response.statusCode)

response.on("data",function(data){
const weatherData=JSON.parse(data);
const  temp=weatherData.main.temp;
const states=weatherData.weather[0].description;
const icon=weatherData.weather[0].icon;
const iconurl="http://openweathermap.org/img/wn/"+icon+"@2x.png"
console.log(states)
res.write("<p>the weather  in "+city+" is "+states+"</p>")
res.write("<h1>the temperture in "+city+" is "+temp+"degreas celceos</h1>")
res.write("<img src="+iconurl+"></img>")

    res.send()
})
})

})

app.listen(3000,function(){
    console.log("the server is running!")
})