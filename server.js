const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {  //middleware
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) =>{
      if (err){
          console.log("Erro ao escrever no fich");
      }
  });
  next();
});

// app.use((req, res, next) => {  //sobrepoe aos get e post
//   res.render('maintenance.hbs');
//   //como n chamamos next ent o render para
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my websiteeeee'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(port, () => {  //change env var to heroku
  console.log(`Server is up on port ${port}`);
});


// const express = require('express');
// const hbs = require('hbs');

// var app = express();

// app.use(express.static(__dirname + '/public/')); //middleware -->p abrir o fich Help.html
// app.set('view engine', 'hbs'); //handlebars templates

// hbs.registerPartials(__dirname + '/views/partials');

// hbs.registerHelper('getCurrentYear', () => {
//     return new Date().getFullYear()
//   });
  
//   hbs.registerHelper('screamIt', (text) => {
//     return text.toUpperCase();
//   });
  

// app.get('/', (req, res) => {
//     res.render('home.hbs', {  //intrepetar o hbs file
//         pageTitle: 'Home Page',
//         welcomeMessage: 'Welcome to my website'
//         // currentYear: new Date().getFullYear()
//     });
// });

// */

// // app.get('/', (req, res) => {
// // //   res.send('<h1>Hello Express!</h1>');
// //   res.send({
// //     name: 'Andrew',
// //     likes: [
// //       'Biking',
// //       'Cities' 
// //     ]
// //   });
// // });

// app.get('/about', (req, res) => {
//     res.render('about.hbs', {
//         pageTitle: 'About Page'
//         // currentYear: new Date().getFullYear()
//     });
// });


// // app.get('/about', (req, res) => {  //2ª rota
// //   res.send('About Page');
// // });

// // /bad - send back json with errorMessage
// app.get('/bad', (req, res) => {
//     res.send({
//         errorMessage: 'Unable to handle request' //json data
//     });
// });

// app.listen(3000, () => {
//     console.log('server ready');   //2 param é funcao q aparece qd server esta pronto
// });  //starts server
