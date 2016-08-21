$(document).ready(function(){
//variables

//characters
var classes = {

	priest: {
    	hp: 120,
    	atk: 6,
    	counter: 10
	},

	pyro: {
		hp: 100,
		atk: 8,
		counter: 5
	},

	knight: {
		hp: 120,
		atk: 5,
		counter: 25
	},

	sorc:{
		hp: 115,
		atk: 10,
		counter: 8
	}
}

	$("#logo").append('<img id = "logo" src = "assets/images/logo.jpg">');


//create character boxes
	$("#priestClass").append('<img class = "character" data-selection = "false" data-character = "priest" src = "assets/images/priest.jpg">');
	$("#knightClass").append('<img class = "character" data-selection = "false" data-character = "knght" src = "assets/images/knight.jpg">');
	$("#sorcClass").append('<img class = "character" data-selection = "false" data-character = "sorc" src = "assets/images/sorc.jpg">');
	$("#pyroClass").append('<img class = "character" data-selection = "false" data-character = "pyro" src = "assets/images/pyro.jpg">');


//select character & select enemy	
var yourChoice = 0;
$(".character").on("click", function (){
	var selection = $(this).data("selection");
	selection = true;

		if (selection && yourChoice === 0){
			$("#yourChar").append($(this));
			yourChoice++
			var friendly = $(this).data('character');
			var attributes = classes[friendly]
			$("#yourHealth").append(attributes.hp)
		}
		else if(selection && yourChoice === 1){
			$("#enemySelected").append($(this));
			yourChoice++;
			$(document).removeClass('character');
			var enemy = $(this).data('character');
			var attributes = classes[enemy];
			console.log(attributes);
		}


});




//move others to enemies

//select enemy

//attack button

});