/*
	Each of these important events have:
	a subtype (which is just the classname)
	a session
	a player (optional, whoever died, or went murder mode, or whatever)
	a mvp value (at time of event creation) keeps the important event referenceing the right timeline
	a importanceRating
	a alternateTimeline function.
	a humanLabel function.  instead of PlayerDiedButCouldGodTier it would be "The Heir of Life died with a living dream self. Make them GodTier."
*/

//TODO, maybe allow them to prevent existing god tiers?

//screw fate, we have a time player here, and obviously this fate leads to a doomed timeline anyways and thus is changeable.
//have alternate timeline change based on it being a dreamself that's dying versus an unsmooched regular self.
//if i ever implmeent moon destruction, will need to refactor this, unless want to have time shenanigans. (god tier time players can take dying player to before moon was destroyed???)
function PlayerDiedButCouldGodTier(session, mvp_value, player, doomedTimeClone){
	this.session = session;
	this.importanceRating = 9;
	this.mvp_value = mvp_value;
	this.player = makeRenderingSnapshot(player);
	this.doomedTimeClone = doomedTimeClone;
	this.timesCalled = 0;
	this.secondTimeClone = null;  //second time clone undoes first undo
	//console.log("Created GodTier opportunity, for: " + this.player.title());

	this.humanLabel = function(){
		var ret  = "";
		ret += "Have the " + this.player.htmlTitle() + " go God Tier instead of dying forever. ";
		return ret;
	}

	this.alternateScene = function(div){
			this.timesCalled ++;
			this.doomedTimeClone.dead = false;
			this.doomedTimeClone.currentHP = this.doomedTimeClone.hp

			if(this.secondTimeClone){
				this.secondTimeClone.dead = false;
				this.secondTimeClone.currentHP = this.secondTimeClone.hp
				return undoTimeUndoScene(div, this.session, this, this.doomedTimeClone, this.secondTimeClone);
			}
			//console.log("times called : " + this.timesCalled)
			var narration = "<br>A " + this.doomedTimeClone.htmlTitleBasic() + " suddenly warps in from the future. ";
			narration +=  " They come with a dire warning of a doomed timeline. ";
			narration += " Something seems...off...about them. But they are adamant that the " + this.player.htmlTitleBasic() + " needs to go God Tier now. "
			narration += " No matter what 'fate' says. "
			narration += " They scoop the corpse up and vanish with it in a cloud of gears, depositing it instantly on the " + this.player.htmlTitleBasic() + "'s ";
			if(this.player.isDreamSelf == true){
				narration += "sacrificial slab, where it glows and ascends to the God Tiers with a sweet new outfit";
			}else{
				narration += " quest bed. The corpse glows and rises Skaiaward. ";
				narration +="On " + this.player.moon + ", their dream self takes over and gets a sweet new outfit to boot.  ";
			}
			narration +=  " The doomed " + this.doomedTimeClone.htmlTitleBasic() + " vanishes in a cloud of gears to join the final battle.";
			div.append(narration);

			var divID = (div.attr("id")) + "_alt_" + this.player.chatHandle;
			var canvasHTML = "<br><canvas id='canvas" + divID+"' width='" +canvasWidth + "' height="+canvasHeight + "'>  </canvas>";
			div.append(canvasHTML);
			var canvasDiv = document.getElementById("canvas"+ divID);

			var pSpriteBuffer = getBufferCanvas(document.getElementById("sprite_template"));
			drawSprite(pSpriteBuffer,this.doomedTimeClone)

			var dSpriteBuffer = getBufferCanvas(document.getElementById("sprite_template"));
			drawSprite(dSpriteBuffer,this.player)
			drawTimeGears(canvasDiv, this.doomedTimeClone);
			copyTmpCanvasToRealCanvasAtPos(canvasDiv, pSpriteBuffer,-100,0)
			copyTmpCanvasToRealCanvasAtPos(canvasDiv, dSpriteBuffer,100,0)

			var player = this.session.getVersionOfPlayerFromThisSession(this.player);
			player.makeGodTier();

			var divID2 = (div.attr("id")) + "_alt_god" + player.chatHandle;
			var canvasHTML2 = "<br><canvas id='canvas" + divID2+"' width='" +canvasWidth + "' height="+canvasHeight + "'>  </canvas>";
			div.append(canvasHTML2);
			var canvasDiv2 = document.getElementById("canvas"+ divID2);
			var players = [];
			players.push(player)
			drawGetTiger(canvasDiv2, players,repeatTime)
			return true;
	}
}


