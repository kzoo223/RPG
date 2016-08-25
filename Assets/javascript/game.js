$(document).ready(function(){

// music volume **not working**
// var backgroundTheme = $("#Theme")
// backgroundTheme.volume = 0.2;

//music player
$("document").ready(function(){                    
        $("#playButton").click(function() {
                    if (!$("#Theme")[0].paused)
                    {
                        $("#Theme")[0].pause();           
                        
                    }
                    else
                        {
                            $("#Theme")[0].play();           
                            
                        }
        });
});


//reset button **not working**
//   reset.on("click", function(){
//   $("#logo").html('<img id = "logo" src = "assets/images/logo.png">');
//   $("#characterArea").append("<div class = 'col-lg-3' id='priestClass'></div>")
//   $("#characterArea").append("<div class = 'col-lg-3' id='knightClass'></div>")
//   $("#characterArea").append("<div class = 'col-lg-3' id='sorcClass'></div>")
//   $("#characterArea").append("<div class = 'col-lg-3' id='pyroClass'></div>")
//   $("#priestClass").html('<img class = "character" data-selection="false" data-character="priest" src = "assets/images/priest.png">');
//   $("#knightClass").html('<img class = "character" data-selection="false" data-character="knight" src = "assets/images/knight.png">');
//   $("#sorcClass").html('<img class = "character" data-selection="false" data-character="sorc" src = "assets/images/sorc.png">');
//   $("#pyroClass").html('<img class = "character" data-selection="false" data-character="pyro" src = "assets/images/pyro.png">');
//   yourChoice === 0;
//   enemyCounter === 3;
//   $("#status").empty();

// });



 

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
		counter: 15
	}
}



$("#logo").append('<img id = "logo" src = "assets/images/logo.png">');

	

//create character boxes

$("#priestClass").append('<center><img class = "character" data-selection="false" data-character="priest" src = "assets/images/priest.png"></center>');
$("#knightClass").append('<center><img class = "character" data-selection="false" data-character="knight" src = "assets/images/knight.png"></center>');
$("#sorcClass").append('<center><img class = "character" data-selection="false" data-character="sorc" src = "assets/images/sorc.png"></center>');
$("#pyroClass").append('<center><img class = "character" data-selection="false" data-character="pyro" src = "assets/images/pyro.png"></center>');



//select character & select enemy	
var yourChoice = 0;
var yourHp
var enemyHp
var yourAttack
var counterAttack
var enemyCounter = 3;
var reset = $('<button type="button" class="btn btn-secondary" id = "resetButton">');
    reset.text("reset")


//temporary reset reloads page
reset.on("click", function(){
    location.reload();
});

//fade function

function fadingOut(){
    $('.topPart').fadeOut("fast");
    };

function fadingIn(){
    $('.topPart').fadeIn("Slow");
    };



//on character click
$(".character").on("click", function (){
	var selection = $(this).data("selection");
	selection = true;
  var selectAudio = new Audio("assets/sounds/bonfire.mp3");
  selectAudio.play();
  fadingOut();
  fadingIn();

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
      $("#chooser").empty();
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
			counterAttack=attributes.counter
      $("#characterArea").hide();
      
      
      
  };

		
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
    console.log(counterAttack)
    var selectAudio = new Audio("assets/sounds/swords.mp3");
    selectAudio.play();
            
    $("#yourChar").animate({left:"80px"}, "fast");
    $("#yourChar").animate({left:"-=40px"}, "fast"); 

     $("#enemySelected").animate({left:"-=80px"}, "fast");
    $("#enemySelected").animate({left:"40px"}, "fast");       
              
    
    

    
//defeating enemy
  if(enemyHp<=0){
      $("#action").empty();
      $("#enemyHealth").empty();
      $("#enemySelected").empty();
      $("#status").html("You defeated your enemy! Select you next opponent.")
      $(document).addClass('character')
      yourChoice = 1;
      enemyCounter--;
      var selectAudio = new Audio("assets/sounds/deadEnemy.mp3");
      selectAudio.play();      
      $("#characterArea").show();
      console.log(enemyCounter)
    }

//losing
  if (yourHp <= 0){
    //$("#logo").empty();
    $("#action").empty()
    $("#characterArea").empty();
    $(".stats").empty();
    $(".charaSelect").empty()
    $("#logo").html("<center><img src = 'assets/images/died.png'></center>");
    $("#Theme")[0].pause(); 
    var selectAudio = new Audio("assets/sounds/death.mp3");
    selectAudio.play();
    $(document).addClass('character');
    $("#status").html(reset)

  }

//winning
  if (enemyCounter == 0){
    //$("#logo").empty();
    $("#action").empty()
    $("#characterArea").empty();
    $(".stats").empty();
    $(".charaSelect").empty()
    $("#logo").html("<center><img src = 'assets/images/victory.png'></center>");
    $("#Theme")[0].pause(); 
    var selectAudio = new Audio("assets/sounds/win.mp3");
    selectAudio.play();
    $(document).addClass('character');
    $("#status").html(reset)


  }

});

});