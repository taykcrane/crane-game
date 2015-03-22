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
	answers: ["Home cooked meals", "Chapstick", "Relationship advice"],
	correctAnswer: "Chapstick"
}

var question4 = {
	questionText: "What is Taylor's beverage of choice?",
	answers: ["A beer", "An Apple-tini", "A cappuccino with heart-shaped foam", "Apple juice"],
	correctAnswer: "Apple juice"
}

var question5 = {
	questionText: "On Saturdays, Taylor is most likely to be found where?",
	answers: ["Engaging his creative side at the MoMa", "Building this stupid fucking website", "Brunching with his favorite betches", "Going for a run hahahahaha"],
	correctAnswer: "Building this stupid fucking website"
}

var question6 = {
	questionText: "Taylor is about to be sent to a deserted island but is allowed to bring one thing with him. What does he bring?",
	answers: ["Alcohol", "Weed", "A girlfriend", "A dozen bagels", "WiFi"],
	correctAnswer: "WiFi"
}

var question7 = {
	questionText: "Which of the following has Taylor NEVER had?",
	answers: ["Friends", "Leggings", "A coffee", "Kangaroo meat", "An android phone"],
	correctAnswer: "A coffee"	
}

var question8 = {
	questionText: "Which of the following bands does Taylor despise?",
	answers: ["The Postal Service", "30 Seconds to Mars", "Rise Against", "Kings of Leon", "Linkin Park"],
	correctAnswer: "The Postal Service"
}

var question9 = {
	questionText: "What does Taylor's favorite jacket say about him?",
	answers: ['Something that says "Dad likes leather"', "He's from Canada, eh?"],
	correctAnswer: 'Something that says "Dad likes leather"'
}

var question10 = {
	questionText: "Which of the following is something Taylor wants to do before he dies?",
	answers: ["Go skydiving", "Spend a night in jail", "Own a motorcycle", "Share a kiss atop the Eiffel Tower"],
	correctAnswer: "Own a motorcycle"
}

