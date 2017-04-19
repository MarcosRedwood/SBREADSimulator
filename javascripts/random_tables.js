//little bobby tables

//going to refactor so that all randomness is seeded.
Math.seed = getRandomSeed();  //can be overwritten on load
var initial_seed = Math.seed;
function getRandomElementFromArray(array){
	var min = 0;
	var max = array.length-1;
	var i = Math.floor(Math.seededRandom() * (max - min + 1)) + min;
	return array[i];
}

//using this won't effect the sanctity of the shareable url
function getRandomElementFromArrayNoSeed(array){
	var min = 0;
	var max = array.length-1;
	var i = Math.floor(Math.random() * (max - min + 1)) + min;
	return array[i];
}

function getRandomElementFromArrayThatStartsWith(array,letter){
	var array = makeFilteredCopyForLetters(array, letter);
	var min = 0;
	var max = array.length-1;
	var i = Math.floor(Math.seededRandom() * (max - min + 1)) + min;
	return array[i];
}

//regular filter modifies the array. do not want this. bluh.
function makeFilteredCopyForLetters(array, letter){
	var tmp = [];
	for(var i = 0; i<array.length; i++ ){
		var word = array[i];
		if(word.startsWith(letter)){
			tmp.push(word);
		}
	}
	return tmp;
}


function getDenizenFromAspect(aspect){
	if(aspect == "Space"){
		return space_denizen;
	}else if(aspect == "Time"){
		return time_denizen;
	}else if(aspect == "Breath"){
		return breath_denizen;
	}else if(aspect == "Doom"){
		return doom_denizen;
	}else if(aspect == "Blood"){
		return blood_denizen;
	}else if(aspect == "Heart"){
		return heart_denizen;
	}else if(aspect == "Mind"){
		return mind_denizen;
	}else if(aspect == "Light"){
		return light_denizen;
	}else if(aspect == "Void"){
		return void_denizen;
	}else if(aspect == "Rage"){
		return rage_denizen;
	}else if(aspect == "Hope"){
		return hope_denizen;
	}else if(aspect == "Life"){
		return life_denizen;
	}
	return "ERROR 404: Denizen Not Found"//it will be HILARIOUS if this ever prints out.
}

//use class,aspect, and interests to generate a 16 element level array.
//need to happen ahead of time and have more variety to display on
//echeladder graphic.  4 interests total
function getLevelArray(player){
	var ret = [];

	for(var i = 0; i<16; i++){
			if(i%4 == 3 && i> 4){//dont start with claspects
				//get the i/4th element from the class level array.
				//if i =7, would get element 1. if i = 15, would get element 3.
				ret.push(getLevelFromClass(Math.round((i-8)/4), player.class_name))
			}else if(i%4 == 2  && i>4){
				ret.push(getLevelFromAspect(Math.round((i-8)/4), player.aspect))
			}else if(i%4==1){
				if(i<8){
					ret.push(getLevelFromInterests(Math.round(i/4), player.interest1))
				}else{
					//only 0 and 2 are valid, so if 3 or 4, go backwards.
					ret.push(getLevelFromInterests(Math.round((i-8)/4), player.interest2))
				}
			}else if(i%4 == 0 || i < 4){
				ret.push(getLevelFromFree()); //don't care about repeats here. should be long enough.
			}
	}
	return ret;
}

function getRandomLandFromAspect(aspect){
	var first_arr = [];
	if(aspect == "Space"){
		first_arr = space_land_titles;
	}else if(aspect == "Time"){
		first_arr = time_land_titles;
	}else if(aspect == "Breath"){
		first_arr = breath_land_titles;
	}else if(aspect == "Doom"){
		first_arr = doom_land_titles;
	}else if(aspect == "Blood"){
		first_arr = blood_land_titles;
	}else if(aspect == "Heart"){
		first_arr = heart_land_titles;
	}else if(aspect == "Mind"){
		first_arr = mind_land_titles;
	}else if(aspect == "Light"){
		first_arr = light_land_titles;
	}else if(aspect == "Void"){
		first_arr = void_land_titles;
	}else if(aspect == "Rage"){
		first_arr = rage_land_titles;
	}else if(aspect == "Hope"){
		first_arr = hope_land_titles;
	}else if(aspect == "Life"){
		first_arr = life_land_titles;
	}
	var tmp = randomFromTwoArrays(first_arr, free_land_titles);
	return "Land of " + tmp[0] + " and " + tmp[1];
}

//handle can either be about interests, or your claspect. each word can be separately origined
function getRandomChatHandle(class_name, aspect,interest1, interest2){
	//console.log("Class: " + class_name + "aspect: " + aspect);
	var first = "";
	var rand = Math.seededRandom();
	if(rand>0.3){
		first = getInterestHandle1(class_name, interest1);
	}else if(rand > .6){
		first = getInterestHandle1(class_name, interest2);
	}else{
		first = getBlandHandle1(class_name);
	}
	if(!first || first == ""){
		first = getBlandHandle1(class_name);  //might have forgot to have a interest handle of the right letter.
	}
	var second = "";
	if(rand>.3){
		second = getInterestHandle2(aspect, interest1);
	}else if(rand > .6){
		second = getInterestHandle2(aspect, interest2);
	}else{
		second = getBlandHandle2(aspect);
	}
	if(!second || second == ""){
		second = getBlandHandle2(aspect);
	}
	return first+second;
}

//can also repurpose this by passing in same plaeyr for both slots to get an adjative about them. Hell yes. Laziness FTW.
//What do you like about them? They are just so X. (Yes. Hell Yes. Hell FUCKING Yes.)
function whatDoPlayersHaveInCommon(player1, player2){
	if(playerLikesMusic(player1) && playerLikesMusic(player2) ){
		return "musical"
	}
	if(playerLikesCulture(player1) && playerLikesCulture(player2) ){
		return "cultured"
	}
	if(playerLikesWriting(player1) && playerLikesWriting(player2) ){
		return "lettered"
	}
	if(playerLikesPopculture(player1) && playerLikesPopculture(player2) ){
		return "geeky"
	}
	if(playerLikesTechnology(player1) && playerLikesTechnology(player2) ){
		return "techy"
	}
	if(playerLikesSocial(player1) && playerLikesSocial(player2) ){
		return "extroverted"
	}
	if(playerLikesRomantic(player1) && playerLikesRomantic(player2) ){
		return "romantic"
	}
	if(playerLikesAcademic(player1) && playerLikesAcademic(player2) ){
		return "smart"
	}
	if(playerLikesComedy(player1) && playerLikesComedy(player2) ){
		return "funny"
	}

	if(playerLikesDomestic(player1) && playerLikesDomestic(player2) ){
		return "domestic"
	}
	if(playerLikesAthletic(player1) && playerLikesAthletic(player2) ){
		return "athletic"
	}
	if(playerLikesTerrible(player1) && playerLikesTerrible(player2) ){
		return "honest" //'just telling it like it is' *rolls eyes*
	}
	if(playerLikesFantasy(player1) && playerLikesFantasy(player2) ){
		return "imaginative"
	}
	if(playerLikesJustice(player1) && playerLikesJustice(player2) ){
		return "fair-minded"
	}

	return "nice"//the defaultiest of traits.
}

//what are bad words to describe these traits?
function whatDontPlayersHaveInCommon(player1, player2){

	if(!playerLikesCulture(player1) && playerLikesCulture(player2) ){
		return "pretentious"
	}

	if(!playerLikesTerrible(player1) && playerLikesTerrible(player2) ){
		return "terrible" //'just telling it like it is' *rolls eyes*
	}

	if(!playerLikesPopculture(player1) && playerLikesPopculture(player2) ){
		return "frivolous"
	}

	if(!playerLikesSocial(player1) && playerLikesSocial(player2) ){
		return "shallow"
	}

	if(!playerLikesAcademic(player1) && playerLikesAcademic(player2) ){
		return "nerdy"
	}

	if(!playerLikesComedy(player1) && playerLikesComedy(player2) ){
		return "dorky"
	}

	if(!playerLikesMusic(player1) && playerLikesMusic(player2) ){
		return "loud"
	}

	if(!playerLikesWriting(player1) && playerLikesWriting(player2) ){
		return "wordy"
	}

	if(!playerLikesTechnology(player1) && playerLikesTechnology(player2) ){
		return "awkward"
	}

	if(!playerLikesRomantic(player1) && playerLikesRomantic(player2) ){
		return "obsessive"
	}

	if(!playerLikesDomestic(player1) && playerLikesDomestic(player2) ){
		return "boring"
	}

	if(!playerLikesAthletic(player1) && playerLikesAthletic(player2) ){
		return "dumb"
	}

	if(!playerLikesFantasy(player1) && playerLikesFantasy(player2) ){
		return "whimpy"
	}
	if(!playerLikesJustice(player1) && playerLikesJustice(player2) ){
		return "harsh"
	}

	return "annoying"//the defaultiest of traits.
}


