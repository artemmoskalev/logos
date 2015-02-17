NUMBER_OF_TILES = 24;
//this is your score
var score = 0;
// this function turns over the tile showing tick
function performCardRotation(card) {
	$(card).animate({
		width : 0,
		height : 110,
		marginLeft : 55,
		marginRight : 55
	}, 500, function() {
		$(card).attr("src", "image/tick.png");
		$(card).unbind();
		$(card).animate({
			width : 110,
			marginLeft : 0,
			marginRight : 0
		}, 500);
		$(card).css("cursor", "default");
	});
}
				
function Tile(src, name, tilescore) {
				
	this.tilescore = tilescore;
	this.src = src;
	this.name = name;
	this.isOpen = false;
	this.element = document.createElement("img");
	this.element.setAttribute("src", src);
	this.element.setAttribute("class", "logo");
				
	$(this.element).bind("click", [this], function(event){
		//data.event[0] has reference to the Tile-object
		$(document).keydown(function(event){
			if (event.which == 13) {
				$("#sub").trigger("click");
				$(this).unbind('keydown');
			}
		});
		$("#answer").animate({"opacity":"0"}, 1);						
		$("#answer").css("display", "block");
		$("#answer").animate({"opacity":"1"}, 500);	
		$("#textline").trigger("focus");					
		$("#sub").bind("click", [this, event.data[0]], function(event){
			//data.event[0] has reference to <img>-element
			//data.event[1] has reference to Tile-object		
			var ans = $("#textline").attr("value");
			$(this).unbind();
						
			if (event.data[1].checkName(ans)) {								
				performCardRotation(event.data[0]);	
				score += event.data[1].tilescore;
				$("#stat").empty();
				$("#stat").text(score);
				event.data[1].isOpen = true;
			} else {
				$("#answer").empty();
				$("#answer").append("<img src='image/wrong.png' />");	
			}
						
			$("#answer").animate({"opacity":"0"}, 500, function(){
				$("#answer").empty();
				$("#answer").append("<input type='text' id='textline' value='' /><input type='button' id = 'sub' value='Check' />");
				$("#answer").css("display", "none");	
				$("#textline").attr("value", "");
			});
																	
		});	
					
	});
				
	this.checkName = function(name) {					
		if (this.name.toLowerCase() == name.toLowerCase()) {
			return true;
		} else {
			return false;
		}
	}				
	this.getTile = function() {
		return this.element;
	}				
				
}

// list of tile names, scores and image srcs
var tileList = [
	{src:"logo/access.png", name:"access", score:12},
	{src:"logo/android.png", name:"android", score:4},
	{src:"logo/apple.png", name:"apple", score:3},
	{src:"logo/audi.png", name:"audi", score:5},
	{src:"logo/barcelona.png", name:"barcelona", score:8},
	{src:"logo/bluetooth.png", name:"bluetooth", score:9},
	{src:"logo/chrome.png", name:"chrome", score:7},
	{src:"logo/counter-strike.png", name:"counter-strike", score:15},
	{src:"logo/dropbox.png", name:"dropbox", score:10},
	{src:"logo/eset.png", name:"eset", score:20},
	{src:"logo/excel.png", name:"excel", score:6},
	{src:"logo/facebook.png", name:"facebook", score:1},
	{src:"logo/firefox.png", name:"firefox", score:1},
	{src:"logo/flash.png", name:"flash", score:3},
	{src:"logo/half-life.png", name:"half-life", score:24},
	{src:"logo/honda.png", name:"honda", score:13},
	{src:"logo/java.png", name:"java", score:9},
	{src:"logo/lamborghini.png", name:"lamborghini", score:20},
	{src:"logo/lexus.png", name:"lexus", score:16},
	{src:"logo/linux.png", name:"linux", score:7},
	{src:"logo/mazda.png", name:"mazda", score:14},
	{src:"logo/mercedes.png", name:"mercedes", score:10},
	{src:"logo/mitsubishi.png", name:"mitsubishi", score:16},
	{src:"logo/msn.png", name:"msn", score:20}
];
// function which returns a collection of Tile objects
function getTileMap() {
	var tiles = [];
	shuffle(tileList);	
	for(i = 0; i < tileList.length; i++) {
		tiles.push(new Tile(tileList[i].src, tileList[i].name, tileList[i].score));
	}
	return tiles;
}
// function to randomly shuffle the tiles so that they are in different order always
function shuffle(tileArray){
    for(var j, x, i = tileArray.length; i; j = Math.floor(Math.random() * i), x = tileArray[--i], tileArray[i] = tileArray[j], tileArray[j] = x);
};
