function newGame(hScore){
	var userNum = [];
	var ranNumArr = [];
	var count = 0;
	var equalFlag = 0;
	var userMoney = 10;
	var highScore = hScore;
	document.getElementById("highS").innerHTML = highScore;
	document.getElementById("lost").innerHTML = 'You have $' + userMoney + ' in your account.';
	document.getElementById("winnings").innerHTML = 'You won $0.';


	function userGuess() {
		userNum = [];
		ranNumArr = [];
		var a = 0;
		var b = 0;
		var inputArr = ['1','2','3','4','5','6','7','8','9','10'];
		var validNum = 1;
		validRoll = 1;

		userNum.push(document.getElementById("FirstNumber").value); //a number
		userNum.push(document.getElementById("SecondNumber").value);
		userNum.push(document.getElementById("ThirdNumber").value);
		userNum.push(document.getElementById("FourthNumber").value);
		
		for (i=0;i<4;i++){
			//debugger;
			var arrIndex = inputArr.indexOf(userNum[i]);
			console.log("userNum [i] = " + userNum[i] + " arrIndex = " + arrIndex);
			if (arrIndex == -1){
				console.log("not a number");
				validNum = 2;
			}
		} 
		console.log ("validNum = " + validNum);
		if (validNum === 1){
			for (i=0;i<4;i++){
				for (j=1;j<4;j++){
					if (i != j){
						if (userNum[i]===userNum[j]){
							validRoll = 0;
						}
					}
				}
			}
		} else {
			console.log("You entered an incorrect character or a number out of range, try again!!");
		}
		if (validRoll === 0){
			console.log("You didn't enter 4 distinct numbers, try again!!");
		} 
		if (validRoll == 1 && validNum == 1){
			return getData();
		}else{
			return;
		}
	}

	function getData(){
		console.log("get data called");
		$.get("http://159.203.175.239:8001/", callback);
	}

	function callback(ranNum){
		//debugger;
		if (ranNum != null){ //is the ranNum a number
			if (count < 4){ //repeat this until we have 4 numbers
 				for (j=0; j<4; j++){ //check to make sure they are distinct.
 					if (ranNum === ranNumArr[j]){
 						equalFlag = 1;
 					}
 				}
 				if (equalFlag == 0){
 					ranNumArr.push(ranNum);
 					count++;
 				} 
 				if (count < 4){
 					ranNum = null;
 					equalFlag = 0;
 					getData();
 				}  //because of this, the function callback cycles, so no loop is needed.
 			}//if(count<4) creates a loop because getData() call is a callback to this function!!
		}if (ranNumArr.length === 4){
			ranNum = null;
			count = 0;
			return account();
		}
			
	}

	function numMatch(){
		console.log("User Numbers = " + userNum);
		console.log("computer Numbers = " + ranNumArr);
		document.getElementById("win1").innerHTML = ranNumArr[0];
		document.getElementById("win2").innerHTML = ranNumArr[1];
		document.getElementById("win3").innerHTML = ranNumArr[2];
		document.getElementById("win4").innerHTML = ranNumArr[3];
		matchNumCount = 0;
		if (userNum[0] != -1) {
			for (i=0;i<4;i++){
				for(j=0;j<4;j++){
					if (userNum[i] == ranNumArr[j]){
						matchNumCount++;
					}
				}
			}
		}
		return matchNumCount;
	}

	function account (){
		var matchedNum = numMatch();
		winnings = -2;
		userMoney -= 2; 
		if (matchedNum == 2){
			userMoney += 4; //4
			winnings = 4;
		} else if (matchedNum == 3) {
			userMoney += 8; //8
			winnings = 8;
		} else if (matchedNum == 4) {
			userMoney += 40;
			winnings = 40;
		} else {
			userMoney -= 0;
			winnings = 0;
		}
		if (userMoney > highScore){
			highScore = userMoney;
			console.log("highscore = " + highScore);
			document.getElementById("highS").innerHTML = highScore;
		}
		console.log ("userMoney = " + userMoney);
		document.getElementById("winnings").innerHTML = 'You won $' + winnings + '.';
		document.getElementById("lost").innerHTML = 'You have $' + userMoney + ' in your account.';
		if (userMoney <= 0) {
			document.getElementById("lost").innerHTML = 'You have $0 in your account, game is starting over in 5 seconds.';
			console.log ('game over');
			setTimeout(resetGame, 5000);
			function resetGame(){
				newGame(highScore);
			}
		}


	}

	document.getElementById("startRoll").onclick = userGuess;
}


/*	$('#txtSearchProdAssign').keypress(function (evt) {
 		if(evt.which == 13)  // the enter key code
  		{
    		$('input[name = butAssignProd]').click();
    	return userGuess;  
  		}
	});   
}
*/


newGame(10);