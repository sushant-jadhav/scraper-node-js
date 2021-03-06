var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
  // Let's scrape Anchorman 2
  url = 'http://www.therecipedepository.com/category/indian';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var title, release, rating;
      var json = { title : "", src : "", rating : ""};

      // $('.title_wrapper').filter(function(){
      //   var data = $(this);
      //   title = data.children().first().text().trim();
      //   release = data.children().last().children().last().text().trim();

      //   json.title = title;
      //   json.release = release;
      // })
       $('.recipe-item').filter(function(){
        var data = $(this);
        // console.log(data.children().first().text().trim());
        title = data.children().first().text().trim();
        src = data.find('.recipe-masthead').attr('src');

        json.title = title;
        json.src = src;
      })

      // $('.ratingValue').filter(function(){
      //   var data = $(this);
      //   rating = data.text().trim();

      //   json.rating = rating;
      // })
    }

    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })

    res.send('Check your console!')
  })
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;