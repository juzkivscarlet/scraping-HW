$.get('/articles', data => {
    for(let i=0; i<data.length; i++) {
        var articleCard = $("<div class='card'>").data('id',data[i]._id);
        articleCard.append($("<img class='card-img-top'>").attr('src',data[i].image).attr('alt','Article thumbnail'));

        var articleBody = $("<div class='card-body'>");
        articleBody.append($("<h5 class='card-title'>").text(data[i].title));
        articleBody.append($("<a>").attr('href',data[i].link).attr('target','_blank').text("Read on loudwire.com"));

        articleCard.append(articleBody);
        $("#articles").append(articleCard);
    }
});

