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

    var boardValues = [100, 500, 400, 300, 200, 100, 200, 150, 450, 400, 250,
                        200, 150, 400, 600, 250, 300, 0, 750, 250, 300, 200]

    function playGame() {
        var playerName = prompt("What is your name?");
        var rand = Math.floor(Math.random() * words.length);
        var currentWord = words[rand].word.toUpperCase();
        var clue = $('<p class="clue"></p>');
        var splitWord = currentWord.split("");
        var div = $(".box");
        var wrong = "";
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
            if (splitWord[i] !== " ") {
                $(div[i + 13]).addClass("active");
            }
            // $("#board").append(div);

        };
        clue.text(words[rand].topic);
        $(".name").text(playerName);
        $("#board").append(clue);
    };

    $("#play").on("click", function (){
      $(this).fadeOut(100);
      playGame();

    })

    $("#submit").on("click", function (event) {
        event.preventDefault();

        var guess = $("#guess").val();
        guess = guess.toUpperCase();

        // clear textbox
        $("#guess").val("");
        if ($("p").hasClass(guess)) {
            $("p." + guess).parent().css("background-color", "blue").delay(800).css("background-color", "white");


            $("p." + guess).css("display", "block");
        }
        console.log(guess);
    });


});
