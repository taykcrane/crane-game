$(document).ready(function() {
	$("#im-ready").on("click", function() {
		$(".play-game").animate({
			top: "-40%"
		}, 500)
		$(".game-screen").toggle();
		$(".game-screen").animate({
			height: "80vh"
		}, 500, "linear")
	})
});