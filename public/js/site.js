$('#scrape-btn').on('click', () => {
	scrapeArticles();
});

$("#postNote-btn").on('click', (e) => {
	e.preventDefault();

	$.post('/notes', {
		title: $('#comment-title').val().trim(),
		name: $('#comment-name').val().trim(),
		body: $('#comment-text').val().trim()
	}, () => {
		$("#comment-title").val("");
		$("#comment-name").val("");
		$("#comment-text").val("");
	});

	// $.ajax({
	// 	method: 'POST',
	// 	url: '/articles/'+id,
	// 	data: {
	// 		title: $("#comment-title").val().trim(),
	// 		name: $("#comment-name").val().trim(),
	// 		body: $("#comment-text").val().trim(),
	// 		article: id
	// 	}
	// }).then(data => {
	// })
});

$("#commentsModal").on('shown.bs.modal', (e) => {
	let id = $(e.relatedTarget).attr('data-article');
	$("#postNote-btn").attr('data-article',id);
	$.ajax({
		method: 'GET',
		url: '/articles/'+id
	}).then(data => {
		console.log(data.note);
		if(data.note.length==0) {
			$('#all-comments').append($("<p>").addClass('font-italic text-muted text-center').html('No comments yet'));
		} else {
			for(var i=0; i<data.note.length; i++) {
				let list = $("<ul>");
				list.append($('<li>').html('<strong>'+data.note[i].title+'</strong> &mdash; <span class="text-muted">'+data.note[i].name+'</span>'));
				list.append($('<li>').html('<span class="text-muted font-italic">'+data.note[i].body+'</span>'));
				$('#all-comments').append(list).append($('<br>'));
			}
		}
	});
});

function scrapeArticles() {
	$.get('/scrape', () => {
		getArticles();
	});
}

function getArticles() {
	$.get('/articles', data => {
		writeArticlesToPage(data);
	});
}

function writeArticlesToPage(articles) {
	const data = [];
	for(let i=0; i<10; i++) {
		data.push(articles[i]);
	}

	const cardGroup = $("<div>").addClass('card-columns');
	
	for(let i=0; i<data.length; i++) {
		let articleCard = $("<div class='card'>").attr('data-article',data[i]._id);
		articleCard.append($("<img class='card-img-top'>").attr('src',data[i].image).attr('alt','Article thumbnail'));
	
		let articleBody = $("<div class='card-body'>");
		articleBody.append($("<h5 class='card-title'>").text(data[i].title));
		articleBody.append($("<p class='card-text text-muted font-italic'>").text(data[i].subtitle));
		articleBody.append($("<a>").attr('href',data[i].link).attr('target','_blank').text("Read on loudwire.com"));
	
		let articleFooter = $("<div class='card-footer d-flex justify-content-between'>");
		articleFooter.append($("<button>").addClass('btn btn-sm btn-outline-primary').attr('data-toggle','modal').attr('data-target','#commentsModal').attr('data-article', data[i]._id).html("<span class='fas fa-comments'></span>"));
	
		let saveBtn = $("<button>").addClass('btn btn-sm btn-outline-primary save-btn').attr('data-article',data[i]._id).html("<span class='fas fa-save'></span>");
		saveBtn.on('click', () => {
			saveArticle(saveBtn.attr('data-id'));
		});
		articleFooter.append(saveBtn);
	
		articleCard.append(articleBody, articleFooter);
		cardGroup.append(articleCard)
	}
	$("#articles").prepend($('<hr class="my-4">'), cardGroup);
	cardGroup.hide().slideDown(500);
}

function saveArticle(article) {
	console.log(article);
}

// On page load
$.get('/articles', data => {
	if(data.length==0) scrapeArticles();
	else getArticles();
});