const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.set('view engine','hbs');

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method}: ${req.url}`

	fs.appendFile('server.log', log +'\n', (err) =>{
		if(err){
			console.log("cannot Create the log file.")
		}
	});
	next();
});

/*app.use((req, res, next) => {
	res.render('maintenance.hbs', {});
});*/

app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
	//res.send('<h1>Hello Express</h1>');
	/*res.send({
		name: "Santosh",
		likes: [
			"Watching Movies",
			"Watching Cricket",
			"Watching Football",
		]
	})*/

	res.render('home.hbs', {
		pageTitle: 'Home Page',
		//currentYear: new Date().getFullYear(),
		welcomeMsg:"Welcome to Medtrix"
	})

});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page'
		//currentYear: new Date().getFullYear()
	})
});

app.get('/send', (req, res) => {
	/*res.render('about.hbs', {
		pageTitle: 'About Page'
		//currentYear: new Date().getFullYear()
	})*/
	console.log("req.body : ", req.body);
});

app.get('/contact', (req, res) => {
	res.render('contactus.hbs', {
		pageTitle: 'ContactUs Page'
		//currentYear: new Date().getFullYear()
	})
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage:"Bad Request - Cannot find the page!! "
	});
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}`)
});