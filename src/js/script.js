$( document ).ready(function() {

    var words = [{
        word: [
            ["", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "O", "O", "S", "T", " ", "W", "E", "S", "T", "", "", ""],
            ["", "T", "H", "U", "I", "S", "", "V", "E", "R", "P", "E", "S", "T"],
            ["", "", "", "", "", "", "", "", "", "", "", ""]
        ],
        topic: "Verspreekwoord",
        answer: "rad van chagrijn"
    }

    ]; // Close words

    var currentWordIndex = 0;

    var alphabet = ("abcdefghijklmnopqrstuvwxyz").toUpperCase();

    var wrong = "";
    var currentWord = "";
    var lettersGuessed = [];
    var score = 0;
    var isGameOver = 0;
    var vowels = /[aeiou]/i;
    var letterOptions = makeLetters(alphabet);

    // Create 26 buttons for each of the letters in the alphabet
    $.each(letterOptions, function(index, value) {
        var button = $('<button class="alphabet">' + value.name + "</button>");
        $("#letters_section").append(button);
    });

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
    }

    // clear and hide all necessary values to reset game
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
        // remove the disabled attribute from all 26 letter buttons
        $(".alphabet").each(function(index) {
            $(this).removeAttr("disabled");
            // console.log(index);
        });
        $(".alphabet").hide();
        $("#play").fadeIn();
    }

    function playGame() {
        currentWord = words[currentWordIndex].word;
        var clue = $('<p class="clue"></p>');
        var div = $(".box");

        var counter = 0;

        // Show some stuff
        $("#spin").fadeIn(200);
        $("#hint_section").fadeIn(200);
        $("#hint_section").css("webkit-animation-iteration-count", "3");

        // Reset score
        $("#spin_container").html('<p id="spin_value"></p>');
        $("#spin_btn").addClass("animated pulse");
        $("#spin_btn").css("webkit-animation-iteration-count", "infinite");


        for (var i = 0; i < currentWord.length; i++) {

            for (var ie = 0; ie < currentWord[i].length; ie++) {
                var currentLetter = currentWord[i][ie];
                //Build current word
                // make the p element
                var p = $("<p></p>");
                // hide the letter by changing display if not blank
                if (currentLetter === " ") {
                    p.css("display", "block")
                } else {
                    p.css("display", "none");
                }

                p.addClass("letter");
                p.addClass(currentLetter);
                p.text(currentLetter);
                p.appendTo(div[counter]);
                if (currentLetter !== " " && currentLetter !== "") {
                    $(div[counter]).addClass("active");
                }
                counter++;
            }
        }
        clue.text("Hint: " + words[currentWordIndex].topic).fadeIn(300);
        $("#board").append(clue);
    };

    $("#play").on("click", function() {
        $(this).fadeOut(200);
        $("#solve_btn").show();
        $("#spin_btn").show();
        $("#reveal_btn").show();
        $("#next_btn").show();
        playGame();
    }); // end of click event for play

    // Player guesses
    $(".alphabet").on("click", function() {
        var occurences = 0;
        var guess = $(this).text();
        console.log(guess);
        $(this).attr("disabled", true);
        if ($("p").hasClass(guess)) {
            // $("p." + guess).parent().css("background-color", "blue").delay(800).css("background-color", "white");
            $("p." + guess).fadeIn();

            if (guess.match(vowels)) {
                // Get the amount of occurences of the letter in the word
                occurences = $("p." + guess).length;
            } else {
                // Get the amount of occurences of the letter in the word
                occurences = $("p." + guess).length;
            }
            // Update score with numerical value of spin value
            $(".score_value").text(score);
            // not DRY
            $("#spin_btn").removeAttr("disabled");

        } else {
            // They get the answer wrong

            // not DRY
            $("#spin_btn").removeAttr("disabled");
        } // end of if statement, else block

        if ($(".letter[style='display: none;']").length === 0 && isGameOver !== 1) {
            alert("Je bent al gewonnen, kwibus!");
        }
    }); // end of click event for player guess

    // Player clicks spin
    $("#spin").on("click", function() {
        $("#hint_section").css("visibility", "hidden");
        $(".alphabet").fadeIn();
        $("#spin_value").css("webkit-animation-duration", ".4s");
        $("#spin_btn").toggleClass("animated pulse");
        $("#spin_btn").attr("disabled", "disabled");
        $("#solve").fadeIn();

    }); // end of click event for spin button

    $("#solve_btn").on("click", function() {
        var userAnswer = (prompt("Wat is het antwoord?")).toUpperCase();
        if (userAnswer === words[currentWordIndex].answer.toUpperCase()) {
            $(".letter").css("display", "block");
            alert("Hoera! Juist!");
        } else {
            alert("Nope!!!!!");
        }
    }); // end of click event for solve button

    $("#next_btn").click(function() {
        currentWordIndex = currentWordIndex < words.length - 1 ? ++currentWordIndex : 0;
        resetGame();
        playGame();
        $("#play").hide();
    });

    $("#reveal_btn").click(function() {
        $(".letter").each(function() {
            $(this).fadeIn();
        });

    });

    $(".score_minus").click(function() {
       var score = $(this).parent().find(".score_value").first();
       if (score.text() !== '0') {
           score.text(Number(score.text()) - 50);
       }
    });

    $(".score_plus").click(function() {
        var score = $(this).parent().find(".score_value").first();
        score.text(Number(score.text()) + 50);
    });
    //Start the game
    playGame();
});
