
//http://taz.harding.edu/~aenglish2/door-prize-program/


document.addEventListener("DOMContentLoaded", start);






var participants = new Array();
var contestants = new Array();
var pDiv;
var cDiv;
var rDiv;
var rHDiv;
var rBDiv;
var wDiv;
var trailDiv;
var participantText;
var participantTextCopy;

var scream1 = document.getElementById("scream1");
var scream2 = document.getElementById("scream2");
var scream3 = document.getElementById("scream3");
var scream4 = document.getElementById("scream4");
var scream5 = document.getElementById("scream5");
var tronTheme1 = document.getElementById("tronTheme1");
var tronTheme2Cut = document.getElementById("tronTheme2-cut");


var left = -220
var posX = [-220, -220, -220, -220, -220];
var posY = [-250, -125, 0, 125, 250];
var dir = [1, 1, 1, 1, 1];
var trailCounter = 0;
var images = new Array(document.getElementById("i1"), document.getElementById("i2"), document.getElementById("i3"), document.getElementById("i4"), document.getElementById("i5"));
var timerId;
var timerId2;
var Grid = [];
var gridIndex = 0;
var crashed = new Array(false, false, false, false);

let themeHasStarted = false;

function startThemeOnceUserClick() {
	if (!themeHasStarted) {
		tronTheme1.play();
		themeHasStarted = true;
	} else {
		document.removeEventListener('click', startThemeOnceUserClick)
	}
}
function start() {

	document.addEventListener('click', startThemeOnceUserClick)

	pDiv = document.getElementById("participantsDiv");
	cDiv = document.getElementById("contestantsDiv");
	rDiv = document.getElementById("raceDiv");
	rHDiv = document.getElementById("raceHeaderDiv");
	rBDiv = document.getElementById("raceBoxDiv");
	wDiv = document.getElementById("winnerDiv");
	trailDiv = document.getElementById("trailsDiv");

	pDiv.style.display = "none";
	cDiv.style.display = "none";
	rDiv.style.display = "none";
	rHDiv.style.display = "none";
	rBDiv.style.display = "none";
	wDiv.style.display = "none"
	trailDiv.style.display = "none";



	// CREATING PARTICIPANTS Page
	pDiv.innerHTML = pDiv.innerHTML + '<h1>Participants</h1><textarea rows="10" cols="50" id="participantBox" style="background-color: #111117; color: #EEEEFF"></textarea>';
	pDiv.innerHTML = pDiv.innerHTML + '<br><button id="pickContestantsButton">Pick Contestants</button>';
	/////////////////////////////



	// CREATING CONTESTANTS Page
	cDiv.innerHTML = cDiv.innerHTML + '<h1>Contestants</h1>';
	for (var i = 0; i < 5; i++) {
		cDiv.innerHTML = cDiv.innerHTML + '<h3 id="c' + (i + 1) + '" class="cHeaders">' + '</h3>';
	}
	cDiv.innerHTML = cDiv.innerHTML + '<br><button id="contestantRace">RACE</button>';
	cDiv.innerHTML = cDiv.innerHTML + '<button id="contestantCancel">Cancel</button>';
	/////////////////////////////



	// CREATING RACE Page
	for (var i = 0; i < 5; i++) {
		rHDiv.innerHTML = rHDiv.innerHTML + '<h3 id="r' + (i + 1) + '" class="rHeaders">' + '</h3>';
		rBDiv.innerHTML = rBDiv.innerHTML + '<img src="square' + (i + 1) + '.png" alt="square' + (i + 1) + '" id="i' + (i + 1) + '"><br>';
	}
	//rDiv.innerHTML = rDiv.innerHTML + '<img src="div-background.jpg" alt="background" id="divBackground3">';
	/////////////////////////////


	// CREATING Win Page
	for (var i = 0; i < 5; i++) {
		wDiv.innerHTML = wDiv.innerHTML + '<h1 id="winner"></h1>';
	}
	wDiv.innerHTML = wDiv.innerHTML + '<br><br><br><br><br><button id="newRace">NEW RACE</button>';
	document.getElementById("newRace").addEventListener("click", participantsPage);
	//document.getElementById("newRace2").addEventListener("click",participantsPage);
	/////////////////////////////


	participantsPage();

}