//Shuffles my list of questions
function shuffle (o) {
	for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

var myQuestions = shuffle([question1, question2, question3, question4, question5, question6, question7, question8, question9, question10]);

//Declares a function to place a Question Object into the UI. The function takes the position of the question in the myQuestions array, defined as q
function insertQuestion(q) {
	$(".question-text").text(myQuestions[q].questionText);
	$(".answers").empty();
	for (var i = 0; i < myQuestions[q].answers.length; i++) {
		var answerLI = myQuestions[q].answers[i];
		var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"];
		var letterLI = alphabet[i];
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
	if ($(this).hasClass("selected")) {
		updateScore();
		updateProgress();
		updateStreak();
		updateMessage();
		toFinish();
		qNum++;
		increaseqNum();
		if (qNum < myQuestions.length) {
			insertQuestion(qNum);
			$(".submit").removeClass("selected");
		} else {
			moveQuestions();
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

//Declares a function that increments the question number
function increaseqNum () {
	console.log("qnumtest");
	if (qNum < 10) {
		$(".number span").text(qNum + 1);
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

//Declares a function that calculates the user's steak
var winStreak = 0;
var loseStreak = 0;
function updateStreak () {
	if (checksAnswer()) {
		loseStreak = 0;
		winStreak++;
		console.log("winStreak is " + winStreak);
		console.log("loseStreak is " + loseStreak);
	} else {
		winStreak = 0;
		loseStreak++;
		console.log("winStreak is " + winStreak);
		console.log("loseStreak is " + loseStreak);
	}
}

//Updates the message based on the user's streak
var $myMessage = $(".instructions p");
function updateMessage () {
	if (winStreak === 1) {
		$myMessage.text("Alright, not bad. Not good yet, but not bad.");
	} else if (winStreak === 2) {
		$myMessage.text("OK OK, pretty good. Let's see if you can keep it up though.");
	} else if (winStreak === 3) {
		$myMessage.text("This user's on fiyahhhhh - Alicia Keys");
	} else if (winStreak === 4) {
		$myMessage.text("This is pretty impressive, not gonna lie. Did you study for this?");
	} else if (winStreak === 5) {
		$myMessage.text("OK yea, you studied. The bad news is you don't get anything for a good score.");
	} else if (winStreak === 6) {
		$myMessage.text("I'm beginning to suspect you of cheating.");
	} else if (winStreak === 7) {
		$myMessage.text("You know me very well. Maybe we should get married? Wait are you a boy or a girl?");
	} else if (winStreak === 8) {
		$myMessage.text("Hi mom! Good job so far.");
	} else if (winStreak === 9) {
		$myMessage.text("FINISH HIM...!");
	} else if (winStreak === 10) {
		$myMessage.text("http://media0.giphy.com/media/PUBxelwT57jsQ/200.gif");
	} else if (loseStreak === 1) {
		$myMessage.text("It's okay, just do better next question.");
	} else if (loseStreak === 2) {
		$myMessage.text("I have faith in you, come on. Unleash your inner Crane.");
	} else if (loseStreak === 3) {
		$myMessage.text("You're doing bad. And you should feel bad.");
	} else if (loseStreak === 4) {
		$myMessage.text("I'm regretting sending you the link to complete this quiz.");
	} else if (loseStreak === 5) {
		$myMessage.text("GET ONE MORE WRONG AND WATCH WHAT HAPPENS.");
	} else if (loseStreak === 6) {
		$myMessage.text("Aaannnnndddd... we're no longer friends.");
	} else if (loseStreak === 7) {
		$myMessage.text("OK you're just tanking now, aren't you?");
	} else if (loseStreak === 8) {
		$myMessage.text("There are two questions left, but maybe you should just... not.");
	} else if (loseStreak === 9) {
		$myMessage.text("You're embarrassing yourself.");
	} else if (loseStreak === 10) {
		$myMessage.text("http://www.quickmeme.com/img/c3/c366ecb1df0098ca3249d3bd69f87c06451bcfc7b03953a6c322e063402ecb83.jpg");
	}
}

//Changes the "next" button to say "finish" on the last question
function toFinish () {
	if (qNum === myQuestions.length - 2) {
		$(".submit").text("finish");
		console.log("next changed to finish");
	}

}

//Once the last question is answered, animate the questions off to the right
//And then moves the congrats message in from the left
//Adds the correct score to the congrats message
function moveQuestions () {
	$(".message").animate({
		left: "200%"
	}, 500, function () {
		$(".message").css("display", "none");
	})
	$(".question-box").animate({
		left: "200%"
	}, 500, function () {
		$(".question-box").toggle();
		$(".congrats span").text(score);
		$(".congrats").animate({
			left: "0%"
		}, 500)
	})
}

//When the "Play again?" button is clicked, start a new game
$(".congrats h5").on("click", function () {
	console.log("He's playin again!");
	shuffle(myQuestions);
	insertQuestion(0);
	qNum = 0;
	$(".number span").text("1");
	score = 0;
	$(".score span").text(score);
	myWidth = 0;
	$(".percentage").css("width", "0%");
	myProgress = 0;
	$(".completion span").text("0");
	winStreak = 0;
	loseStreak = 0;
	$(".instructions p").text("I'm going to ask you a series of questions. The better you do, the more I will like you.");
	$(".submit").text("next");
	$(".submit").removeClass("selected");
	$(".congrats").animate({
		left: "-200%"
	}, 500, function () {
		$(".question-box").toggle();
		$(".question-box").animate({
			left: "0%"
		}, 500)
		var mq = window.matchMedia('@media screen and (max-width: 700px)');
		if(mq.matches) {
		   console.log("less than 700px");
		} else {
			console.log("bigger than 700px");
		    $(".message").toggle();
			$(".message").animate({
				left: "0%"
			}, 500)
		}
	})
})

