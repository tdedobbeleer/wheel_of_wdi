$(document).ready(function() {

    var words = [{
        word: "JavaScript",
        topic: "Thing"
    }, {
        word: "CSS",
        topic: "Thing"
    }, {
        word: "Jarrett Coger",
        topic: "Person"
    }, {
        word: "Mike Hopper",
        topic: "Person"
    }, {
        word: "HTML",
        topic: "Thing"
    }]; // Close words


    function playGame() {
        var rand = Math.floor(Math.random() * words.length);
        var currentWord = words[rand].word.toUpperCase();
        var clue = $('<p class="clue"></p>');
        var splitWord = currentWord.split("");
        var div = $(".box");
        console.log(div);

        for (var i = 0; i < splitWord.length; i++) {

            // make the p element
            var p = $("<p></p>");
            // hide the letter
            p.css("display", "none");
            p.addClass("letter");
            p.addClass(splitWord[i]);
            p.text(splitWord[i]);
            console.log(div[i]);
            p.appendTo(div[i + 13]);
            console.log(div[i]);
            $(div[i + 13]).addClass("active");
            // $("#board").append(div);

        };
        clue.text(words[rand].topic);
        $("#board").append(clue);
    };

    $("#play").on("click", function (){
      $(this).fadeOut(100);
      playGame();

    })




});