function participantsPage() {
	participantText = document.getElementById("participantBox");
	for (var i = 0; i < participants.length; i++) {
		participantText.innerHTML = participantText.innerHTML + participants[i] + "<br>";
		//console.log(participants[i]);
	}

	pDiv.style.display = "block";
	cDiv.style.display = "none";
	rDiv.style.display = "none";
	rHDiv.style.display = "none";
	rBDiv.style.display = "none";
	wDiv.style.display = "none"
	trailDiv.style.display = "none";



	document.getElementById("pickContestantsButton").addEventListener("click", gatherParticipants);
}







function contestantsPage() {
	pDiv.style.display = "none";
	cDiv.style.display = "block";
	rDiv.style.display = "none";
	rHDiv.style.display = "none";
	rBDiv.style.display = "none";
	wDiv.style.display = "none"
	trailDiv.style.display = "none";
	var contestantHeaders = [];
	fadeOut(tronTheme1);
	tronTheme2Cut.currentTime = 0;
	fadeIn(tronTheme2Cut);

	for (var i = 0; i < 5; i++) {
		contestantHeaders[i] = document.getElementById("c" + (i + 1))
		contestantHeaders[i].innerHTML = contestants[i];
	}

	document.getElementById("contestantCancel").addEventListener("click", participantsPage);
	document.getElementById("contestantRace").addEventListener("click", racePage);
}






function racePage() {
	pDiv.style.display = "none";
	cDiv.style.display = "none";
	rDiv.style.display = "block";
	rHDiv.style.display = "block";
	rBDiv.style.display = "block";
	wDiv.style.display = "none"
	trailDiv.style.display = "block";
	var contestantHeaders = [];


	for (var i = 0; i < 5; i++) {
		contestantHeaders[i] = document.getElementById("r" + (i + 1))
		contestantHeaders[i].innerHTML = contestants[i];

	}

	setTimeout(startRace, 1000)
}

function winPage() {
	pDiv.style.display = "none";
	cDiv.style.display = "none";
	rDiv.style.display = "none";
	rHDiv.style.display = "none";
	rBDiv.style.display = "none";
	wDiv.style.display = "block"
	trailDiv.style.display = "none";
	fadeOut(tronTheme2Cut);
	fadeIn(tronTheme1);

	var winner;
	var winnerIndex;
	for (var i = 0; i < 5; i++) {
		if (posX[i] == 380) {
			winner = contestants[i];
			winnerIndex = i;
		}
	}

	document.getElementById("winner").innerHTML = winner + ' won!&nbsp ;)<br><br> <img src="square' + (winnerIndex + 1) + '.png" alt="winner" id="winImage" style="width: 100px; height: 100px;">';
	resetSquares();

	setTimeout(shades, 1000);


}





function gatherParticipants() {
	participantText = document.getElementById("participantBox");
	participantTextCopy = participantText.value //copy made so that original entry will not be modified
	var index = 0;
	while (participantTextCopy.search(/[A-Za-z]/) != -1) {
		participants[index] = participantTextCopy = participantTextCopy.substr(participantTextCopy.search(/[A-Za-z]/));//,participantText.value.substr(participantText.value.search(/[A-Za-z]/)).search(/[^A-Za-z][\0]/));

		if (participants[index].search(/[^A-Za-z]/) != -1) {
			participants[index] = participants[index].substr(0, participants[index].search(/[^A-Za-z]/));
		}

		participantTextCopy = participantTextCopy.substr(participants[index].length);
		index++;
		//console.log("<br>name ",index,": ",participants[index-1])
	}
	pickContestants();
}




function pickContestants() {
	//document.writeln("<br>array length: ",participants.length)
	if (participants.length > 5) {   					//if more than 5 contestants, random ones will be chosen, if equal or less, all will be used
		var numContestants = 0;
		var alreadyChosen = "";

		while (numContestants != 5) {  					 //loops until 5 contestants are chosen
			var contestant = Math.floor((participants.length) * Math.random());
			//console.log("<br>random #: ", contestant + 1, ", ", participants[contestant]);
			if (alreadyChosen.search(contestant.toString()) == -1) {
				contestants[numContestants] = participants[contestant];
				numContestants++;
				alreadyChosen = alreadyChosen + contestant.toString();
				//console.log("<br>contestant ",numContestants,": ",contestants[numContestants-1])
			}
		}
		contestantsPage();
	}
	else if (participants.length == 5) {
		for (var i = 0; i < 5; i++) {
			contestants[i] = participants[i];
			//console.log(contestants[i]);
		}
		contestantsPage();
	}
	else if (participants.length < 5) {
		alert("Please enter at least 5 participants");
		participantsPage();
	}

}






