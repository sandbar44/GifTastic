// GIFTASTIC
//
// Psuedo Code
// [X] Ready document
// [X] Global variable: 'topics' = reactions
// [X] Loop: Append button for each topic in array
// [X] On button click: Grab 10 static, non-animated gif images from GIPHY API and place them on the page
// [X] On gif click: Animate gif (or pause gif)
// [X] Under every gif: Display rating (PG, G, etc.)
// [X] Form:
//      [X] Take value from a user input box and add to `topics` array
//      [X] Function call takes each topic in the array remakes the buttons on the page
// 
// Bonus Psuedo
// [X] Mobile responsive
// [X] List more metadata (title, tags, etc)
// 

// READY DOCUMENT
$(document).ready(function () {

    // GLOBAL VARIABLES
    // ==================================================
    var topics = ['laughing', 'good job', 'whatever', 'what',
        'thank you', 'excited', 'mad', 'bye', 'facepalm', 'shrug',
        'waiting', 'shame', 'eye roll', 'popcorn', 'confused', 'applause'];

    // EXECUTE
    // ==================================================

    // Function for display gifs when topic button is clicked
    function displayGifs() {
        var topic = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&limit=10&rating=pg&api_key=JEf4xV2eQPQwyHxZYcn769Z9scHPAYoh";

        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // Empty the contents of gif div
            $("#gif-view").empty();

            // Call function to fetch gifs
            for (i = 0; i < 10; i++) {
                var gifDiv = $("<div class='gif-div'>");
                var title = $("<h2>").text(response.data[i].title);
                var rating = $("<h3>").text("Rating: " + response.data[i].rating);
                var gifStill = response.data[i].images.fixed_height_still.url;
                var gifAnimate = response.data[i].images.fixed_height.url;

                var gifImg = $("<img>").attr({
                    "src": gifStill,
                    "data-still": gifStill,
                    "data-animate": gifAnimate,
                    "data-state": "still",
                    "class": "gif"
                });

                // Append the new gif results
                gifDiv.append(gifImg, title, rating);
                $("#gif-view").append(gifDiv);

            }
        })

    };

    // Function for displaying buttons
    function renderButtons() {

        // Deleting the buttons prior to adding new buttons
        // (this is necessary to prevent repeat buttons)
        $("#gif-btns").empty();

        // Loop through the array of topics
        for (var i = 0; i < topics.length; i++) {

            // Then dynamicaly generate buttons for each topic in the array
            var a = $("<button type='button' class='btn'>");
            // Providing the initial button text
            a.text(topics[i]);
            // Adding a class of topic-btn to our button
            a.addClass("gif-btn");
            // Adding a data-attribute
            a.attr("data-name", topics[i]);

            // Adding the button to the buttons div
            $("#gif-btns").append(a);
        }
    };

    // Function for handling events where a gif is clicked
    function clickGifs() {
        // Get data-state of clicked gif
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    };

    // Function for adding a new Gif button
    $("#add-gif").on("click", function (event) {
        event.preventDefault();

        // Grab  input from the textbox
        var gif = $("#gif-input").val().trim();
        
        // Adding movie from the textbox to our array
            if (gif !== "") {                
                topics.push(gif);
            } 

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();

        $("#gif-form").trigger("reset");
    });


    // Click event listener to all elements with a class of "gif-btn"
    $(document).on("click", ".gif-btn", displayGifs);

    // Click event listener to all elements with a class of "gif"
    $(document).on("click", ".gif", clickGifs);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();

})