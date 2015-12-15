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
        200, 150, 400, 600, 250, 300, "BANKRUPT", 750, 250, 300, 200
    ];

    var alphabet = "abcdefghijklmnopqrstuvwxyz";
    console.log(alphabet.length)

    var wrong = "";
    var currentWord = "";
    var lettersGuessed = [];
    var score = 0;
    var isGameOver = 0;

    var alpha = /[a-zA-Z]/;
    var vowels = /[aeiou]/i;

    $(".score_value").text("0");
    // Hide some stuff before user selects to play
    $("#guess_section").hide();
    $("#spin").hide();
    $("#solve").hide();

    function makeLetters(word) {
        return word.split("").map(function(letter){
            return {name: letter, chosen: false};
        });
    };

    function resetGame() {
        lettersGuessed = [];
        $("p.letters_guessed").remove();
        score = 0;
        $(".score_value").text("");
        $("#guess_section").hide();
        $("p.letter").remove();
        $("p.wrong").text("");
        $("#spin").hide();
        $("#solve").hide();
        $("#spin_btn").removeAttr("disabled");
        $("#spin_value").remove();
        $("div.box").removeClass("active");
        $(".name").text("");
        $(".clue").remove();
        $("#play").show();
    };

    function playGame() {
        var playerName = prompt("What is your name?") || "John Doe";
        var rand = Math.floor(Math.random() * words.length);
        currentWord = words[rand].word.toUpperCase();
        console.log(currentWord);
        var clue = $('<p class="clue"></p>');
        var splitWord = currentWord.split("");
        var div = $(".box");
        isGameOver = 0;

        var letterOptions = makeLetters(alphabet);
        console.log(letterOptions);

        // Show some stuff
        $("#spin").show();
        $("#solve").show();
        $(".score_value").text("0");
        $("#spin_container").html('<p id="spin_value"></p');
        $("#spin_btn").toggleClass("animated pulse");
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
            // console.log(div[i]);
            p.appendTo(div[i + 13]);
            // console.log(div[i]);
            if (splitWord[i] !== " ") {
                $(div[i + 13]).addClass("active");
            }
            // $("#board").append(div);

        };
        clue.text(words[rand].topic).fadeIn(300);
        $(".name").text(playerName);
        $("#board").append(clue);
    };

    $("#play").on("click", function() {
        $(this).fadeOut(200);
        playGame();

    }) // end of click event for play

    // Player guesses
    $("#submit").on("click", function(event) {
        event.preventDefault();

        var occurences = 0;
        var guess = $("#guess").val();
        guess = guess.toUpperCase();
        if (guess.length > 1) {
            // They try to put more than one letter in at a time
            alert("You may only enter one letter at a time");
            $("#guess").val("");
            return;
        } else if (guess.match(alpha)) {
            // They get the answer correct
            if ($("p").hasClass(guess)) {
                // $("p." + guess).parent().css("background-color", "blue").delay(800).css("background-color", "white");
                $("p." + guess).css("display", "block");

                if ($("#spin_value").text() === "BANKRUPT") {
                    $(".score_value").text("0");
                } else if ( guess.match(vowels)) {
                    // Get the amount of occurences of the letter in the word
                    occurences = $("p." + guess).length;
                    score -= ( parseInt($("#spin_value").text(), 10) * occurences);
                } else {
                    // Get the amount of occurences of the letter in the word
                    occurences = $("p." + guess).length;
                    score += ( parseInt($("#spin_value").text(), 10) * occurences);
                }

                console.log(occurences);
                console.log(currentWord);
                // Update score with numerical value of spin value

                $(".score_value").text(score);
                $("#spin_btn").removeAttr("disabled");
                $("#guess_section").fadeOut(200);
            // They get the answer wrong
            } else {
                wrong += "X";
                console.log()
                $(".wrong").append("X");
                $("#spin_btn").removeAttr("disabled");
                $("#guess_section").fadeOut(200);
                if (wrong === "XXX") {
                    alert("Sorry you lose");

                    resetGame();
                    isGameOver = 1;
                }
            } // end of if statement, else block

            // update letters guessed array to display to user
            lettersGuessed.push(guess);
            $(".letters_guessed").text(lettersGuessed.toString());

            $("#spin_btn").toggleClass("animated pulse");
            // clear textbox
            $("#guess").val("");

            if ( $(".letter[style='display: none;']").length === 0 && isGameOver !== 1) {
                alert("Congrats, you win $" + score + "!");
                resetGame();
            }
        } else {
            // user has entered a value but value was not a letter
            $("#guess").val("");
            alert("You must enter a letter");
        } // end of else block
    }); // end of click event for player guess

    // Transform all user input to uppercase
    $("#guess").on("keyup", function() {
        $(this).val(($(this).val()).toUpperCase());
    }) // end of guess keyup event

    // Player clicks spin
    $("#spin").on("click", function() {
        var rand = Math.floor(Math.random() * boardValues.length);
        $("#spin_container").html('<p id="spin_value" class="animated fadeInDownBig">' + boardValues[rand] + '</p>');
        $("#spin_value").css("webkit-animation-duration", ".4s");
        $("#spin_btn").toggleClass("animated pulse");
        $("#spin_btn").attr("disabled", "disabled");
        if ($("#spin_value").text() === "BANKRUPT") {
            $(".score_value").text("0");
            score = 0;
            $("#spin_btn").removeAttr("disabled");
            // $("#guess_section").fadeIn(500);
        } else {
            $("#guess_section").fadeIn(500);
        }
        console.log("Random number is: " + rand);

    }) // end of click event for spin button

    $("#solve_btn").on("click", function() {
        var userAnswer = (prompt("What is the answer?")).toUpperCase();
        if ( userAnswer === currentWord ) {
            alert("Congrats, you win $" + score + "!");
            resetGame();
        } else {
            alert("Nope");
        }
    }); // end of click event for solve button
});