function playerLikesMusic(player){
		if(music_interests.indexOf(player.interest1) != -1 || music_interests.indexOf(player.interest2) != -1 ){
			return true;
		}else{
			return false;
		}
}

function playerLikesCulture(player){
		if(culture_interests.indexOf(player.interest1) != -1 || culture_interests.indexOf(player.interest2) != -1 ){
			return true;
		}else{
			return false;
		}
}

function playerLikesWriting(player){
		if(writing_interests.indexOf(player.interest1) != -1 || writing_interests.indexOf(player.interest2) != -1 ){
			return true;
		}else{
			return false;
		}
}

function playerLikesPopculture(player){
		if(pop_culture_interests.indexOf(player.interest1) != -1 || pop_culture_interests.indexOf(player.interest2) != -1 ){
			return true;
		}else{
			return false;
		}
}

function playerLikesTechnology(player){
		if(technology_interests.indexOf(player.interest1) != -1 || technology_interests.indexOf(player.interest2) != -1 ){
			return true;
		}else{
			return false;
		}
}

function playerLikesSocial(player){
		if(social_interests.indexOf(player.interest1) != -1 || social_interests.indexOf(player.interest2) != -1 ){
			return true;
		}else{
			return false;
		}
}

function playerLikesRomantic(player){
		if(romantic_interests.indexOf(player.interest1) != -1 || romantic_interests.indexOf(player.interest2) != -1 ){
			return true;
		}else{
			return false;
		}
}

function playerLikesAcademic(player){
		if(academic_interests.indexOf(player.interest1) != -1 || academic_interests.indexOf(player.interest2) != -1 ){
			return true;
		}else{
			return false;
		}
}

function playerLikesComedy(player){
		if(comedy_interests.indexOf(player.interest1) != -1 || comedy_interests.indexOf(player.interest2) != -1 ){
			return true;
		}else{
			return false;
		}
}

function playerLikesDomestic(player){
		if(domestic_interests.indexOf(player.interest1) != -1 || domestic_interests.indexOf(player.interest2) != -1 ){
			return true;
		}else{
			return false;
		}
}

function playerLikesAthletic(player){
		if(athletic_interests.indexOf(player.interest1) != -1 || athletic_interests.indexOf(player.interest2) != -1 ){
			return true;
		}else{
			return false;
		}
}

function playerLikesTerrible(player){
		if(terrible_interests.indexOf(player.interest1) != -1 || terrible_interests.indexOf(player.interest2) != -1 ){
			return true;
		}else{
			return false;
		}
}

function playerLikesFantasy(player){
		if(fantasy_interests.indexOf(player.interest1) != -1 || fantasy_interests.indexOf(player.interest2) != -1 ){
			return true;
		}else{
			return false;
		}
}

function playerLikesJustice(player){
		if(justice_interests.indexOf(player.interest1) != -1 || justice_interests.indexOf(player.interest2) != -1 ){
			return true;
		}else{
			return false;
		}
}



function getInterestHandle1(class_name,interest){
	if(music_interests.indexOf(interest) != -1){
			return getRandomElementFromArrayThatStartsWith(music_handles1, class_name.toLowerCase()[0]);
	}else if (culture_interests.indexOf(interest) != -1){
			return getRandomElementFromArrayThatStartsWith(culture_handles1, class_name.toLowerCase()[0]);
	}else if (writing_interests.indexOf(interest) != -1){
			return getRandomElementFromArrayThatStartsWith(writing_handles1, class_name.toLowerCase()[0]);
	}else if (pop_culture_interests.indexOf(interest) != -1){
			return getRandomElementFromArrayThatStartsWith(pop_culture_handles1, class_name.toLowerCase()[0]);
	}else if (technology_interests.indexOf(interest) != -1){
			return getRandomElementFromArrayThatStartsWith(technology_handles2, class_name.toLowerCase()[0]);
	}else if (social_interests.indexOf(interest) != -1){
			return getRandomElementFromArrayThatStartsWith(social_handles1, class_name.toLowerCase()[0]);
	}else if (romantic_interests.indexOf(interest) != -1){
			return getRandomElementFromArrayThatStartsWith(romantic_handles1, class_name.toLowerCase()[0]);
	}else if (academic_interests.indexOf(interest) != -1){
			return getRandomElementFromArrayThatStartsWith(academic_handles1, class_name.toLowerCase()[0]);
	}else if (comedy_interests.indexOf(interest) != -1){
			return getRandomElementFromArrayThatStartsWith(comedy_handles1, class_name.toLowerCase()[0]);
	}else if (domestic_interests.indexOf(interest) != -1){
			return getRandomElementFromArrayThatStartsWith(domestic_handles1, class_name.toLowerCase()[0]);
	}else if (athletic_interests.indexOf(interest) != -1){
			return getRandomElementFromArrayThatStartsWith(athletic_handles1, class_name.toLowerCase()[0]);
	}else if (terrible_interests.indexOf(interest) != -1){
			return getRandomElementFromArrayThatStartsWith(terrible_handles1, class_name.toLowerCase()[0]);
	}else if (fantasy_interests.indexOf(interest) != -1){
			return getRandomElementFromArrayThatStartsWith(fantasy_handles1, class_name.toLowerCase()[0]);
	}else if (justice_interests.indexOf(interest) != -1){
			return getRandomElementFromArrayThatStartsWith(justice_handles1, class_name.toLowerCase()[0]);
	}
	console.log("I didn't return anything!? What was my interest: " + interest)
}

function getInterestHandle2(aspect,interest){
	if(music_interests.indexOf(interest) != -1){
		return getRandomElementFromArrayThatStartsWith(music_handles2, aspect.toUpperCase()[0]);
	}else if (culture_interests.indexOf(interest) != -1){
		return getRandomElementFromArrayThatStartsWith(culture_handles2, aspect.toUpperCase()[0]);
	}else if (writing_interests.indexOf(interest) != -1){
		return getRandomElementFromArrayThatStartsWith(writing_handles2, aspect.toUpperCase()[0]);
	}else if (pop_culture_interests.indexOf(interest) != -1){
		return getRandomElementFromArrayThatStartsWith(pop_culture_handles2, aspect.toUpperCase()[0]);
	}else if (technology_interests.indexOf(interest) != -1){
		return getRandomElementFromArrayThatStartsWith(technology_handles2, aspect.toUpperCase()[0]);
	}else if (social_interests.indexOf(interest) != -1){
		return getRandomElementFromArrayThatStartsWith(social_handles2, aspect.toUpperCase()[0]);
	}else if (romantic_interests.indexOf(interest) != -1){
		return getRandomElementFromArrayThatStartsWith(romantic_handles2, aspect.toUpperCase()[0]);
	}else if (academic_interests.indexOf(interest) != -1){
		return getRandomElementFromArrayThatStartsWith(academic_handles2, aspect.toUpperCase()[0]);
	}else if (comedy_interests.indexOf(interest) != -1){
		return getRandomElementFromArrayThatStartsWith(comedy_handles2, aspect.toUpperCase()[0]);
	}else if (domestic_interests.indexOf(interest) != -1){
		return getRandomElementFromArrayThatStartsWith(domestic_handles2, aspect.toUpperCase()[0]);
	}else if (athletic_interests.indexOf(interest) != -1){
		return getRandomElementFromArrayThatStartsWith(athletic_handles2, aspect.toUpperCase()[0]);
	}else if (terrible_interests.indexOf(interest) != -1){
		return getRandomElementFromArrayThatStartsWith(terrible_handles2, aspect.toUpperCase()[0]);
	}else if (fantasy_interests.indexOf(interest) != -1){
		return getRandomElementFromArrayThatStartsWith(fantasy_handles2, aspect.toUpperCase()[0]);
	}else if (justice_interests.indexOf(interest) != -1){
		return getRandomElementFromArrayThatStartsWith(justice_handles2, aspect.toUpperCase()[0]);
	}
}

