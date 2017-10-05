$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
  });

  $.ajax({
    method: "GET",
    url: "/articles/"
  }).done(function(data) {
    console.log(data);
    // The title of the article
    $("#notes").append("<h2>" + data.title + "</h2>");
    // An input to enter a new title
    $("#notes").append("<input id='titleinput' name='title' >");
    // A textarea to add a new note body
    $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
    // A button to submit a new note, with the id of the article saved to it
    $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>")

    });