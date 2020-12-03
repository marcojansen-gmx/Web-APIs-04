	// Set init variables 
	const startTimer = 75;
	let time = 75;
	let score = 0;
	let questionCounter = 0;
	let timeset;
	let answers = document.querySelectorAll('#quizContainer button');

    //// //// retrieving scores ////  ////
	// local storage array creation
	let highscoreArray = [];

	// Retrieve data if it exists
    (localStorage.getItem('highscoreArray')) ? highscoreArray = JSON.parse(localStorage.getItem('highscoreArray')): highscoreArray = [];
    




    //// //// submitting scores ////  ////
	// Displays error message if initials given do not meet requirements
	let errorIndicator = () => {
		clearTimeout(timeset);
		timeset = setTimeout(() => {
			queryElement('#errorIndicator').classList.add('invisible');
		}, 3000);
	}

	// prevent errors when high scores are submitted
	queryElement("#records button").addEventListener("click", () => {
		let initialsRecord = queryElement('#initials').value;
		if (initialsRecord === ''){
			queryElement('#errorIndicator p').innerHTML = "Please enter at least 1 character";
			queryElement('#errorIndicator').classList.remove('invisible', errorIndicator());
		} else if (initialsRecord.length > 5) {
			queryElement('#errorIndicator p').innerHTML = "not more than 5 characters allowed";
		} else if (initialsRecord.match(/[[A-Za-z]/) === null) {
			queryElement('#errorIndicator p').innerHTML = "Please only use letters.";
			queryElement('#errorIndicator').classList.remove('invisible', errorIndicator());
			queryElement('#errorIndicator').classList.remove('invisible', errorIndicator());
		} else {
			//Sends value to current array for use now.
			highscoreArray.push({
				"initialRecord": initialsRecord,
				"score": score
			});
			//Sends value to local storage for later use.
			localStorage.setItem('highscoreArray', JSON.stringify(highscoreArray));
			queryElement('#highScores div').innerHTML = '';
			onlyDisplaySection("#highScores");
			highscoreHtmlReset();
			queryElement("#initials").value = '';
		}
	});

	// Clears highscores from the html, array and localstorage
	queryElement("#clearScores").addEventListener("click", () => {
		highscoreArray = [];
		queryElement('#highScores div').innerHTML = "";
		localStorage.removeItem('highscoreArray');
	});