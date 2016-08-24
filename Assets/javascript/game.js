$(document).ready(function(){

//music
var themeMusic = $("#sound1")
themeMusic.volume =

$('.play').click(function(){
    var $this = $(this);
    
    // starting audio
    var audioID = "sound" + $(this).attr('id');
    
    $this.toggleClass('active');
    if($this.hasClass('active')){
        $this.text('pause');    
        $("#" + audioID).trigger('play');
    } else {
        $this.text('play');
        $("#" + audioID).trigger('pause');
    }
});


//character objects
var classes = {

	priest:{
    	hp: 120,
    	atk: 6,
    	counter: 10
	},

	pyro:{
		hp: 100,
		atk: 8,
		counter: 5
	},

	knight:{
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

$("#priestClass").append('<img class = "character" data-selection="false" data-character="priest" src = "assets/images/priest.png">');
$("#knightClass").append('<img class = "character" data-selection="false" data-character="knight" src = "assets/images/knight.png">');
$("#sorcClass").append('<img class = "character" data-selection="false" data-character="sorc" src = "assets/images/sorc.png">');
$("#pyroClass").append('<img class = "character" data-selection="false" data-character="pyro" src = "assets/images/pyro.png">');



//select character & select enemy	
var yourChoice = 0;
var yourHp
var enemyHp
var yourAttack
var counterAttack
var attackButton
var enemyCounter = 3;
//on character click
$(".character").on("click", function (){
	var selection = $(this).data("selection");
	selection = true;

		//character selection
		if (selection && yourChoice === 0){
			//appends your selection to your char div + displays your hp
			$("#yourChar").append($(this));
			yourChoice++
			var friendly = $(this).data('character');
			var attributes = classes[friendly]
			$("#yourHealth").append("Your HP: " + attributes.hp)
      $("#chooser").html("Choose an Enemy!")
      yourHp = attributes.hp
			yourAttack = attributes.atk
		}

		//enemy selection
		else if(selection && yourChoice === 1){
			//appends selection to enemy div + displays enemy hp
      $("#chooser").remove();
      $("#enemySelected").append($(this));
			yourChoice++;
			$(document).removeClass('character');
			var enemy = $(this).data('character');
			var attributes = classes[enemy];
			$("#enemyHealth").html("Enemy HP: " + attributes.hp)
      enemyHp = attributes.hp
			//add attack button after selecting enemy
			var atk = $('<button type="button" class="btn btn-secondary" id = "attack">');
			atk.text("Attack");
			$("#action").html(atk);
			counterAttack=attributes.atk
		}
	});

//attack button
var newAttack = 0
$(document).on("click", "#attack", function(){
    newAttack = newAttack + yourAttack
    yourHp = yourHp - counterAttack;
    enemyHp = enemyHp- newAttack;
    $("#yourHealth").html("Your HP: " + yourHp)
    $("#enemyHealth").html("Enemy HP: " + enemyHp)
    $("#status").html("You attack the enemy for: " + newAttack + "damage!")
    console.log("enemy attack" + counterAttack)

 if(enemyHp<=0){
      $("#action").empty()
      $("#enemySelected").empty()
      $("#status").html("You defeated your enemy!")
      $(document).addClass('character')
      yourChoice = 1;
      enemyCounter--;
    }

});

});