function PlayerDiedForever(session, mvp_value, player, doomedTimeClone){
	this.session = session;
	this.secondTimeClone = null;  //second time clone undoes first undo
	this.mvp_value = mvp_value;
	this.importanceRating = 5;
	this.player =  makeRenderingSnapshot(player);
	this.doomedTimeClone = doomedTimeClone;
	this.timesCalled = 0;
	this.humanLabel = function(){
		var ret  = "Make the " + this.player.htmlTitle() + " not permanently dead.";
		return ret;
	}

	this.alternateScene = function(div){
			this.timesCalled ++;
			this.doomedTimeClone.dead = false;
			this.doomedTimeClone.currentHP = this.doomedTimeClone.hp
			if(this.secondTimeClone) this.secondTimeClone.dead = false;
			if(this.secondTimeClone) this.secondTimeClone.currentHP = this.secondTimeClone.hp
			if(this.secondTimeClone){
				return undoTimeUndoScene(div, this.session, this, this.doomedTimeClone, this.secondTimeClone);
			}
			var player = this.session.getVersionOfPlayerFromThisSession(this.player);
			var narration = "<br>A " + this.doomedTimeClone.htmlTitleBasic() + " suddenly warps in from the future. ";
			narration +=  " They come with a dire warning of a doomed timeline. ";
			narration += " Something seems...off...about them. But they are adamant that the " +player.htmlTitleBasic() + " needs to be protected. "
			narration += " No matter what 'fate' says. "
			narration += " They sacrifice their life for the " + player.htmlTitleBasic() + ". ";


			div.append(narration);

			player.makeAlive();
			player.triggerLevel += 0.5;

			this.doomedTimeClone.makeDead("sacrificing themselves through a YellowYard")

			var divID = (div.attr("id")) + "_alt_" + player.chatHandle;
			var canvasHTML = "<br><canvas id='canvas" + divID+"' width='" +canvasWidth + "' height="+canvasHeight + "'>  </canvas>";
			div.append(canvasHTML);
			var canvasDiv = document.getElementById("canvas"+ divID);

			var pSpriteBuffer = getBufferCanvas(document.getElementById("sprite_template"));
			drawSprite(pSpriteBuffer,this.doomedTimeClone)

			var dSpriteBuffer = getBufferCanvas(document.getElementById("sprite_template"));
			drawSpriteTurnways(dSpriteBuffer,player)
			drawTimeGears(canvasDiv, this.doomedTimeClone);
			copyTmpCanvasToRealCanvasAtPos(canvasDiv, pSpriteBuffer,-100,0)
			copyTmpCanvasToRealCanvasAtPos(canvasDiv, dSpriteBuffer,100,0)

			var alphaTimePlayer = findAspectPlayer(this.session.players, "Time");
			removeFromArray(this.doomedTimeClone, alphaTimePlayer.doomedTimeClones);   //DEAD
			this.session.afterLife.addGhost(this.doomedTimeClone);
			return true;
	}
}

