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
    


	//// //// quiz init and timer //// ////

	// start time and provide questions on intro button click
	let clock;
	queryElement("#intro button").addEventListener("click", (event) => {
		//call above function to set Initial data in questionHolder section
		setQuestionData();
		onlyDisplaySection("#quizContainer");
		clock = setInterval(myTimer, 1000);
	});

	// clearing timeout in case next question was answered before timeout is reached or if form element does not meet requirement

	let scoreIndicator = () => {
		clearTimeout(timeset);
		timeset = setTimeout(() => {
		    queryElement('#scoreIndicator').classList.add('invisible');
		}, 1000);
	}

	//////////////////// quiz control ////////////////////

	// Create an array of selected divs to utilize this on them so that their values can be checked against the answers
	Array.from(answers).forEach(check => {
		check.addEventListener('click', function (event) {
			// Handles events if a question is answered correctly
			if (this.innerHTML.substring(3, this.length) === questions[questionCounter].answer) {
				score = score + 1;
				questionCounter = questionCounter + 1;
				quizUpdate("Your answer ist correct");
			}else{
				// Handles events if a question is answered incorrectly.
				time = time - 15;
				questionCounter = questionCounter + 1;
				quizUpdate("Your answer is incorrect");
			}
		});
	});


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