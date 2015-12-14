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
        200, 150, 400, 600, 250, 300, "Bankrupt", 750, 250, 300, 200
    ];

    var wrong = "";
    var lettersGuessed = [];
    var score = 0;
    var isGameOver = 0;

    var alpha = /[a-zA-Z]/;

    $("#guess_section").hide();

    function resetGame() {
        $("p.letters_guessed").text("");
        $("#guess_section").hide();
        $("p.letter").remove();
        $("p.wrong").text("");
        $("div.box").removeClass("active");
        $(".name").text("");
        $(".clue").remove();
        $("#play").show();
    };

    function playGame() {
        var playerName = prompt("What is your name?") || "John Doe";
        var rand = Math.floor(Math.random() * words.length);
        var currentWord = words[rand].word.toUpperCase();
        var clue = $('<p class="clue"></p>');
        var splitWord = currentWord.split("");
        var div = $(".box");
        isGameOver = 0;
        $("#guess_section").show();
        $(".score_value").text(score);
        console.log(score);
        $("#spin_container").html('<p id="spin_value">' + boardValues[0] + '</hp');
        console.log(div);

        for (var i = 0; i < splitWord.length; i++) {

            // make the p element
            var p = $("<p></p>");
            // hide the letter by changing display if not blank
            if (splitWord[i] === " ") {
                p.css("display", "block")
            } else {
                p.css("display", "none");
            }

            p.addClass("letter");
            p.addClass(splitWord[i]);
            p.text(splitWord[i]);
            // console.log(div[i]);
            p.appendTo(div[i + 13]);
            // console.log(div[i]);
            if (splitWord[i] !== " ") {
                $(div[i + 13]).addClass("active");
            }
            // $("#board").append(div);

        };
        clue.text(words[rand].topic);
        $(".name").text(playerName);
        $("#board").append(clue);
    };

    $("#play").on("click", function() {
        $(this).fadeOut(100);
        playGame();

    })

    // Player guesses
    $("#submit").on("click", function(event) {
        event.preventDefault();

        var guess = $("#guess").val();
        guess = guess.toUpperCase();
        if (guess.length > 1) {
            alert("You may only enter one letter at a time");
            $("#guess").val("");
            return;
        } else if (guess.match(alpha)) {
            if ($("p").hasClass(guess)) {
                // $("p." + guess).parent().css("background-color", "blue").delay(800).css("background-color", "white");
                $("p." + guess).css("display", "block");
            } else {
                wrong += "X";
                $(".wrong").append("X");
                if (wrong === "XXX") {
                    alert("Sorry you lose");
                    resetGame();
                    isGameOver = 1;
                }
            } // end of if statement, else block

            // update letters guessed array to display to user
            lettersGuessed.push(guess);
            $(".letters_guessed").text(lettersGuessed.toString());

            // clear textbox
            $("#guess").val("");

            if ( $(".letter[style='display: none;']").length === 0 && isGameOver !== 1) {
                alert("Congrats, you win!")
                resetGame();
            }
        } else {
            // user has entered a value but value was not a letter
            $("#guess").val("");
            alert("You must enter a letter");
        } // end of else block
    });

    $("#spin_btn").on("click", function() {

    })

});
