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
    }]; // Close words


    function playGame() {
        var rand = Math.floor(Math.random() * words.length);
        var currentWord = words[rand].word.toUpperCase();
        console.log(typeof currentWord);
        splitWord = currentWord.split("");

        for (var i = 0; i < splitWord.length; i++) {
            var div = $("<div></div>");
            div.addClass("box");
            var p = $("<p></p>");
            p.addClass("letter")
            p.text(splitWord[i]);
            div.append(p);
            $("#container").append(div);

        };
    };

    $("#play").on("click", function (){
      $(".box").remove();
      playGame();
    })




});