function PlayerWentGrimDark(session, mvp_value,player, doomedTimeClone){
	this.session = session;
	this.mvp_value = mvp_value;
	this.importanceRating = 7;
	this.player =  makeRenderingSnapshot(player);
	this.timesCalled = 0;
	this.doomedTimeClone = doomedTimeClone;
	this.secondTimeClone = null;  //second time clone undoes first undo

	this.humanLabel = function(){
		var ret  = "Prevent the " + this.player.htmlTitle() + " from going Grimdark."
		return ret;
	}

	//just realized, this isn't just a replacement for god tiering. god tiering uses a corpse.
	//this needs to be called not at a failed revival, but at the creation of the coprse.
	//jack rampage, murder mode, fight king/queen?
	//163251  22577  59610
	this.alternateScene = function(div){
			this.timesCalled ++;
			this.doomedTimeClone.dead = false;
			this.doomedTimeClone.currentHP = this.doomedTimeClone.hp

			if(this.secondTimeClone){
				this.secondTimeClone.dead = false;
				this.secondTimeClone.currentHP = this.secondTimeClone.hp
				return undoTimeUndoScene(div, this.session, this, this.doomedTimeClone, this.secondTimeClone);
			}
			var player = this.session.getVersionOfPlayerFromThisSession(this.player);
			var narration = "<br>A " + this.doomedTimeClone.htmlTitleBasic() + " suddenly warps in from the future. ";
			narration +=  " They come with a dire warning of a doomed timeline. ";
			narration += " Something seems...off...about them. But they are adamant that the " + player.htmlTitleBasic() + " needs to be calmed the fuck down. "
			narration += " No matter what 'fate' says. "
			narration += " They spend some time letting the  " + player.htmlTitleBasic() + " vent. Hug bumps are shared. ";
			if(this.doomedTimeClone.isTroll == true || player.isTroll == true){
				narration += "The fact that the " + this.doomedTimeClone.htmlTitleBasic() + " is doomed makes this especially tragic, forestalling any romance this might have otherwise had. "
			}
			narration +=  " The doomed " + this.doomedTimeClone.htmlTitleBasic() + " vanishes in a cloud of gears to join the final battle.";
			div.append(narration);
			player.triggerLevel= 0;


			var divID = (div.attr("id")) + "_alt_" + player.chatHandle;
			var canvasHTML = "<br><canvas id='canvas" + divID+"' width='" +canvasWidth + "' height="+canvasHeight + "'>  </canvas>";
			div.append(canvasHTML);
			var canvasDiv = document.getElementById("canvas"+ divID);

			var pSpriteBuffer = getBufferCanvas(document.getElementById("sprite_template"));
			drawSprite(pSpriteBuffer,this.doomedTimeClone)

			var dSpriteBuffer = getBufferCanvas(document.getElementById("sprite_template"));
			drawSpriteTurnways(dSpriteBuffer,player)

			drawTimeGears(canvasDiv, this.doomedTimeClone);
			copyTmpCanvasToRealCanvasAtPos(canvasDiv, pSpriteBuffer,-100,0)
			copyTmpCanvasToRealCanvasAtPos(canvasDiv, dSpriteBuffer,100,0)
			return true;
	}
}

function PlayerWentMurderMode(session, mvp_value, player, doomedTimeClone){
	this.session = session;
	this.mvp_value = mvp_value;
	this.importanceRating = 7;
	this.player = makeRenderingSnapshot(player);
	this.timesCalled = 0;
	this.doomedTimeClone = doomedTimeClone;
	this.secondTimeClone = null;  //second time clone undoes first undo

	this.humanLabel = function(){
		var ret  = "Prevent the " + this.player.htmlTitle() + " from going into Murder Mode.";
		return ret;
	}

	this.alternateScene = function(div){
			this.timesCalled ++;
			this.doomedTimeClone.dead = false;
			this.doomedTimeClone.currentHP = this.doomedTimeClone.hp

			if(this.secondTimeClone){
				this.secondTimeClone.dead = false;
				this.secondTimeClone.currentHP = this.secondTimeClone.hp
				return undoTimeUndoScene(div, this.session, this, this.doomedTimeClone, this.secondTimeClone);
			}
			var player = this.session.getVersionOfPlayerFromThisSession(this.player);
			var narration = "<br>A " + this.doomedTimeClone.htmlTitleBasic() + " suddenly warps in from the future. ";
			narration +=  " They come with a dire warning of a doomed timeline. ";
			narration += " Something seems...off...about them. But they are adamant that the " + player.htmlTitleBasic() + " needs to be calmed the fuck down. "
			narration += " No matter what 'fate' says. "
			narration += " They spend some time letting the  " + player.htmlTitleBasic() + " vent. Hug bumps are shared. ";
			if(this.doomedTimeClone.isTroll == true || player.isTroll == true){
				narration += "The fact that the " + this.doomedTimeClone.htmlTitleBasic() + " is doomed makes this especially tragic, forestalling any romance this might have otherwise had. "
			}
			narration +=  " The doomed " + this.doomedTimeClone.htmlTitleBasic() + " vanishes in a cloud of gears to join the final battle.";
			div.append(narration);
			player.triggerLevel= 0;


			var divID = (div.attr("id")) + "_alt_" + player.chatHandle;
			var canvasHTML = "<br><canvas id='canvas" + divID+"' width='" +canvasWidth + "' height="+canvasHeight + "'>  </canvas>";
			div.append(canvasHTML);
			var canvasDiv = document.getElementById("canvas"+ divID);

			var pSpriteBuffer = getBufferCanvas(document.getElementById("sprite_template"));
			drawSprite(pSpriteBuffer,this.doomedTimeClone)

			var dSpriteBuffer = getBufferCanvas(document.getElementById("sprite_template"));
			drawSpriteTurnways(dSpriteBuffer,player)

			drawTimeGears(canvasDiv, this.doomedTimeClone);
			copyTmpCanvasToRealCanvasAtPos(canvasDiv, pSpriteBuffer,-100,0)
			copyTmpCanvasToRealCanvasAtPos(canvasDiv, dSpriteBuffer,100,0)
			return true;
	}
}

