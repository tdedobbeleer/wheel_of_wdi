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
    }, {
        word: "For Loop",
        topic: "Thing"
    }, {
        word: "Function",
        topic: "Thing"
    }, {
        word: "Marc Wright",
        topic: "Person"
    }, {
        word: "Shawn Johnson",
        topic: "Person"
    }]; // Close words

    var boardValues = [100, 500, 400, 300, 200, 100, 200, 150, 450, 400, 250,
        200, 150, 400, 600, 250, 300, "BANKRUPT", 750, 250, 300, 200
    ];

    var alphabet = ("abcdefghijklmnopqrstuvwxyz").toUpperCase();

    var wrong = "";
    var currentWord = "";
    var lettersGuessed = [];
    var score = 0;
    var isGameOver = 0;
    var vowels = /[aeiou]/i;
    var letterOptions = makeLetters(alphabet);

    $.each(letterOptions, function(index, value) {
        var button = $('<button class="alphabet">' + value.name + "</button>");
        $("#letters_section").append(button);
    })

    $(".score_value").text(score);
    // Hide some stuff before user selects to play
    $(".alphabet").hide();
    $("#guess_section").hide();
    $("#spin").hide();
    $("#solve").hide();
    $("#hint_section").hide();

    function makeLetters(word) {
        return word.split("").map(function(letter) {
            return {
                name: letter,
                chosen: false
            };
        });
    };

    function resetGame() {
        score = 0;
        $(".score_value").text(score);

        $("#guess_section").hide();
        $("p.letter").remove();
        wrong = "";
        $("p.wrong").text(wrong);
        $("#spin").hide();
        $("#solve").hide();
        $("#spin_btn").removeAttr("disabled");
        $("#spin_btn").removeClass("animated pulse");
        $("#spin_value").remove();
        $("div.box").removeClass("active");
        $(".name").text("");
        $(".clue").remove();
        $("#play").fadeIn();
        $(".alphabet").each(function(index) {
            $(this).removeAttr("disabled");
            // console.log(index);
        });
        $(".alphabet").hide();
    };

    function playGame() {
        var playerName = prompt("What is your name?") || "John Doe";
        var rand = Math.floor(Math.random() * words.length);
        currentWord = words[rand].word.toUpperCase();
        // console.log(currentWord);
        var clue = $('<p class="clue"></p>');
        var splitWord = currentWord.split("");
        var div = $(".box");
        isGameOver = 0;

        // Show some stuff
        $("#spin").fadeIn(200);
        $("#hint_section").fadeIn(200);
        $("#hint_section").css("webkit-animation-iteration-count", "3");

        // Reset score
        $(".score_value").text(score);
        $("#spin_container").html('<p id="spin_value"></p');
        $("#spin_btn").addClass("animated pulse");
        $("#spin_btn").css("webkit-animation-iteration-count", "infinite");


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
            p.appendTo(div[i + 13]);
            if (splitWord[i] !== " ") {
                $(div[i + 13]).addClass("active");
            }

        };
        clue.text(words[rand].topic).fadeIn(300);
        $(".name").fadeIn().text(playerName);
        $("#board").append(clue);
    };

    $("#play").on("click", function() {
            $(this).fadeOut(200);
            playGame();

        }) // end of click event for play

    // Player guesses
    $(".alphabet").on("click", function() {
        var occurences = 0;
        var guess = $(this).text();
        console.log(guess);
        $(this).attr("disabled", true);
        if ($("p").hasClass(guess)) {
            // $("p." + guess).parent().css("background-color", "blue").delay(800).css("background-color", "white");
            $("p." + guess).css("display", "block");

            if ($("#spin_value").text() === "BANKRUPT") {
                $(".score_value").text("0");
            } else if (guess.match(vowels)) {
                // Get the amount of occurences of the letter in the word
                occurences = $("p." + guess).length;
                score -= (parseInt($("#spin_value").text(), 10) * occurences);
            } else {
                // Get the amount of occurences of the letter in the word
                occurences = $("p." + guess).length;
                score += (parseInt($("#spin_value").text(), 10) * occurences);
            }
            // Update score with numerical value of spin value
            $(".score_value").text(score);
            // not DRY
            $("#spin_btn").removeAttr("disabled");

        } else {
            // They get the answer wrong

            // Add to the display of X's
            wrong += "X";
            $(".wrong").append("X");
            if (wrong === "XXX") {
                // Let the poor guy or gal at least see the letters
                $(".letter").css("display", "block");
                alert("Sorry you lose");
                resetGame();
                isGameOver = 1;
            } // end of inner if block
            // not DRY
            $("#spin_btn").removeAttr("disabled");
        } // end of if statement, else block

        $(".alphabet").fadeOut(100);
        $("#solve").fadeOut(100);


        $("#spin_btn").toggleClass("animated pulse");


        if ($(".letter[style='display: none;']").length === 0 && isGameOver !== 1) {
            alert("Congrats, you win $" + score + "!");
            resetGame();
        }
    }); // end of click event for player guess

    // Transform all user input to uppercase
    $("#guess").on("keyup", function() {
            $(this).val(($(this).val()).toUpperCase());
        }) // end of guess keyup event

    // Player clicks spin
    $("#spin").on("click", function() {
            var rand = Math.floor(Math.random() * boardValues.length);
            $("#hint_section").css("visibility", "hidden");
            $(".alphabet").fadeIn();
            $("#spin_container").html('<p id="spin_value">' + boardValues[rand] + '</p>');
            $("#spin_value").css("webkit-animation-duration", ".4s");
            $("#spin_btn").toggleClass("animated pulse");
            $("#spin_btn").attr("disabled", "disabled");
            $("#solve").fadeIn();
            if ($("#spin_value").text() === "BANKRUPT") {
                $(".score_value").text("0");
                score = 0;
                $("#spin_btn").removeAttr("disabled");
                // $("#guess_section").fadeIn(500);
            }

        }) // end of click event for spin button

    $("#solve_btn").on("click", function() {
        var userAnswer = (prompt("What is the answer?")).toUpperCase();
        if (userAnswer === currentWord) {
            $(".letter").css("display", "block");
            alert("Congrats, you win $" + score + "!");
            resetGame();
        } else {
            alert("Nope");
        }
    }); // end of click event for solve button
});