function startRace() {


	timerId = setInterval(moveImage, 20);

	for (var i = 0; i < 5; i++) {
		images[i] = document.getElementById('i' + (i + 1));
	}

}

function ensureValidDirection(oldDir, newDir, noDirection) {
	if (newDir !== noDirection) {
		return newDir;
	} else if (newDir === 2) {
		if (oldDir === 2) {
			return 1;
		} else {
			return 3;
		}
	} else if (newDir === 3) {
		if (oldDir === 3) {
			return 1;
		} else {
			return 2;
		}
	}
}

function calcDirection(dir, cannotGoThisWay) {
	path = Math.random();
	if (dir === 1) {
		if (path > .01) {
			return ensureValidDirection(dir, 1, cannotGoThisWay);
		}
		else if (path > .005) {
			return ensureValidDirection(dir, 2, cannotGoThisWay);
		}
		else {
			return ensureValidDirection(dir, 3, cannotGoThisWay);
		}
	}
	else if (dir === 2) {
		if (path > .991) {
			return ensureValidDirection(dir, 1, cannotGoThisWay);
		}
		else {
			return ensureValidDirection(dir, 2, cannotGoThisWay);
		}
	}
	else if (dir === 3) {
		if (path > .991) {
			return ensureValidDirection(dir, 1, cannotGoThisWay);
		}
		else {
			return ensureValidDirection(dir, 3, cannotGoThisWay);
		}
	}
}

function moveImage() {
	for (var i = 0; i < 5; i++) {
		if (!crashed[i]) {
			if (posY[i] === 340) {
				dir[i] = calcDirection(dir[i], 2);
			} else if (posY[i] === -340) {
				dir[i] = calcDirection(dir[i], 3);
			} else {
				dir[i] = calcDirection(dir[i], null);
			}

			if (dir[i] == 1) {
				Grid[gridIndex] = String(posX[i]) + " " + String(posY[i]);
				gridIndex++;
				posX[i] = posX[i] + 1;
				images[i].style.marginLeft = posX[i] + "px";
			}
			else if (dir[i] == 2) {
				Grid[gridIndex] = String(posX[i]) + " " + String(posY[i]);
				posY[i] = posY[i] + 1;
				gridIndex++;
				images[i].style.marginTop = posY[i] + "px";
			}
			else if (dir[i] == 3) {
				Grid[gridIndex] = String(posX[i]) + " " + String(posY[i]);
				posY[i] = posY[i] - 1;
				gridIndex++;
				images[i].style.marginTop = posY[i] + "px";
			}

			if (Grid.indexOf(String(posX[i]) + " " + String(posY[i])) != -1) {
				//console.log(i + " x: " + posX[i]  + " y: " + posY[i])
				crashed[i] = true;
				document.getElementById("i" + (i + 1)).src = "crashed.png";
				document.getElementById("i" + (i + 1)).style.height = "100px";
				document.getElementById("i" + (i + 1)).style.width = "100px";
				document.getElementById("i" + (i + 1)).style.marginLeft = (posX[i] - 50) + "px";
				document.getElementById("i" + (i + 1)).style.marginTop = (posY[i] - 50) + "px";
				switch (i) {
					case 0:
						scream1.play();
						break;
					case 1:
						scream2.play();
						break;
					case 2:
						scream3.play();
						break;
					case 3:
						scream4.play();
						break;
					default:
						scream5.play();
						break;
				}

			}
		}

	}

	if (posX[0] == 380 || posX[1] == 380 || posX[2] == 380 || posX[3] == 380 || posX[4] == 380) {
		clearInterval(timerId);
		setTimeout(winPage, 2000);
	}

	if (trailCounter == 12) {
		for (var i = 0; i < 5; i++) {
			trailDiv.innerHTML = trailDiv.innerHTML + '<img src="trail' + (i + 1) + '.png" alt="trail" style="position: absolute; top: 49%; margin-top: ' + posY[i] + 'px; left: 50%; margin-left: ' + posX[i] + 'px; z-index: -1; height: 20px; width: 20px">';
		}
		trailCounter = 0;
	}

	trailCounter++;

}