//grab ring before this can happen.
function JackPromoted(session, mvp_value, doomedTimeClone){
	this.session = session;
	this.mvp_value = mvp_value;
	this.importanceRating = 10;
	this.timesCalled = 0;
	this.doomedTimeClone = doomedTimeClone;
	this.secondTimeClone = null;  //second time clone undoes first undo

	this.humanLabel = function(){
		var ret  = "Prevent Jack from obtaining the Black Queen's RING OF ORBS " +this.session.convertPlayerNumberToWords() + "FOLD.";
		return ret;
	}
	this.alternateScene = function(div){
			this.timesCalled ++;
			this.doomedTimeClone.dead = false;
			this.doomedTimeClone.currentHP = this.doomedTimeClone.hp

			if(this.secondTimeClone){
				this.secondTimeClone.dead = false;
				this.secondTimeClone.currentHP = this.secondTimeClone.hp
				return undoTimeUndoScene(div, this.session, this, this.doomedTimeClone, this.secondTimeClone);
			}
			var narration = "<br>A " + this.doomedTimeClone.htmlTitleBasic() + " suddenly warps in from the future. ";
			narration +=  " They come with a dire warning of a doomed timeline. ";
			narration += " Something seems...off...about them. But they are adamant that the Black Queen's RING OF ORBS " +this.session.convertPlayerNumberToWords() + "FOLD needs to be destroyed. Immediately.";
			narration += " No matter what 'fate' says. Jack Noir immediately begins flipping out, but the RING is stolen before he can do anything. "
			narration +=  "The doomed " + this.doomedTimeClone.htmlTitleBasic() + " vanishes with the RING in a cloud of gears to join the final battle.";
			div.append(narration);
			this.session.destroyBlackRing();

			var divID = (div.attr("id")) + "_alt_jack_promotion"
			var canvasHTML = "<br><canvas id='canvas" + divID+"' width='" +canvasWidth + "' height="+canvasHeight + "'>  </canvas>";
			div.append(canvasHTML);
			var canvasDiv = document.getElementById("canvas"+ divID);

			var pSpriteBuffer = getBufferCanvas(document.getElementById("sprite_template"));
			drawSprite(pSpriteBuffer,this.doomedTimeClone)
			drawTimeGears(canvasDiv, this.doomedTimeClone);
			copyTmpCanvasToRealCanvasAtPos(canvasDiv, pSpriteBuffer,-100,0)
			return true;
	}
}