function getBlandHandle1(class_name){
	var second_arr = [];
	if(class_name == "Maid"){
		second_arr = maid_handles;
	}else if(class_name == "Page"){
		second_arr = page_handles;
	}else if(class_name == "Mage"){
		second_arr = mage_handles;
	}else if(class_name == "Knight"){
		second_arr = knight_handles;
	}else if(class_name == "Rogue"){
		second_arr = rogue_handles;
	}else if(class_name == "Sylph"){
		second_arr = sylph_handles;
	}else if(class_name == "Seer"){
		second_arr = seer_handles;
	}else if(class_name == "Thief"){
		second_arr = thief_handles;
	}else if(class_name == "Heir"){
		second_arr = heir_handles;
	}else if(class_name == "Bard"){
		second_arr = bard_handles;
	}else if(class_name == "Prince"){
		second_arr = prince_handles;
	}else if(class_name == "Witch"){
		second_arr = witch_handles;
	}
	return getRandomElementFromArray(second_arr);
}

function getBlandHandle2(aspect){
	var first_arr = [];
	if(aspect == "Space"){
		first_arr = space_handles;
	}else if(aspect == "Time"){
		first_arr = time_handles;
	}else if(aspect == "Breath"){
		first_arr = breath_handles;
	}else if(aspect == "Doom"){
		first_arr = doom_handles;
	}else if(aspect == "Blood"){
		first_arr = blood_handles;
	}else if(aspect == "Heart"){
		first_arr = heart_handles;
	}else if(aspect == "Mind"){
		first_arr = mind_handles;
	}else if(aspect == "Light"){
		first_arr = light_handles;
	}else if(aspect == "Void"){
		first_arr = void_handles;
	}else if(aspect == "Rage"){
		first_arr = rage_handles;
	}else if(aspect == "Hope"){
		first_arr = hope_handles;
	}else if(aspect == "Life"){
		first_arr = life_handles;
	}
	return getRandomElementFromArray(first_arr);
}


function getRandomChatHandleOld(class_name, aspect){
	var first_arr = [];
	if(aspect == "Space"){
		first_arr = space_handles;
	}else if(aspect == "Time"){
		first_arr = time_handles;
	}else if(aspect == "Breath"){
		first_arr = breath_handles;
	}else if(aspect == "Doom"){
		first_arr = doom_handles;
	}else if(aspect == "Blood"){
		first_arr = blood_handles;
	}else if(aspect == "Heart"){
		first_arr = heart_handles;
	}else if(aspect == "Mind"){
		first_arr = mind_handles;
	}else if(aspect == "Light"){
		first_arr = light_handles;
	}else if(aspect == "Void"){
		first_arr = void_handles;
	}else if(aspect == "Rage"){
		first_arr = rage_handles;
	}else if(aspect == "Hope"){
		first_arr = hope_handles;
	}else if(aspect == "Life"){
		first_arr = life_handles;
	}

	var second_arr = [];
	if(class_name == "Maid"){
		second_arr = maid_handles;
	}else if(class_name == "Page"){
		second_arr = page_handles;
	}else if(class_name == "Mage"){
		second_arr = mage_handles;
	}else if(class_name == "Knight"){
		second_arr = knight_handles;
	}else if(class_name == "Rogue"){
		second_arr = rogue_handles;
	}else if(class_name == "Sylph"){
		second_arr = sylph_handles;
	}else if(class_name == "Seer"){
		second_arr = seer_handles;
	}else if(class_name == "Thief"){
		second_arr = thief_handles;
	}else if(class_name == "Heir"){
		second_arr = heir_handles;
	}else if(class_name == "Bard"){
		second_arr = bard_handles;
	}else if(class_name == "Prince"){
		second_arr = prince_handles;
	}else if(class_name == "Witch"){
		second_arr = witch_handles;
	}
	var tmp =  randomFromTwoArraysOrdered(second_arr, first_arr);
	return tmp[0]  + tmp[1];
}

function getLevelFromFree(){
	return getRandomElementFromArray(free_levels)
}

function getLevelFromInterests(i, interest){
	if(music_interests.indexOf(interest) != -1){
			return music_levels[i]
	}else if (culture_interests.indexOf(interest) != -1){
			return culture_levels[i]
	}else if (writing_interests.indexOf(interest) != -1){
			return writing_levels[i]
	}else if (pop_culture_interests.indexOf(interest) != -1){
			return pop_culture_levels[i]
	}else if (technology_interests.indexOf(interest) != -1){
			return technology_levels[i]
	}else if (social_interests.indexOf(interest) != -1){
			return social_levels[i]
	}else if (romantic_interests.indexOf(interest) != -1){
			return romantic_levels[i]
	}else if (academic_interests.indexOf(interest) != -1){
			return academic_levels[i]
	}else if (comedy_interests.indexOf(interest) != -1){
			return comedy_levels[i]
	}else if (domestic_interests.indexOf(interest) != -1){
			return domestic_levels[i]
	}else if (athletic_interests.indexOf(interest) != -1){
			return athletic_levels[i]
	}else if (terrible_interests.indexOf(interest) != -1){
			return terrible_levels[i]
	}else if (fantasy_interests.indexOf(interest) != -1){
			return fantasy_levels[i]
	}else if (justice_interests.indexOf(interest) != -1){
			return justice_levels[i]
	}
}
function getLevelFromAspect(i, aspect){
	//console.log("looking for level from aspect, i is " + i);
	var first_arr = [];
	if(aspect == "Space"){
		first_arr = space_levels;
	}else if(aspect == "Time"){
		first_arr = time_levels;
	}else if(aspect == "Breath"){
		first_arr = breath_levels;
	}else if(aspect == "Doom"){
		first_arr = doom_levels;
	}else if(aspect == "Blood"){
		first_arr = blood_levels;
	}else if(aspect == "Heart"){
		first_arr = heart_levels;
	}else if(aspect == "Mind"){
		first_arr = mind_levels;
	}else if(aspect == "Light"){
		first_arr = light_levels;
	}else if(aspect == "Void"){
		first_arr = void_levels;
	}else if(aspect == "Rage"){
		first_arr = rage_levels;
	}else if(aspect == "Hope"){
		first_arr = hope_levels;
	}else if(aspect == "Life"){
		first_arr = life_levels;
	}
	//console.log("found: " + first_arr[i])
	return first_arr[i];
}

function getLevelFromClass(i,class_name){
	//console.log("looking for level from class");
	var first_arr = [];
	if(class_name == "Maid"){
		first_arr = maid_levels;
	}else if(class_name == "Page"){
		first_arr = page_levels;
	}else if(class_name == "Mage"){
		first_arr = mage_levels;
	}else if(class_name == "Knight"){
		first_arr = knight_levels;
	}else if(class_name == "Rogue"){
		first_arr = rogue_levels;
	}else if(class_name == "Sylph"){
		first_arr = sylph_levels;
	}else if(class_name == "Seer"){
		first_arr = seer_levels;
	}else if(class_name == "Thief"){
		first_arr = thief_levels;
	}else if(class_name == "Heir"){
		first_arr = heir_levels;
	}else if(class_name == "Bard"){
		first_arr = bard_levels;
	}else if(class_name == "Prince"){
		first_arr = prince_levels;
	}else if(class_name == "Witch"){
		first_arr = witch_levels;
	}
	return first_arr[i];
}

function getRandomQuestFromAspect(aspect){
	//console.log("looking for level from aspect");
	var first_arr = [];
	if(aspect == "Space"){
		first_arr = space_quests;
	}else if(aspect == "Time"){
		first_arr = time_quests;
	}else if(aspect == "Breath"){
		first_arr = breath_quests;
	}else if(aspect == "Doom"){
		first_arr = doom_quests;
	}else if(aspect == "Blood"){
		first_arr = blood_quests;
	}else if(aspect == "Heart"){
		first_arr = heart_quests;
	}else if(aspect == "Mind"){
		first_arr = mind_quests;
	}else if(aspect == "Light"){
		first_arr = light_quests;
	}else if(aspect == "Void"){
		first_arr = void_quests;
	}else if(aspect == "Rage"){
		first_arr = rage_quests;
	}else if(aspect == "Hope"){
		first_arr = hope_quests;
	}else if(aspect == "Life"){
		first_arr = life_quests;
	}
	return getRandomElementFromArray(first_arr);
}



