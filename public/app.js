$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#articles").append("<p data-id='" + data[i]._id + "'>" + "Title: " + data[i].title + "<br />" + "Link: " + data[i].link + "</p>");
    }
  });