//if knight, directly help, if not but knight alive, force them to help. else, indirect help
//if knight of space (most common reason this is called, indirect help)
function FrogBreedingNeedsHelp(session, mvp_value, doomedTimeClone){
	this.session = session;
	this.mvp_value = mvp_value;
	this.timesCalled = 0;
	this.doomedTimeClone = doomedTimeClone;
	this.importanceRating = 2;  //really, this is probably the least useful thing you could do. If this is the ONLY thing that went wrong, your session is going great.
	this.timesCalled = 0;
	this.secondTimeClone = null;  //second time clone undoes first undo
  //console.log("creating frog needs help event, seed is: " + Math.seed)
	this.humanLabel = function(){
		var spacePlayer = findAspectPlayer(this.session.players, "Space");
		var ret  = "Help the " + spacePlayer.htmlTitleBasic() + " complete frog breeding duties.";
		return ret;
	}
	this.alternateScene = function(div){
			var spacePlayer = findAspectPlayer(this.session.players, "Space");
			this.timesCalled ++;
			this.doomedTimeClone.dead = false;
			this.doomedTimeClone.currentHP = this.doomedTimeClone.hp

			if(this.secondTimeClone){
				this.secondTimeClone.dead = false;
				this.secondTimeClone.currentHP = this.secondTimeClone.hp
				return undoTimeUndoScene(div, this.session, this, this.doomedTimeClone, this.secondTimeClone);
			}
			var narration = "<br>A " + this.doomedTimeClone.htmlTitleBasic() + " suddenly warps in from the future. ";
			narration +=  " They come with a dire warning of a doomed timeline. ";
			narration += " Something seems...off...about them. But they are adamant that the " + spacePlayer.htmlTitleBasic() + " needs to be helped with their Frog Breeding duties. "
			narration += " No matter what anybody says about time travel frog breeding being an overly elaborate and dangerous undertaking.  Desperate times, Desperate measures. "
			if(this.doomedTimeClone.class_name == "Knight"){
				narration += " Luckily they were SUPPOSED to be helping breed the frog in the first place, so it's just a matter of making enough stable time loops to make a huge dent in the process. "
				spacePlayer.landLevel += 10;
			}else{
				narration += " Unfortunately they are not a Knight, and thus are banned from helping breed frogs directly.  But with a little creativity and a LOT of stable time loops they manage to indirectly help a huge amount. "
				spacePlayer.landLevel += 8;
			}
			narration +=  " The doomed " + this.doomedTimeClone.htmlTitleBasic() + " vanishes in a cloud of gears to join the final battle.";
			div.append(narration);

			var divID = (div.attr("id")) + "_alt_" + spacePlayer.chatHandle;
			var canvasHTML = "<br><canvas id='canvas" + divID+"' width='" +canvasWidth + "' height="+canvasHeight + "'>  </canvas>";
			div.append(canvasHTML);
			var canvasDiv = document.getElementById("canvas"+ divID);

			var pSpriteBuffer = getBufferCanvas(document.getElementById("sprite_template"));
			drawSprite(pSpriteBuffer,this.doomedTimeClone)

			var dSpriteBuffer = getBufferCanvas(document.getElementById("sprite_template"));
			drawSpriteTurnways(dSpriteBuffer,spacePlayer)

			drawTimeGears(canvasDiv, this.doomedTimeClone);
			copyTmpCanvasToRealCanvasAtPos(canvasDiv, pSpriteBuffer,-100,0)
			copyTmpCanvasToRealCanvasAtPos(canvasDiv, dSpriteBuffer,100,0)
			//console.log("done helping frog a scene, seed is at: " + Math.seed)
			return true;
	}

}