/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.seededRandom() * (max - min + 1)) + min;
}

function getRandomIntNoSeed(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//
//using a seed will let me make the simulations predictable. This enables sharing AND bullshit cloud predictions.
//and stable time loops. and god, i'm getting the vapors here.
function getRandomSeed() {
	//console.log("getting a random seed, probably to reinit the seed")
	var min = 0;
	var max = 413*612*1025;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


 //I am in love:  http://indiegamr.com/generate-repeatable-random-numbers-in-js/
// in order to work 'Math.seed' must NOT be undefined,
// so in any case, you HAVE to provide a Math.seed
Math.seededRandom = function(max, min) {
	//console.log("getting seeded random");
    max = max || 1;
    min = min || 0;

    Math.seed = (Math.seed * 9301 + 49297) % 233280;
    var rnd = Math.seed / 233280;

    return min + rnd * (max - min);
}

function getRandomQuestFromClass(class_name){
	//console.log("looking for level from class");
	var first_arr = [];
	if(class_name == "Maid"){
		first_arr = maid_quests;
	}else if(class_name == "Page"){
		first_arr = page_quests;
	}else if(class_name == "Mage"){
		first_arr = mage_quests;
	}else if(class_name == "Knight"){
		first_arr = knight_quests;
	}else if(class_name == "Rogue"){
		first_arr = rogue_quests;
	}else if(class_name == "Sylph"){
		first_arr = sylph_quests;
	}else if(class_name == "Seer"){
		first_arr = seer_quests;
	}else if(class_name == "Thief"){
		first_arr = thief_quests;
	}else if(class_name == "Heir"){
		first_arr = heir_quests;
	}else if(class_name == "Bard"){
		first_arr = bard_quests;
	}else if(class_name == "Prince"){
		first_arr = prince_quests;
	}else if(class_name == "Witch"){
		first_arr = witch_quests;
	}
	return getRandomElementFromArray(first_arr);
}

function randomFromTwoArrays(arr1, arr2){
	if(Math.seededRandom() > .5){
		return [getRandomElementFromArray(arr2), getRandomElementFromArray(arr1)];
	}else{
		return [getRandomElementFromArray(arr1), getRandomElementFromArray(arr2)];
	}
}

function randomFromTwoArraysOrdered(arr1, arr2){
	return [getRandomElementFromArray(arr1), getRandomElementFromArray(arr2)];
}

function indexToWords(i){
	var words = ["first","second","third","fourth","fifth","sixth","seventh","eighth","ninth","tenth","eleventh","twelfth",];
	return words[i];
}

function debug(str){
	$("#debug").append("<br>" + str);
}

//why does this not work with seeded randomness?
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.seededRandom() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function removeFromArray(item, array){
	var index = array.indexOf(item);
	if (index > -1) {
		array.splice(index, 1);
	}
}

var moons = ["Prospit", "Derse"];
var classes = ["Maid","Page","Mage","Knight","Rogue","Sylph","Seer","Thief","Heir","Bard","Prince","Witch"];
//when a class is used, remove from below list.
var available_classes = ["Maid","Page","Mage","Knight","Rogue","Sylph","Seer","Thief","Heir","Bard","Prince","Witch"];
var two_person_classes = ["Lord","Muse"];
var required_aspects = ["Space", "Time"];
var nonrequired_aspects = ["Breath","Doom","Blood","Heart","Mind","Light","Void","Rage","Hope","Life"];
var available_aspects = ["Breath","Doom","Blood","Heart","Mind","Light","Void","Rage","Hope","Life"];

//TODO eventually implent null land titles, like Mounds and Xenon.
var space_land_titles = ["Frogs"];
var time_land_titles = ["Quartz", "Clockwork", "Gears", "Melody"];
var breath_land_titles = ["Wind", "Breeze", "Zephyr"];
var doom_land_titles = ["Fire", "Death", "Prophecy"];
var blood_land_titles = ["Pulse","Bonds", "Clots"];
var heart_land_titles = ["Little Cubes", "Dolls","Selfies"];
var mind_land_titles = ["Thought", "Rationality", "Decisions"];
var light_land_titles = ["Treasure","Light","Knowledge"];
var void_land_titles = ["Silence","Nothing","Void"];
var rage_land_titles = ["Mirth","Whimsy","Madness"];
var hope_land_titles = ["Angels","Hope","Belief"];
var life_land_titles = ["Dew","Spring","Beginnings"];

var free_land_titles = ["Heat","Sand","Brains","Haze","Tea","Flow","Maps","Caves","Tents","Wrath","Rays","Glass"];
free_land_titles = free_land_titles.concat(["Shade","Frost","Rain","Fog","Trees","Flowers","Books","Technology","Ice","Water","Rocks"]);
free_land_titles = free_land_titles.concat(["Forests","Grass","Tundra","Thunder","Storms","Peace","Food","Shoes","Weasels","Deserts","Dessert"]);
free_land_titles = free_land_titles.concat(["Suburbs","Cities","Neighborhoods","Isolation","Schools","Farms","Annoyance","Hunger","Cake","Lies","Ruse"]);



var prototypings = ["Cow","Bird","Bug","Grandma","Uncle","Aunt","Cat","Dog","Pigeon","Octopus","Nick Cage","Fish","Kitten"];
prototypings = prototypings.concat(["Worm","Pony","Horse","Bear","Goat","Rat","Sheep","Crab","Spider","Raccoon"]);
prototypings = prototypings.concat(["Crow","Chicken","Duck","Sparrow","Dove","Goose","Turkey","Kangaroo","Lawyer","Doctor"]);
prototypings = prototypings.concat(["Ladybug","Butterfly","Fly","Mosquito","Centipede","Praying Mantis","Dragonfly","Ant"]);
prototypings = prototypings.concat(["Bull","Llama","Ox","Bison","Elephant","Giraffe","Sloth","Engineer","Construction Worker"]);
prototypings = prototypings.concat(["Mouse","Gerbil","Hamster","Sugar Glider","Rabbit","Guinea Pig","Chinchilla","Pomeranian"]);
prototypings = prototypings.concat(["Opossum","Penguin","Koala","Walrus","Dachshund","Ocelot","Tiger","Lion", "Cougar"]);
prototypings = prototypings.concat(["Stoner","Student","Librarian","Teacher","Jockey","Butler","Rapper","Poet", "Astronaut", "Cowboy"]);
prototypings = prototypings.concat(["Robot","Game Bro","Game Grl","Movie Star","Internet Troll"]);


var disastor_prototypings = ["First Guardian", "Horrorterror", "Dragon", "Alien", "Teacher", "Clown","Fiduspawn","Doll","Xenomorph"];
disastor_prototypings = disastor_prototypings.concat(["Zombie","Demon","Monster","Vampire","Pumpkin","Werewolf","Puppet"]);
var fortune_prototypings = ["Frog","Lizard", "Salamander", "Iguana", "Crocodile", "Turtle", "Snake","Axolotl","Newt"];

//keep copies here, but if a prototyping isn't on one of these lists, consider it 'neutrasl
//helpfulness is in regards to landquests. '
//helpful prototypings are generally non-authority figure humans, besides things like rappers and poets who embrace riddle-fuckery.
//once i enable self-prototyping, add your name to the helful prototyping array.
var helpful_prototypings = ["Robot","Game Bro","Horrorterror","Game Grl","Nick Cage","Lawyer","Doctor","Engineer","Construction Worker","Student","Librarian","Jockey","Butler","Astronaut", "Cowboy"];
var unhelpful_prototypings = ["First Guardian", "Teacher", "Clown","Pomeranian","Pony","Horse","Doll","Internet Troll","Mosquito","Fly","Gobblefiend"];
var player_prototypings = []; //empty unless a player prototypes themselves.


var space_levels = ["GREENTIKE", "RIBBIT RUSTLER", "FROG-WRANGLER"];
var time_levels = ["MARQUIS MCFLY", "JUNIOR CLOCK BLOCKER", "DEAD KID COLLECTOR"];
var breath_levels = ["BOY SKYLARK", "SODAJERK'S CONFIDANTE", "MAN SKYLARK"];
var doom_levels = ["APOCALYPSE HOW", "REVELATION RUMBLER", "PESSIMISM PILGRIM"];
var blood_levels = ["FRIEND HOARDER YOUTH","HEMOGOBLIN", "SOCIALIST BUTTERFLY"];
var heart_levels = ["SHARKBAIT HEARTHROB", "FEDORA FLEDGLING","PENCILWART PHYLACTERY"];
var mind_levels = ["NIPPER-CADET", "COIN-FLIPPER CONFIDANTE", "TWO-FACED BUCKAROO"];
var light_levels = ["SHOWOFF SQUIRT","JUNGLEGYM SWASHBUCKLER","SUPERSTITIOUS SCURRYWART"];
var void_levels = ["KNOW-NOTHING ANKLEBITER","INKY BLACK SORROWMASTER","FISTICUFFSAFICTIONADO"];
var rage_levels = ["MOPPET OF MADNESS","FLEDGLING HATTER","RAGAMUFFIN REVELER"];
var hope_levels = ["GADABOUT PIPSQUEAK","BELIVER EXTRAORDINAIRE","DOCTOR FEELGOOD"];
var life_levels = ["BRUISE BUSTER","LODESTAR LIFER","BREACHES HEALER"];

var maid_levels = ["SCURRYWART SERVANT", "SAUCY PILGRIM", "MADE OF SUCCESS"];
var page_levels = ["APPRENTICE ANKLEBITER", "JOURNEYING JUNIOR", "OUTFOXED BUCKAROO"];
var mage_levels = ["WIZARDING TIKE", "THE SORCERER'S SCURRYWART", "FAMILIAR FRAYMOTTIFICTIONADO"];
var knight_levels = ["QUESTING QUESTANT", "LADABOUT LANCELOT", "SIR SKULLDODGER"];
var rogue_levels = ["KNEEHIGH ROBINHOOD","DASHING DARTABOUT", "COMMUNIST COMMANDER"];
var sylph_levels = ["SERENE SCALLYWAG", "MYSTICAL RUGMUFFIN","FAE FLEDGLING"];
var thief_levels = ["RUMPUS RUINER", "HAMBURGLER YOUTH", "PRISONBAIT"];
var heir_levels = ["UNREAL HEIR","HEIR CONDITIONER","EXTRAORDINHEIR"];
var bard_levels = ["SKAIA'S TOP IDOL","POPSTAR BOPPER","SONGSCUFFER"];
var prince_levels = ["PRINCE HARMING","ROYAL RUMBLER","DIGIT PRINCE"];
var witch_levels = ["WESTWORD WORRYBITER","BUBBLETROUBLER","EYE OF GRINCH"];
var seer_levels = ["SEEING iDOG","PIPSQUEAK PROGNOSTICATOR","SCAMPERVIEWER 5000"];

var free_levels = ["NIPPER CADET","PESKY URCHIN","BRAVESPROUT","JUVESQUIRT","RUMPUS BUSTER","CHAMP-FRY","ANKLEBITER","CALLOUSED TENDERFOOT","RASCALSPRAT","GRITTY MIDGET","BRITCHES RIPPER","ALIEN URCHIN", "NESTING NEWB"]
//only need two for each. since each player has two interests, combines to 4
var music_levels = ["SINGING SCURRYWORT","MUSICAL MOPPET"];
var culture_levels = ["APPRENTICE ARTIST","CULTURE BUCKAROO"];
var writing_levels = ["SHAKY SHAKESPEARE","QUILL RUINER"];
var pop_culture_levels = ["TRIVIA SMARTYPANTS","NIGHTLY NABBER"];
var technology_levels = ["HURRYWORTH HACKER","CLANKER CURMUDGEON"];
var social_levels = ["FRIEND-TO-ALL","FRIEND COLLECTOR"];
var romantic_levels = ["QUESTING CUPID","ROMANCE EXPERT"];
var academic_levels = ["NERDY NOODLER","SCAMPERING SCIENTIST"];
var comedy_levels = ["PRATFALL PRIEST","BEAGLE PUSS DARTABOUT"];
var domestic_levels = ["BATTERBRAT","GRITTY GUARDIAN"];
var athletic_levels = ["MUSCLES HOARDER","BODY BOOSTER"];
var terrible_levels = ["ENEMY #1","JERKWAD JOURNEYER"];
var fantasy_levels = ["FAKEY FAKE LOVER","FANTASTIC DREAMER"];
var justice_levels = ["JUSTICE JUICER","BALANCE RUMBLER"];

var level_bg_colors = ["#8ff74a","#ba1212","#ffffee","#f0ff00","#9c00ff","#2b6ade","#003614","#f8e69f","#0000ff","#eaeaea","#ff9600","#581212","#ffa6ac","#1f7636","#ffe1fc","#fcff00"];
var level_font_colors = ["#264d0c","#ff00d2","#ff0000","#626800","#da92e0","#022e41","#aaffa6","#000052","#6dffdb","#e5d200","#00911b","#ff0000","#5e005f","#fbff8d","#000000","#"];

var space_quests = ["messing with a variety of frogs that were previously paradox cloned"];
space_quests.push("paradox cloning a variety of frogs, after making a serious note to mess with them later");
space_quests.push("combining paradox slime from multiple frogs together to make paradox offspring");
space_quests.push("listening to the ridiculously similar croaks of cloned frogs to figure out where their flaws are");
var time_quests = ["manipulating the local stock exchange through a series of cunningly disguised time doubles"];
time_quests.push("stopping a variety of disasters from happening before even the first player enters the medium");
time_quests.push("cheating at obstacle course time trials to get a finishing value of exactly 0.0 seconds");
time_quests.push("restoring a legendary piece of shit weapon to its pre-destroyed state");
var breath_quests = ["putting out fires in consort villages through serendepitious gales of wind"];
breath_quests.push("delivering mail through a complicated series of pneumatic tubes");
breath_quests.push("paragliding through increasingly elaborate obstacle courses to become the champion (it is you)");
var doom_quests = ["calculating the exact moment a planet quake will destroy a consort village with enough time remaining to perform evacuation"];
doom_quests.push("setting up increasingly complex Rube Goldberg machines to defeat all enemies in a dungeon at once");
doom_quests.push("obnoxiously memorizing the rules of a minigame, and then blatantly  abusing them to achieve an otherwise impossible victory");
var blood_quests = ["uniting warring consort nations against a common enemy"];
blood_quests.push("organizing 5 bickering consorts long enough to transverse a dungeon with any degree of competence");
blood_quests.push("learning the true meaning of this human disease called friendship");
var heart_quests = ["providing a matchmaking service for the local consorts (ships guaranteed)"];
heart_quests.push("doing battle with shadow clones that are eventually defeated when you accept them as a part of you");
heart_quests.push("correctly picking out which item represents them out of a vault of a thousand bullshit shitty stuffed animals");
var mind_quests = ["manipulating the local consorts into providing dungeon clearing services"];
mind_quests.push("presiding over increasingly hard consort court cases, punishing the guilty and pardoning the innocent");
mind_quests.push("pulling pranks as a minigame, with bonus points awared for pranks performed on those who 'had it coming'");
var light_quests = ["winning at increasingly unfair gambling challenges"];
light_quests.push("researching way too much lore and minutia to win at trivia contests");
light_quests.push("explaining how to play a mini game to particularly stupid consorts until they finally get it");
var void_quests = ["destroying and/or censoring embarassing consort records"];
void_quests.push("definitely doing quests, just...not where we can see them");
void_quests.push("playing a hilariously fun boxing minigame");
var rage_quests = ["fighting hoards upon hoards of enemies in increasingly unfair odds until defeating them all in a beserk rage"]; //You can't believe how easy it is. You just have to go... a little crazy. And then, suddenly, it all makes sense, and everything you do turns to gold.
rage_quests.push("figuring out increasingly illogical puzzles until lateral thinking becomes second nature");
rage_quests.push("dealing with the most annoying dungeon challenges ever, each more irritating and aneurysm inducing than the last");
var hope_quests = ["performing bullshit acts of faith, like walking across invisible bridges"];
hope_quests.push("becoming the savior of the local consorts, through fullfillment of various oddly specific prophecies");
hope_quests.push("brainstorming a variety of ways the local consorts can solve their challenges");
var life_quests = ["coaxing the fallow farms of the local consorts into becoming fertile"];
life_quests.push("healing a seemingly endless parade of stricken consorts");
life_quests.push("finding and rescuing consort children trapped in a burning building");


var maid_quests = ["doing the consorts' menial errands, like delivering an item to a dude standing RIGHT FUCKING THERE"];
maid_quests.push("repairing various ways the session has been broken");
maid_quests.push("protecting various consorts with game powers");
var page_quests = ["going on various quests of self discovery and confidence building"];
page_quests.push("partnering with a local consort hero to do great deeds and slay evil foes");
page_quests.push("learning to deal with disapointment after dungeon after dungeon proves to have all the enemies, and none of the treasure");
var mage_quests = ["performing increasingly complex alchemy for demanding, moody consorts"];
mage_quests.push("learning to silence their Mage Senses long enough to not go insane");
mage_quests.push("learning to just let go and let things happen");
var knight_quests = ["protecting the local consorts from a fearsome foe"];
knight_quests.push("protecting the session from various ways it can go shithive maggots");
knight_quests.push("questing to collect the 7 bullshit orbs of supreme bullshit and deliver them to the consort leader");
var rogue_quests = ["robbing various tombs and imp settlements to give to impovished consorts"];
rogue_quests.push("stealing a priceless artifact in order to fund consort orphanages");
rogue_quests.push("planning an elaborate heist to steal priceless grist from a boss ogre in order to alchemize shoes for orphans");
var sylph_quests = ["restoring a consort city to its former glory"];
sylph_quests.push("preserving the legacy of a doomed people");
sylph_quests.push("providing psychological counsling to homeless consorts");
var thief_quests = ["robbing various enemy imps and ogres to obtain vast riches"];
thief_quests.push("planning an elaborate heist that relies on several hard-to-predict factors going absolutely perfectly");
thief_quests.push("torrenting vast amounts of grist from the other players");
var heir_quests = ["retrieving a sword from a stone"];
heir_quests.push("completing increasingly unlikely challenges through serendepitious coincidences");
heir_quests.push("inheriting and running a succesful, yet complex company");
var bard_quests = ["allowing events to transpire such that various quests complete themselves"];
bard_quests.push("baiting various enemies into traps for an easy victory");
bard_quests.push("watching as their manipulations result in consorts rising up to defeat imps");
var prince_quests = ["destroying enemies thoroughly"];
prince_quests.push("riding in at the last minute to defeat the local consorts hated enemies");
prince_quests.push("learning to grow as a person, despite the holes in their personality");
var seer_quests = ["making the various bullshit rules of SBURB part of their personal mythos"];
seer_quests.push("collaborating with the exiled future carapacians to manipulate Prospit and Derse according to how its supposed to go");
seer_quests.push("suddenly understanding everything, and casting sincere doubt at the laughable insinuation that they ever didn't");
var witch_quests = ["performing elaborate punch card alchemy through the use of a novelty witch's cauldron"];
witch_quests.push("deciding which way to go in a series of way-too-long mazes");
witch_quests.push("solving puzzles in ways that completely defy expectations");



var space_denizen = "Echidna";
var time_denizen = "Hephaestus";
var breath_denizen = "Typheus";
var doom_denizen = "Cassandra";//
var blood_denizen = "Hestia";//
var heart_denizen = "Aphrodite";//
var mind_denizen = "Janus";//
var light_denizen = "Cetus";
var void_denizen = "Nix";
var hope_denizen = "Abraxus";
var life_denizen = "Hemera";
var rage_denizen = "Bacchus";//


/*
this.goodMild = "Friends";
	this.goodBig = "Totally In Love";
	this.badMild = "Rivals";
	this.badBig = "Enemies";
	*/
var goodMildDesc = ["a pretty good kid", "nice enough", "merely tolerable", "just friendly"];
var goodBigDesc = ["the most fascinating kid left", "distractingly pretty", "really hot"];
var bigMildDesc = ["kind of a jerk", "sort of an asshole", "only sort of irritating", "just a little annoying"];
var bigBadDesc = ["just the smelliest bag of assholes", "the most infuriating asshole around", "most likely to screw everyone over", "dangerous"];


var democracyTasks = ["WV gives talks to a random carapacian boy, demanding he support democracy."," WV gathers followers using techniques learned from reading a book on carapacian etiquette. "];
democracyTasks.push(" WV demonstrates tactical knowledge to Dersites, convincing them they can win against the King. ");
democracyTasks.push(" WV gives rousing speeches to Prospitians, emphasizing that they share the same goal. ");
democracyTasks.push(" WV gives rousing speeches to Dersites, listing every crime the King and Queen have commited against their own people. ");
democracyTasks.push(" WV debates Dersite beliefs, asking if they REALLY want to die in the Reckoning rather than go live in a new Universe (loathesome though frogs may be). ");



var democracySuperTasks = [" WV flips the fuck out and starts distributing free TAB soda to anyone who joins his army. "];
democracySuperTasks.push(" WV grabs a random Player and uses them as a prop during a speech, triggering the frothing devotion of the local consorts. ");
democracySuperTasks.push("");

var mayorDistractionTasks = [" WV is distracted eating green objects rather than recruiting for his army. "];
mayorDistractionTasks.push( " WV is distracted planning the civil infrastructure of a city, rather than recruiting for his army.");
mayorDistractionTasks.push(" WV is distracted fantasizing about how great of a mayor he will be. ");
mayorDistractionTasks.push(" WV accidentally tried to recruit carapacians already part of his army. Stupid stupid stupid! ");

var tricksterColors = ["#FF0000","#00FF00","#0000FF","#FFFF00","#00FFFF","#FF00FF","#efffff","#5ef89c","#5ed6f8","#f85edd","#ffcaf6","#d0ffca","#cafcff","#fffdca","#ffd200","#a7caff","#ff6c00","#fffc00","#f5b4ff","#ffceb1","#ffcaca","#e0efc6","#c5ffed","#c5dcff","#ebdbff","#ffdbec","#ecfff4","#f0ecff","#c0ff00","#f7bfff","#dfffbf"];

var bloodColors = ["#A10000","#a25203","#a1a100","#658200","#416600","#078446","#008282","#004182","#0021cb","#631db4","#610061","#99004d"];

var landlususTypes = ["Hoofbeast","Meow Beast","Bark Beast","Nut Creature ","Gobblefiend","Bicyclops","Centaur","Fairy Bull"];
landlususTypes = landlususTypes.concat(["Slither Beast","Wiggle Beast","Honkbird","Dig Beast","Cholerbear","Antler Beast","Dragon","Ram Beast","Crab","Spider","Thief Beast"]);
landlususTypes = landlususTypes.concat(["March Bug","Nibble Vermin","Woolbeast", "Hop Beast", "Stink Creature", "Speed Beast", "Jump Creature", "Fight Beast", "Claw Beast", "Tooth Beast", "Armor Beast","Trap Beast"]);


var seaLususTypes = ["Zap Beast","Slither Beast", "Electric Beast", "Whale", "Sky Horse", "Sea Meow Beast", "Sea Hoofbeast", "Cuttlefish", "Horrorterror", "Swim Beast", "Sea Goat", "Tooth Beast", "Light Beast"]
seaLususTypes = seaLususTypes.concat(["Dive Beast", "Honkbird", "Sea Bear", "Sea Armorbeast"]);

interests = []

var music_interests = ["Rap","Music","Song Writing","Musicals","Dance", "Singing","Ballet","Playing Guitar","Playing Piano", "Mixtapes","Turntables"];
var culture_interests = ["Drawing","Painting","Documentaries","Fan Art" ,"Graffiti","Fashion","Theater","Fine Art", "Literature","Books", "Movie Making"];
var writing_interests = ["Writing", "Fan Fiction","Script Writing","Character Creation","Dungeon Mastering", "Authoring"];
var pop_culture_interests = ["Irony","Action Movies", "Superheroes", "Supervillains", "Video Games", "Movies", "Television","Comic Books","TV","Heroes"];
var technology_interests = ["Programming", "Hacking","Robots","Artificial Intelligence", "Engineering","Manufacturing","Cyborgs", "Androids","A.I.","Automation"];
var social_interests = ["Psychology","Religion","Animal Training", "Pets","Animals","Online Roleplaying", "Live Action Roleplaying","Tabletop Roleplaying", "Role Playing","Social Media","Charity","Mediating"];
var romantic_interests = ["Girls", "Boys","Romance","Relationships", "Love", "Romantic Comedies","Fate","Dating"];
var academic_interests = ["Archaeology","Astronomy","Knowledge","Physics", "Biology", "Chemistry","Geneology","Science","Molecular Gastronomy","Model Trains","Politics","Geography", "Cartography","Typography","History"];
var comedy_interests = ["Puppets","Pranks","Comedy", "Jokes", "Puns", "Stand-up Comedy","Humor","Comics","Satire","Knock Knock Jokes"];
var domestic_interests = ["Sewing", "Fashion","Gardening","Meditation","Babies","Peace","Knitting","Cooking", "Baking","Gardening", "Crochet", "Scrapbooking"];
var athletic_interests = ["Yoga","Fitness", "Sports","Boxing", "Track and Field", "Swimming", "Baseball", "Hockey", "Football", "Basketball", "Weight Lifting"];
var terrible_interests = ["Clowns", "Money","Violence", "Death","Animal Fights","Insults","Hoarding","Status","Racism", "Online Trolling","Intimidation","Fighting","Genocide","Murder","War"];
var fantasy_interests = ["Wizards", "Horrorterrors", "Mermaids", "Unicorns", "Science Fiction", "Fantasy","Ninjas","Aliens","Conspiracies","Faeries", "Elves", "Vampires", "Undead"];
var justice_interests = ["Social Justice","Detectives","Mysteries","Leadership","Revolution","Justice","Equality","Sherlock Holmes"]
interests = interests.concat(music_interests);
interests = interests.concat(culture_interests);
interests = interests.concat(writing_interests);
interests = interests.concat(pop_culture_interests);
interests = interests.concat(technology_interests);
interests = interests.concat(social_interests);
interests = interests.concat(romantic_interests);
interests = interests.concat(academic_interests);
interests = interests.concat(comedy_interests);
interests = interests.concat(domestic_interests);
interests = interests.concat(athletic_interests);
interests = interests.concat(terrible_interests);
interests = interests.concat(fantasy_interests);
interests = interests.concat(justice_interests);


var prefixes = ["8=D",">->","//", "tumut",")","><>","(", "$", "?", "=begin", "=end"]
prefixes = prefixes.concat(["<3","<3<","<>","c3<","{","}","[","]","'",".",",","~","!","~","^","&","#","@","%","*"]);

debug("TODO: interest quirks, is it worth it?")
var music_quirks = [];
var culture_quirks = [];
var writing_quirks = [];
var pop_culture_quirks = [];
var technology_quirks = [];
var social_quirks = [];
var romantic_quirks = [];
var academic_quirks = [];
var comedy_quirks = [];
var domestic_quirks = [];
var athletic_quirks = [];
var terrible_quirks = [];
var fantasy_quirks = [["very","fairy"]];
var justice_quirks = [];

var sbahj_quirks = [["asshole","dunkass"],["happen","hapen"],["we're","where"],["were","where"],["has","hass"],["lol","ahahahaha"],["dog","god"],["god","dog"],["know","no"]];
sbahj_quirks = sbahj_quirks.concat([["they're","there"],["their","there"],["theyre","there"],["through","threw"],["lying","lyong"],["distraction","distaction"],["garbage","gargbage"],["angel","angle"]]);
sbahj_quirks = sbahj_quirks.concat([["the","thef"],["i'd","i'd would"],["i'm","i'm am"],["don't","don't not"],["won't","won't not"],["can't","can't not"],["ing","ung"]]);
sbahj_quirks = sbahj_quirks.concat([["ink","ing"],["ed","id"],["id","ed"],["ar","aur"],["umb","unk"],["ian","an"],["es","as"],["ough","uff"]]);


var terribleCSSOptions = [["position: ", "absolute"],["position: ", "relative"],["position: ", "static"],["position: ", "fixed"],["float: ", "left"] ,["float: ", "right"],["width: ", "????"],["height: ", "????"],["right: ", "????"] ,["top: ", "????"] ,["bottom: ", "????"] ,["left: ", "????"]   ];

var fish_quirks = [["ass","bass"],["god","glub"],["god","cod"],["fuck","glub"],["really","reely"],["kill","krill"],["thing","fin"],["well","whale"],["purpose","porpoise"],["better","betta"],["help","kelp"],["see","sea"],["friend","frond"],["crazy","craysea"], ["kid","squid"]];

//not as extreme as a troll quirk, but...
var conversational_quirks = [["guess","suppose"],["oh my god","omg"],["like", "liek"],["ing","in"],["have to","hafta"], ["want to","wanna"],["going to","gonna"], ["i'm","i am"],["you're","you are"],["we're","we are"],["forever","5ever"]];
conversational_quirks = conversational_quirks.concat([["don't know", "dunno"],["school","skool"],["the","teh"],["aren't","aint"],["ie","ei"],["though","tho"],["you","u"],["right","rite"]]);
conversational_quirks = conversational_quirks.concat([["n't"," not"], ["'m'"," am"], ["kind of", "kinda"],["okay", "ok"],["\\band\\b","&"],["\\bat\\b","@"],["okay", "okey dokey"]]);

var very_quirks = [["\\bvery\\b","adequately"],["\\bvery\\b","really"],["\\bvery\\b","super"],["\\bvery\\b", "amazingly"],["\\bvery\\b","hella"],["\\bvery\\b","extremely"],["\\bvery\\b","absolutely"],["\\bvery\\b","mega"],["\\bvery\\b ","extra"],["\\bvery\\b","ultra"],["\\bvery\\b","hecka"],["\\bvery\\b","totes"]];
var good_quirks = [["\\bgood\\b","good"],["\\bgood\\b","agreeable"],["\\bgood\\b", "marvelous"],["\\bgood\\b", "ace"],["\\bgood\\b", "wonderful"],["\\bgood\\b","sweet"],["\\bgood\\b","dope"],["\\bgood\\b","awesome"],["\\bgood\\b","great"],["\\bgood\\b","radical"],["\\bgood\\b","perfect"],["\\bgood\\b","amazing"],["\\bgood\\b","super good"],["\\bgood\\b","acceptable"]];
var asshole_quirks = [["asshole", "asshole"],["asshole", "garbage person"],["asshole", "fucker"],["asshole", "poopy head"],["asshole", "shit sniffer"],["asshole", "jerk"],["asshole", "plebeian"],["asshole", "fuckstain"],["asshole", "douchebag"]];
var lol_quirks = [["lol","lol"],["lol","haha"],["lol","ehehe"],["lol","heh"],["lol","omg lol"],["lol","rofl"],["lol","funny"],["lol",""],["lol","hee"],["lol","lawl"],["lol","roflcopter"],["lol","..."],["lol","bwahah"],["lol","*giggle*"],["lol",":)"]];
var greeting_quirks = [["\\bhey\\b", "hey"],["\\bhey\\b", "hi"],["\\bhey\\b", "hello"],["\\bhey\\b", "greetings"],["\\bhey\\b", "yo"],["\\bhey\\b", "sup"]];
var dude_quirks = [["dude","guy"], ["dude","guy"],["dude","man"],["dude","you"],["dude","friend"],["dude","asshole"],["dude","fella"],["dude","bro"]];
var curse_quirks = [["fuck", "beep"],["fuck", "motherfuck"],["\\bfuck\\b", "um"],["\\bfuck\\b", "fuck"],["\\bfuck\\b", "shit"],["\\bfuck\\b", "cocks"],["\\bfuck\\b", "nope"],["\\bfuck\\b", "goddammit"],["\\bfuck\\b", "damn"],["\\bfuck\\b", "..."],["\\bfuck\\b", "...great."],["\\bfuck\\b", "crap"],["\\bfuck\\b", "fiddlesticks"],["\\bfuck\\b", "darn"],["\\bfuck\\b", "dang"],["\\bfuck\\b", "omg"]];
//problem: these are likely to be inside of other words.
var yes_quirks = [["\\byes\\b","certainly"],["\\byes\\b","indeed"],["\\byes\\b","yes"],["\\byes\\b","yeppers"],["\\byes\\b","right"],["\\byes\\b","yeah"],["\\byes\\b","yep"],["\\byes\\b","sure"],["\\byes\\b","okay"]];
var no_quirks = [["\\bnope\\b","no"],["\\bnope\\b","absolutely no"],["\\bnope\\b","no"],["\\bnope\\b","no"],["\\bnope\\b","nope"],["\\bnope\\b","no way"]];

var smiley_quirks = [[":)", ":)"],[":)", ":0)"],[":)", ":]"],[":)", ":B"],[":)", ">: ]"]];



//TODO redo handle system to be interest based. array of first word and second word options for every interest.
//get something that matches your class/aspect title on your own.
var maid_handles = ["meandering","motley","musing","mischievous","macabre", "maiden"];
var page_handles = ["passionate","patient","peaceful","perfect","perceptive", "practical"];
var mage_handles = ["magnificent","managerial","major","majestic","mannerly"];
var knight_handles = ["keen","knightly","kooky","kindred"];
var rogue_handles = ["rouge","radical","retrobate","roguish","retroactive"];
var sylph_handles = ["surly","sour","sweet","stylish","soaring", "serene"];
var thief_handles = ["talented","terrible","talkative","tenacious","tried"];
var heir_handles = ["honorable","humble","hot","horrific","hardened"];
var bard_handles = ["benign","blissful","boisterous","bonkers","broken"];
var prince_handles = ["precocious","priceless","proficient","prominent","proper"];
var witch_handles = ["wondering","wonderful","wacky","withering","worldly"];
var seer_handles = ["sightly","sanctimonious","sarcastic","sassy","scintillating","synergistic"];

var music_handles1 = ["musical","pianist","melodious","keyboard","rhythmic","singing","tuneful","harmonious","beating","pitch","waltzing","synthesized","piano","serenading"];
var culture_handles1 = ["monochrome","poetic","majestic","keen","realistic","serious","theatrical","haute","beautiful","priceless","watercolor","sensational", "highbrow"];
var writing_handles1 = ["wordy","scribbling","meandering","pageturning","mysterious","knowledgeable","reporting","scribing","tricky","hardcover","bookish","page","writing","scribbler"];
var pop_culture_handles1 = ["worthy","mega","player","mighty","knightly","roguish","super","turbo","titanic","heroic","bitchin","power","wonder","wonderful", "sensational"];
var technology_handles1 = ["kludge","machinist","programming","mechanical","kilo","robotic","silicon","techno","hardware","battery","python","windows","serial"];
var social_handles1 = ["master","playful","matchmaking","kind","regular","social","trusting","honest","benign","precious","wondering","sarcastic", "talkative"];
var romantic_handles1 = ["wishful","matchmaking","passionate","kinky","romantic","serendipitous","true","hearts","blushing","precious","warm","serenading","mesmerizing"];
var academic_handles1 = ["researching","machiavellian","princeton","pedagogical","theoretical","hypothetical","meandering","scholarly","biological","pants","spectacled","scientist","scholastic"];
var comedy_handles1 = ["mischievous","knavish","mercurial","beagle","sarcastic","satirical","mime","pantomime","practicing","pranking","wokka","kooky","haha","humor","talkative"];
var domestic_handles1 = ["motherly","patient","missing","knitting","rising","stylish","trendy","homey","baking","recipe","",""];
var athletic_handles1 = ["kinetic", "muscley", "preening", "mighty", "running", "sporty", "tennis", "hard", "ball", "winning", "trophey", "sports", "physical", "sturdy", "strapping", "hardy", "brawny", "burly", "robust", "strong", "muscular", "phenomenal"];
var terrible_handles1 = ["tyranical","murderous","persnickety","mundane","killer","rough","sneering","hateful","bastard","pungent","wasted","snooty","wicked"];
var fantasy_handles1 = ["musing","pacific","minotaurs","kappas","restful","serene","titans","hazy","best","peaceful","witchs","sylphic"]
var justice_handles1 = ["karmic","mysterious","police","mind","keen","retribution","saving","tracking","hardboiled","broken","perceptive","watching","searching"];


var space_handles = ["Salamander","Salientia","Spacer","Scientist","Synergy"];
var time_handles = ["Teetotaler","Traveler","Tailor","Taster","Target", "Teacher", "Therapist"];
var breath_handles = ["Biologist","Backpacker","Babysitter","Baker","Balooner"];
var doom_handles = ["Dancer","Dean","Decorator","Deliverer","Director"];
var blood_handles = ["Buyer","Butler","Butcher","Barber","Bowler"];
var heart_handles = ["Heart","Hacker","Harbinger","Handler","Helper", "Historian", "Hobbyist"];
var mind_handles = ["Machine","Magician","Magistrate","Mechanic","Mediator", "Messenger"];
var light_handles = ["Laborer","Launderer","Layabout","Legend","Lawyer", "Lifeguard"];
var void_handles = ["Vagrant","Vegetarian","Veterinarian","Vigilante","Virtuoso"];
var rage_handles = ["Raconteur","Reveler","Reader","Reporter","Racketeer"];
var hope_handles = ["Honcho","Humorist","Horse","Haberdasher","Hooligan"];
var life_handles = ["Leader","Lecturer","Liason","Loyalist","Lyricist"];

var music_handles2 = ["Siren","Singer","Tenor","Trumpeter","Baritone","Dancer","Ballerina","Harpsicordist","Musician","Lutist","Violist","Rapper","Harpist","Lyricist","Virtuoso"];
var culture_handles2 = ["Dramatist","Repository","Museum","Librarian","Hegemony","Hierarchy","Davinci","Renaissance","Viniculture","Treaty","Balmoral","Beauty"];
var writing_handles2 = ["Shakespeare","Host","Bard","Drifter","Reader","Booker","Missive","Labret","Lacuna","Varvel","Hagiomaniac","Traveler"];
var pop_culture_handles2 = ["Superhero","Supervillain","Hero","Villain","Liason","Director","Repeat","Blockbuster","Movie","Mission","Legend","Buddy","Spy","Bystander"];
var technology_handles2 = ["Roboticist","Hacker","Haxor","Technologist","Robot","Machine","Machinist","Droid","Binary","Breaker","Vaporware","Lag","Laptop"];
var social_handles2 = ["Socialist","Defender","Mentor","Leader","Veterinarian","Therapist","Buddy","Healer","Helper","Mender","Lender","Dog","Bishop"];
var romantic_handles2 = ["Romantic","Dreamer","Beau","Hearthrob","Virtue","Beauty","Rainbow","Heart","Magnet","Miracle","Serendipity","Team"];
var academic_handles2 = ["Student","Scholar","Researcher","Scientist","Trainee","Biologist","Minerologist","Lecturer","Herbalist","Dean","Director","Honcho","Minder","Verbalist"];
var comedy_handles2 = ["Laugher","Humorist","Trickster","Sellout","Dummy","Silly","Bum","Huckster","Raconteur","Mime","Leaper","Vaudevillian","Baboon","Boor"];
var domestic_handles2 = ["Baker","Darner","Mender","Mentor","Launderer","Vegetarian","Tailor","Teacher","Hestia","Helper","Decorator","Sewer"];
var athletic_handles2 = ["Swimmer","Trainer","Baller","Handler","Runner","Leaper","Racer","Vaulter","Major","Tracker","Heavy","Brawn","Darter"];
var terrible_handles2 = ["Butcher","Barbarian","Tyrant","Superior","Bastard","Dastard","Despot","Bitch","Horror","Victim","Hellhound","Devil","Demon","Shark","Lupin", "Mindflayer","Mummy","Hoarder"];
var fantasy_handles2 = ["Believer","Dragon","Magician","Sandman","Shinigami","Tengu","Harpy","Dwarf","Vampire","Lamia","Roc","Mermaid","Siren","Manticore","Banshee","Basilisk","Boggart"];
var justice_handles2 = ["Detective","Defender","Laywer","Loyalist","Liason","Vigilante","Tracker","Moralist","Retribution","Watchman","Searcher","Perception","Rebel"];





var human_hair_colors = ["#68410a","#000000","#000000","#000000","#f3f28d","#cf6338","#feffd7","#fff3bd","#724107","#382207","#ff5a00","#3f1904","#ffd46d","#473200","#91683c"];

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomGreyColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
	var tmp = "";
    for (var i = 0; i < 2; i++ ) {
        tmp += letters[Math.floor(Math.random() * 16)];
    }
    return color+tmp+tmp+tmp; //grey is just 3 of the same 2 byte hex repeated.
}


function helloWorld(){
	$.ajax({
	  url: "hello_world.txt",
	  success:(function(data){
		  console.log(data)
	  }),
	  dataType: "text"
	});

}
