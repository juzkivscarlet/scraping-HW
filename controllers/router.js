
module.exports = app => {
	const axios = require('axios');
	const cheerio = require('cheerio');
	
	const db = require('../models');

	app.get('/', (req,res) => {
		res.render('index');
	});

	app.get('/scrape', (req,res) => {
		axios.get("https://loudwire.com/").then(function(response) {
			var $ = cheerio.load(response.data);
			$('body').find('.blogroll-inner').children('article').each(function(i,element) {
				let result = {};
				let link = $(this).find('.content').children('a');
				result.title = link.text();
				result.link = "https://"+link.attr('href');
				result.image = "https://"+$(this).find('a.theframe').attr('data-image');
				
				console.log(result);
			});
		});
	});
};