function resetSquares() {

	var ySpacing = -250;
	for (i = 0; i < 5; i++) {
		images[i].style.marginLeft = "-220px";
		images[i].style.marginTop = ySpacing + "px";
		images[i].style.height = "20px";
		images[i].style.width = "20px";


		posX[i] = -220;
		posY[i] = ySpacing

		ySpacing = ySpacing + 125;

		Grid.length = 0;
		gridIndex = 0;

		images[i].src = "square" + (i + 1) + ".png";
		crashed[i] = false;
	}
	trailDiv.innerHTML = "";

	document.getElementById("glasses").style.marginLeft = "500px";
	document.getElementById("glasses").style.marginTop = "480px";
	document.getElementById("faceDiv").style.marginLeft = "-115px";
	document.getElementById("faceDiv").style.marginTop = "-610px";
}

function fadeOut(mp3) {
	mp3.volume = .9;
	setTimeout(function () { mp3.volume = .8 }, 200);
	setTimeout(function () { mp3.volume = .7 }, 400);
	setTimeout(function () { mp3.volume = .6 }, 800);
	setTimeout(function () { mp3.volume = .5 }, 1000);
	setTimeout(function () { mp3.volume = .4 }, 1200);
	setTimeout(function () { mp3.volume = .3 }, 1400);
	setTimeout(function () { mp3.volume = .2 }, 1600);
	setTimeout(function () { mp3.volume = .1 }, 1800);
	setTimeout(function () { mp3.pause() }, 2000);
}

function fadeIn(mp3) {
	mp3.play();
	mp3.volume = 1;
	setTimeout(function () { mp3.volume = .2 }, 500);
	setTimeout(function () { mp3.volume = .3 }, 1000);
	setTimeout(function () { mp3.volume = .4 }, 1500);
	setTimeout(function () { mp3.volume = .5 }, 2000);
	setTimeout(function () { mp3.volume = .6 }, 2500);
	setTimeout(function () { mp3.volume = .7 }, 3000);
	setTimeout(function () { mp3.volume = .8 }, 3500);
	setTimeout(function () { mp3.volume = .9 }, 4000);
	setTimeout(function () { mp3.volume = 1 }, 4500);
}



function shades() {
	var smileyY = -620;
	var shadesXY = [500, 480]
	var shadeTimer = setInterval(moveShades, 12);
	var smileyTimer = setInterval(moveSmiley, 12);
	//wDiv.innerHTML = wDiv.innerHTML + '<img src="glasses.png" id="glasses" alt="glasses">';
	//wDiv.innerHTML = wDiv.innerHTML + '<div id"faceDiv">; )</div>';
	function moveShades() {
		document.getElementById("glasses").style.marginTop = shadesXY[1] + "px";
		document.getElementById("glasses").style.marginLeft = shadesXY[0] + "px";

		shadesXY[0] = shadesXY[0] - 1;
		shadesXY[1] = shadesXY[1] - 1;

		if (shadesXY[0] == -50) {
			clearInterval(shadeTimer);
		}
	}

	function moveSmiley() {
		document.getElementById("faceDiv").style.marginTop = smileyY + "px";
		smileyY = smileyY + 1;

		if (smileyY == -70) {
			clearInterval(smileyTimer);
		}
	}

}



/*function moveSquareRight() {
	for (var i=0; i<5; i++) {
		images[i] = document.getElementById('i' + (i + 1));
		

		if (path > .01) {
			images[i].style.marginLeft = posX[i]+ "px";
			posX[i] = posX[i] + 1;
		}
		else if (path > .005) {
			posY[i] = posY[i] + 10;
			images[i].style.marginTop = posY[i] + "px";
		}
		else {
			posY[i] = posY[i] - 10;
			images[i].style.marginTop = posY[i] + "px";
		}
	}
}*/









