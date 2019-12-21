const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
require('dotenv');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));
app.engine('handlebars', handlebars({
	defaultLayout:'main',
	layoutsDir: './views/layouts/',
	partialsDir: './views/partials/'
}));
app.set('view engine', 'handlebars');

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/scrapeit", {useNewUrlParser:true});

require('./controllers/router.js')(app);

app.listen(PORT, () => {
	console.log("Listening @ http://localhost:"+PORT);
});

