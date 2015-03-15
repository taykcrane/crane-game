// When the "I'm Ready" button is clicked, the game screen moves into view

$(document).ready(function() {
	$("#im-ready").on("click", function() {
		$(".play-game").animate({
			top: "-40%"
		}, 500, "linear")
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
	correctAnswer: "He doesn't have one"
}

var question2 = {
	questionText: "Taylor's favorite burger from Bareburger is:",
	answers: ["Maui Waui", "Roadhouse", "Western", "Supreme", "Taylor's actually a vegan"],
	correctAnswer: "Maui Waui"
}

var question3 = {
	questionText: "If Taylor were a startup, he'd be the Uber for __________:",
	answers: ["Answer 1", "Answer 2", "Answer 3"],
	correctAnswer: "Answer 2"
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
var qNum = 0; //where 0 is the FIRST question in the array
$(".submit").on("click", function () {
	updateScore();
	updateProgress();
	if ($(this).hasClass("selected")) {
		qNum++;
		if (qNum < myQuestions.length) {
			insertQuestion(qNum);
			console.log(qNum);
			$(".submit").removeClass("selected");
		} else {
			console.log("I got no more!");
			return;
		};		
	} else {
		console.log("no selection");
		return;
	}

})

//Highlights a chosen answer in blue
$(".answers").on("click", "li", function () {
	$("li").removeClass("selected");
	$(this).addClass("selected");
	$(".submit").addClass("selected");
});

//Declares a function that checks whether or not the selected answer is correct.
function checksAnswer () {
	var rawSelection = $("li.selected").text();
	var selection = rawSelection.substring(1, rawSelection.length + 1);
	if (selection === myQuestions[qNum].correctAnswer) {
		console.log("You got it right");
		return true;
	} else {
		console.log("You got it wrong");
		return false;
	}
}

//Declares a function that updates the score after an answer was submitted
var score = 0;
function updateScore () {
	if (checksAnswer()) {
		console.log("score++");
		score++;
		$(".score span").text(score);
	} else {
		console.log("no score");
	}
}

//Declares a function that updates the progress bar after every answer is submitted
var myWidth = 0;
var myProgress = 0;
function updateProgress () {
	console.log("width before: " + myWidth);
	if (myWidth < 99.9999) {
		myWidth = myWidth + 1 / myQuestions.length * 100;
		var widthPercentage = myWidth + "%"; 
		$(".percentage").css("width", widthPercentage);
		myProgress = myWidth;
		myProgress = Math.round(myProgress);
		$(".completion span").text(myProgress);
	} else {
		console.log("already at 100%");
	}
	console.log("width after: " + myWidth);
}

//Declares a function that updates the message box with the appropriate message
var winStreak = 0;
var loseStreak = 0;
function updateMessage () {
	if (winStreak )
}