function PlayerEnteredSession(session, mvp_value,player, doomedTimeClone){
	this.session = session;
	this.mvp_value = mvp_value;
	this.timesCalled = 0;
	this.player = makeRenderingSnapshot(player);
	this.doomedTimeClone = doomedTimeClone;
	this.importanceRating = 5;
	this.timesCalled = 0;
	this.secondTimeClone = null;  //second time clone undoes first undo

	this.humanLabel = function(){
		var ret  = "Kill the " + this.player.htmlTitle() + " before they enter the session.";
		return ret;
	}
	this.alternateScene = function(div){
		this.timesCalled ++;
		this.doomedTimeClone.dead = false;
		this.doomedTimeClone.currentHP = this.doomedTimeClone.hp

			if(this.secondTimeClone){
				this.secondTimeClone.dead = false;
				this.secondTimeClone.currentHP = this.secondTimeClone.hp
				return undoTimeUndoScene(div, this.session, this, this.doomedTimeClone, this.secondTimeClone);
			}
			var player = this.session.getVersionOfPlayerFromThisSession(this.player);
			var narration = "<br>A " + this.doomedTimeClone.htmlTitleBasic() + " suddenly warps in from the future. ";
			narration +=  " They come with a dire warning of a doomed timeline. ";
			narration += " Something seems...off...about them. But they are adamant that the " + player.htmlTitleBasic() + " needs to die.  You do not even want to know how long it took them to get back to earth, and then time-travel to before the" +  player.htmlTitleBasic() + " entered the session. They are commited to this. "
			narration += " No matter what 'fate' says. "

			narration +=  "After a brief struggle, the doomed " + this.doomedTimeClone.htmlTitleBasic() + " vanishes in a cloud of gears to join the final battle.";
			div.append(narration);
			player.dead = true;
			player.makeDead("apparantly displeasing the Observer.");
			this.doomedTimeClone.victimBlood = player.bloodColor;


			var divID = (div.attr("id")) + "_alt_" + player.chatHandle;
			var canvasHTML = "<br><canvas id='canvas" + divID+"' width='" +canvasWidth + "' height="+canvasHeight + "'>  </canvas>";
			div.append(canvasHTML);
			var canvasDiv = document.getElementById("canvas"+ divID);

			var pSpriteBuffer = getBufferCanvas(document.getElementById("sprite_template"));
			drawSprite(pSpriteBuffer,this.doomedTimeClone)

			var dSpriteBuffer = getBufferCanvas(document.getElementById("sprite_template"));
			drawSprite(dSpriteBuffer,player)

			drawTimeGears(canvasDiv, this.doomedTimeClone);
			copyTmpCanvasToRealCanvasAtPos(canvasDiv, pSpriteBuffer,-100,0)
			copyTmpCanvasToRealCanvasAtPos(canvasDiv, dSpriteBuffer,100,0)
			return false; //let the original scene happen as well.
	}


}

function TimePlayerEnteredSessionWihtoutFrog(session, mvp_value,player, doomedTimeClone){
	this.session = session;
	this.mvp_value = mvp_value;
	this.timesCalled = 0;
	this.player = makeRenderingSnapshot(player);
	this.doomedTimeClone = doomedTimeClone;
	this.importanceRating = 10;
	this.timesCalled = 0;
	this.secondTimeClone = null;  //second time clone undoes first undo

	//this is so illegal.
	this.humanLabel = function(){
		var ret  = "Make the " + this.player.htmlTitle() + " prototype a frog before entering the session. ";
		return ret;
	}

	this.alternateScene = function(div){
			this.timesCalled ++;
			this.doomedTimeClone.dead = false;
			this.doomedTimeClone.currentHP = this.doomedTimeClone.hp

			if(this.secondTimeClone){
				this.secondTimeClone.dead = false;
				this.secondTimeClone.currentHP = this.secondTimeClone.hp
				return undoTimeUndoScene(div, this.session, this, this.doomedTimeClone, this.secondTimeClone);
			}
			var player = this.session.getVersionOfPlayerFromThisSession(this.player);
			var narration = "<br>A " + this.doomedTimeClone.htmlTitleBasic() + " suddenly warps in from the future. ";
			narration +=  " They come with a dire warning of a doomed timeline. ";
			narration += " Something seems...off...about them. But they are adamant that their past-selves kernel sprite needs to be prototyped with this FROG. You do not even want to know how long it took them to get back to earth, and then time-travel to before the" +  player.htmlTitleBasic() + " entered the session. They are commited to this. "
			narration += " No matter what 'fate' says.  They don't even care how illegal this is. "
			narration +=  "The doomed " + this.doomedTimeClone.htmlTitleBasic() + " vanishes with in a cloud of gears to join the final battle.";
			div.append(narration);

			player.object_to_prototype = new GameEntity(null, "Frog",null);
			player.object_to_prototype.power = 20;
			player.object_to_prototype.illegal = true;
			player.object_to_prototype.mobility = 100;
			var divID = (div.attr("id")) + "_alt_jack_promotion"
			var canvasHTML = "<br><canvas id='canvas" + divID+"' width='" +canvasWidth + "' height="+canvasHeight + "'>  </canvas>";
			div.append(canvasHTML);
			var canvasDiv = document.getElementById("canvas"+ divID);

			var pSpriteBuffer = getBufferCanvas(document.getElementById("sprite_template"));
			drawSprite(pSpriteBuffer,this.doomedTimeClone)
			drawTimeGears(canvasDiv, this.doomedTimeClone);
			copyTmpCanvasToRealCanvasAtPos(canvasDiv, pSpriteBuffer,-100,0)
			return false;  //let original scene happen as well.
	}
}

