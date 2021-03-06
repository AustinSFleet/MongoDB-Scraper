var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// Requiring our Note and Article models

var Article = require("./models/Articles.js");
// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

var port = process.env.PORT || 3000;


// Initialize Express
var app = express();

// Use morgan and body parser with our app

app.use(bodyParser.urlencoded({
  extended: false
}));

// Make public a static dir
app.use(express.static("public"));

// Database configuration with mongoose
mongoose.connect(" mongodb://heroku_sq4c4tvs:l0gi2haj5o044fol343un4t8i0@ds115035.mlab.com:15035/heroku_sq4c4tvs");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});


// Routes
// ======

// A GET request to scrape the echojs website
app.get("/scrape", function(req, res) {
  // First, we grab the body of the html with request
  request("https://www.nytimes.com/", function(error, response, html) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(html);
    // Now, we grab every h2 within an article tag, and do the following:
    $(".story-heading").each(function(i, element) {

      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this).children("a").text();
      result.link = $(this).children("a").attr("href");

      // Using our Article model, create a new entry
      // This effectively passes the result object to the entry (and the title and link)
      var entry = new Article(result);

      // Now, save that entry to the db
      entry.save(function(err, doc) {
        // Log any errors
        if (err) {
          console.log(err);
        }
        // Or log the doc
        else {
          console.log(doc);
        }
      });

    });
  });
  // Tell the browser that we finished scraping the text
  res.send("Scrape Complete");
});

// This will get the articles we scraped from the mongoDB
app.get("/articles", function(req, res) {

  // TODO: Finish the route so it grabs all of the articles

  Article.find({}, function(error, doc){
    if (error){
      res.send(error);
    }
    else {
     res.json(doc);
    }
      
      

    
  });

});

// This will grab an article by it's ObjectId
// app.get("/articles/:id", function(req, res) {

// Article.findOne({"_id" : req.params.id})

// .populate("note")

// .exec(function(error, doc){
//   if (error){
//     res.send(error);
//   }
//   else {
//     res.json(doc);
//   }
// })
//   // TODO
//   // ====

//   // Finish the route so it finds one article using the req.params.id,

//   // and run the populate method with "note",

//   // then responds with the article with the note included


// });

// // Create a new note or replace an existing note
// app.post("/articles/:id", function(req, res) {

//   var newNote = new Note(req.body);

//   newNote.save(function(error, doc){
//     if(error) {
//       res.send(error);
//     }
//     else{
//       Article.findOneAndUpdate({"_id": req.params.id}, {"note": doc._id})
//       .exec(function(eror, doc){
//         if(error){
//           console.log(error);
//         }
//         else {
//           res.send(doc);
//         }
//       })
//     }
//   });


// });


// Listen on port 3000
app.listen(port, function() {
  console.log("App running on port: " + port);
});
