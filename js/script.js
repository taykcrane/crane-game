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
	qNum: 1,
	questionText: "Taylor's middle name is:",
	answers: ["K", "Kaleidescope", "Khaleesi", "He doesn't have one"],
	correctAnswer: 3
}

var question2 = {
	qNum: 2,
	questionText: "Taylor's favorite burger from Bareburger is:",
	answers: ["Maui Waui", "Roadhouse", "Western", "Supreme", "Taylor's actually a vegan"],
	correctAnswer: 0
}

//Randomizes my list of questions
function qRandomize () {
	
}

