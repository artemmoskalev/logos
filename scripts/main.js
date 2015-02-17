/* method for preloading the resources */
function loadResources() {	
	//this variable counts how many images have been loaded
	var loadcount = 0;
	// shows the loading gif
	$("#loadimg").css({"display":"block"});
	// when all the images are loaded - show the logo and main screens
	$(".resource").load(function() {
		loadcount = loadcount + 1;
		if (loadcount == $(".resource").length) {
			$("#loadimg").css({"display":"none"});
			showSplashScreen();
		}
	});
}

/* logo animation at the start of the game */
function showSplashScreen() {
	$("#load_logo").css("display", "block");
	$("#load_logo").css("opacity", "0.0");
	$("#load_logo").animate({"opacity" : "1.0"}, 0, function() {
		$("#load_logo").animate({"opacity" : "0.0"}, 0, function() {
			$("#load_logo").css("display", "none");
			$("#game_menu").css("opacity", "0.0");
			$("#game_menu").css("display", "block");
			$("#game_menu").animate({"opacity" : "1.0"}, 0);
		});
	});
}