//you really shouldn't need to help with frog breeding more than twice.
function removeFrogSpam(events){
	var eventsToRemove = []; //don't mod an array as you loop over it.
	var frogsSoFar = 0;
	 for(var i = 0; i<events.length; i++){
		 if(events[i].constructor.name == "FrogBreedingNeedsHelp"){
			 frogsSoFar ++;
			 if(frogsSoFar > 1){
				 eventsToRemove.push(events[i])
			 }
		 }
	 }

	  for(var k = 0; k<eventsToRemove.length; k++){
		 removeFromArray(eventsToRemove[k], events)
	 }
	 return events;
}
//YellowYardcontroller knows what makes two events functionally equivalent
function removeRepeatEvents(events){
	var eventsToRemove = []; //don't mod an array as you loop over it.
	 for(var i = 0; i<events.length; i++){
        var e1 = events[i];
		for(var j = i; j<events.length-i; j++){
		  var e2 = events[j];
		  //don't be literally teh same object, but do you match?
		   if(e1 != e2 && doEventsMatch(e1,e2)){
			 // console.log(e1.humanLabel() + " matches " + e2.humanLabel())
              eventsToRemove.push(e2);
			}
		}
     }

	 for(var k = 0; k<eventsToRemove.length; k++){
		 removeFromArray(eventsToRemove[k], events)
	 }
	 return events;
}
function padEventsToNumWithKilling(events,session, doomedTimeClone,num){
	var num = num - events.length;
	num = Math.min(num, session.players.length);
	for(var i = 0; i<num; i++){
			events.push(new KillPlayer(session, session.players[i]))
	}
	return events;
}
function sortEventsByImportance(events){
	return events.sort(comparePriority)
}

function comparePriority(a,b) {
  return b.importanceRating - a.importanceRating;
}


function listEvents(events){
	var ret = "";
	for(var i = 0; i<events.length; i++){
		ret += "\n" +events[i].humanLabel();
	}
	return ret;
}

function undoTimeUndoScene(div, session, event, timeClone1, timeClone2){
//	console.log("times called : " + this.timesCalled)
	var narration = "<br>A doomed " + timeClone1.htmlTitleBasic() + " suddenly warps in from the future. ";
	narration +=  " But before they can do anything, a second doomed " +timeClone2.htmlTitleBasic()  + " warps in and grabs them.  Both vanish in a cloud of gears and clocks to join the final battle.";

	div.append(narration);

	var divID = (div.attr("id")) + "_alt_" + timeClone1.chatHandle;
	var canvasHTML = "<br><canvas id='canvas" + divID+"' width='" +canvasWidth + "' height="+canvasHeight + "'>  </canvas>";
	div.append(canvasHTML);
	var canvasDiv = document.getElementById("canvas"+ divID);

	var pSpriteBuffer = getBufferCanvas(document.getElementById("sprite_template"));
	drawTimeGears(pSpriteBuffer);
	drawSprite(pSpriteBuffer,timeClone1)

	var dSpriteBuffer = getBufferCanvas(document.getElementById("sprite_template"));
	drawTimeGears(dSpriteBuffer);
	drawSpriteTurnways(dSpriteBuffer,timeClone2)


	copyTmpCanvasToRealCanvasAtPos(canvasDiv, pSpriteBuffer,-100,0)
	copyTmpCanvasToRealCanvasAtPos(canvasDiv, dSpriteBuffer,100,0)

	removeFromArray(event, session.yellowYardController.eventsToUndo);
	return false;
}
