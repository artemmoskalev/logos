//this function is an entry point to the classic game which is triggered every time the script is loaded
function initializeClassic(savedTiles, old_score) {
	$("#game_menu").css({"display": "none"});
	$("#textline").attr("value", "");
	
	var tiles = [];
	if(savedTiles == undefined) {
		tiles = getTileMap();	
	} else {
		tiles = savedTiles;		
		score = old_score;
	}
	
	for(i = 0; i < tiles.length; i++) {
		$("#footer").before(tiles[i].getTile());
	}
	
	$("#stat").empty();
	$("#stat").text(score);
	
	manageTileLoad();	
		
	for(i = 0; i < tiles.length; i++) {
		if(tiles[i].isOpen === true) {
			performCardRotation(tiles[i].element);
		}
	}
	
	$("#quit").bind("click", function() {
		/* reset the classic div to what it was before the load of tiles */
		var container = $('#classic');
	    var noRemoveAnswer = container.find('#answer');
	    var noRemoveFooter = container.find('#footer');
		container.html(noRemoveAnswer);
		container.append(noRemoveFooter);
		score = 0;
		
		$("#classic").css({"display": "none"});
		$("#game_menu").css({"display": "block"});
	});	
	/* game messages */
	$("#save_score").bind("click", function(){
		var scoreMessage = {
			messageType: "SCORE",
			score: score
		};
		parent.postMessage(scoreMessage, '*');
	});		
	$("#save_state").bind("click", function(){
		var stateMessage = {
			messageType: "SAVE",
			gameState: {
				tilemap: [
				
				],
				score: score
			}
		};
		for(i = 0; i < tiles.length; i++) {
			stateMessage.gameState.tilemap.push({
				src: tiles[i].src, 
				name: tiles[i].name, 
				score: tiles[i].tilescore,
				open: tiles[i].isOpen
			});
		}
		parent.postMessage(stateMessage, '*');
	});	
	
}
			
function manageTileLoad() {
	var loadcount = 0;
	$("#loadimg").css({"display":"block"});	
	$(".logo").load(function(){		
		loadcount++;		
		if (loadcount == NUMBER_OF_TILES) {
			$("#loadimg").css({"display":"none"});
			$("#classic").css({"display": "block"});
			$("#classic").find("*").animate({"opacity":"1.0"}, 500);
		}
	});   
}	