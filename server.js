var express = require("express");
var exphbs = require("express-handlebars");

var app = express();

var port = process.env || 3000

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

// empty array to add stored links
var savedLinks = [];

var scrapedLinks = [];

//routes

app.get("/", function(req, res){
    for (var i=0; i < scrapedLinks; i++){
        return res.render("scraper", {scrap: scraper });
    }
});