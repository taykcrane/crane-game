// When the "I'm Ready" button is clicked, the game screen moves into view

$(document).ready(function() {
	$("#im-ready").on("click", function() {
		$(".play-game").animate({
			top: "-40%"
		}, 500, "easeInOutCubic")
		$(".game-screen").show();
		$(".game-screen").animate({
			height: "100%"
		}, 500, "linear", function() {
			$(".footer").show();
			$(".footer").animate({
				bottom: "0"
			}, 1000, "easeOutElastic")
		})
	});
});

//My question objects
var question1 = {
	questionText: "What is Taylor's middle name?",
	answers: ["K", "Kaleidescope", "Khaleesi", "He doesn't have one"],
	correctAnswer: 3
}

var question2 = {
	questionText: "Taylor's favorite burger from Bareburger is:",
	answers: ["Maui Waui", "Roadhouse", "Western", "Supreme", "Taylor's actually a vegan"],
	correctAnswer: 0
}

var question3 = {
	questionText: "If Taylor were a startup, he'd be the Uber for __________:",
	answers: ["Answer 1", "Answer 2", "Answer 3"],
	correctAnswer: 1
}

//Shuffles my list of questions
function shuffle (o) {
	for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

var myQuestions = shuffle([question1, question2, question3]);
console.log(myQuestions);

//Declares a function to place a Question Object into the UI. The function takes the position of the question in the myQuestions array, defined as q
function insertQuestion(q) {
	$(".question-text").text(myQuestions[q].questionText);
	$(".answers").empty();
	for (var i = 0; i < myQuestions[q].answers.length; i++) {
		var answerLI = myQuestions[q].answers[i];
		var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"];
		var letterLI = alphabet[i];
		console.log(letterLI + "-" + answerLI);
		$(".answers").append("<li><span class='letter'>" + letterLI + "</span>" + answerLI + "</li>");
	}
}

//Adds the first question and answers to the UI on load
$(document).ready(function() {
	insertQuestion(0);
})


//When the next button is hit, cycle through questions
var qNum = 1; //where 1 is the SECOND question in the array
$(".submit").on("click", function () {
	insertQuestion(qNum);
	qNum++;
})







