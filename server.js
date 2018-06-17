const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

//to use registerPartials
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
});
//to get express to use handlebars
app.set('view engine', 'hbs');

//to register middleware (takes one argument)
app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = now + req.method + req.url;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err)=>{
    if (err){
      console.log('Unable to append to server.log');
    }
  });
  next();
});

//maintenance
app.use((req, res, next)=>{
  res.render('maintenance.hbs');
});

//to register middleware (takes one argument)
app.use(express.static(__dirname+'/public'));

app.get('/', (req, res)=>{
  //res.send('<h1>Hello Express</h1>');
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: "Welcome to the home page!"
  });
});

app.get('/about', (req, res)=>{
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res)=>{
  res.send({
    errorMessage: 'Unable to fulfill the request'
  });
});

app.listen(3000, ()=>{
  console.log('Server is up on port 3000');
});
