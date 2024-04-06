document.addEventListener('DOMContentLoaded', function () {

    const continents = [
        { name: 'Africa', position: { left: '53%', top: '60%' } },
        { name: 'Asia', position: { left: '72%', top: '37%' } },
        { name: 'Oceania', position: { left: '85%', top: '77%' } },
        { name: 'Europe', position: { left: '56%', top: '30%' } },
        { name: 'North America', position: { left: '15%', top: '30%' } },
        { name: 'South America', position: { left: '28%', top: '70%' } }
    ];
    const labelContainer = document.getElementById('labelContainer');
    let guessBox;
    let guesses = [];
    // let correctGuess = 'United States';
    let correctGuess = " ";
    let chosenContinent = " ";
    let countryImagePath = " ";
    let chosenCountriesIndexes = [];
    let gameMode = sessionStorage.getItem('gameMode');
    let timerInterval;
    let timeLeft = 60;
    let score = 0;

    console.log("Selected Game Mode: ", gameMode);

    continents.forEach(continent => {
        const label = document.createElement('div');
        label.textContent = continent.name;
        label.className = 'label';
        label.style.left = continent.position.left;
        label.style.top = continent.position.top;

        label.addEventListener('click', function () {
            chosenContinent = continent.name;
            
            randomizeCountry('game_dataset.xlsx')
                .then(randomResults => {
                    console.log(randomResults);
                    if (randomResults !== null) {
                        correctGuess = randomResults.correctGuess;
                        countryImagePath = randomResults.countryImagePath;
                        console.log(correctGuess);
                        
                        document.body.innerHTML = '';
                        displayTimer();
                        displayScore();
                        displayImage(countryImagePath, sessionStorage.getItem('gameMode') === 'hard' ? 100 : 40);

                        displayGuessBox();
                    } else {
                        console.log('No data found for the selected continent.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });

        labelContainer.appendChild(label);
    });

    function displayScore(){
        let userScore = document.getElementById('userScore');
        if (!userScore) {
            userScore = document.createElement('div');
            userScore.id = 'userScore';
            document.body.appendChild(userScore);
        }

        function updateScore() {
            userScore.innerHTML = "Score: " + score; 
        }

        updateScore();
        userScore.style.position = 'fixed';
        userScore.style.top = '0%';
        userScore.style.left = '0%';
        userScore.style.fontSize = '45px';
    }


    async function randomizeCountry(filePath) {
        try {
            const response = await fetch(filePath);
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const arrayBuffer = await response.arrayBuffer();
            const data = new Uint8Array(arrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
    
            const filteredData = jsonData.filter(row => row.Continent === chosenContinent);
    
            if (filteredData.length === 0) {
                console.log('No data found for the selected continent.');
                return null;
            }
    
            let randomRowIndex;
            let attempts = 0; 
            do {
                randomRowIndex = Math.floor(Math.random() * filteredData.length);
                attempts++;
                if (attempts > filteredData.length) {
                    console.log('No new countries left to randomize.');
                    return null;
                }
            } while (chosenCountriesIndexes.includes(randomRowIndex));
    
            const randomRow = filteredData[randomRowIndex];
    
            chosenCountriesIndexes.push(randomRowIndex);
    
            return {
                correctGuess: randomRow.Country,
                countryImagePath: gameMode === 'hard' ? randomRow['Image Path'] : randomRow['Easy Image Path']
            };
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }


    function displayTimer() {
        const timer = document.createElement('div');
        document.body.appendChild(timer);

        function updateTimer() {
            timer.innerHTML = 'Timer: ' + timeLeft + ' seconds';
            if (timeLeft <= 10) {
                timer.style.color = 'red';
            }
            if (timeLeft === 0) {
                clearInterval(timerInterval);
            } else {
                timeLeft--;
            }
        }
        const timerInterval = setInterval(updateTimer, 1000);
        timer.style.position = 'fixed';
        timer.style.top = '0%';
        timer.style.right = '0%';
        timer.style.fontSize = '45px';
    }

    function displayImage(imageName, scalePercentage) {
        // Check if an image with the id 'countryImage' already exists and remove it if it does
        let existingImage = document.getElementById('countryImage');
        if (existingImage) {
            existingImage.remove();
        }
    
        // Create a new image element
        const image = document.createElement('img');
        image.id = 'countryImage'; // Assign an id to the image for easy access
        image.src = imageName;
        image.style.position = 'absolute';
        image.style.top = '40%';
        image.style.left = '50%';
    
        const scaleFactor = scalePercentage / 100;
        image.style.transform = `translate(-50%, -50%) scale(${scaleFactor})`;
        document.body.appendChild(image);
    }

    function displayGuessBox() {
        guessBox = document.createElement('input');
        guessBox.type = 'text';
        guessBox.placeholder = 'Enter your guess...';
        guessBox.id = 'userInput';
        const subButton = document.createElement('button');
        subButton.textContent = 'Submit Guess';
        subButton.addEventListener('click', function () {
            const userInput = guessBox.value.trim();
            console.log('User guess:', userInput);
            guessBox.value = '';
            if (userInput.toLowerCase() === correctGuess.toLowerCase()) {
                timeLeft += 5;
                score += 10;
                displayScore();
                const timer = document.querySelector('div[style*="position: fixed"]');
                timer.style.color = 'green';
                setTimeout(() => {
                    timer.style.color = timeLeft <= 10 ? 'green' : 'black';
                }, 2000);
                guesses = [];
                removeGuessesContainer();
                removeHotOrCold();

                randomizeCountry('game_dataset.xlsx')
                .then(randomResults => {
                    console.log(randomResults);
                    if (randomResults !== null) {
                        correctGuess = randomResults.correctGuess;
                        countryImagePath = randomResults.countryImagePath;
                        console.log(correctGuess);
                        
                        displayImage(countryImagePath, sessionStorage.getItem('gameMode') === 'hard' ? 100 : 40);

                    } else {
                        console.log('No data found for the selected continent.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });


            } else {
                displayHotOrCold(userInput);
                guesses.push(userInput);
                timeLeft -= 5;
                displayPrevGuesses();
                const timer = document.querySelector('div[style*="position: fixed"]');
                timer.style.color = 'red';
                setTimeout(() => {
                    timer.style.color = timeLeft <= 10 ? 'red' : 'black';
                }, 2000);
            }
        });
        
        const container = document.createElement('div');
        container.appendChild(guessBox);
        container.appendChild(subButton);
        document.body.appendChild(container);
        container.style.position = 'absolute';
        container.style.top = '80%';
        container.style.left = '50%';
        container.style.transform = 'translate(-50%, -50%)';
    }

    function displayHotOrCold(country) {
        let value = document.getElementById('result');
        if (!value) {
            value = document.createElement('div');
            value.id = 'result';
            document.body.appendChild(value);
        }
        if (['Mexico', 'Canada', 'Cuba', 'Russia', 'The Bahamas'].includes(country)) {
            value.innerHTML = 'Hot';
            value.style.color = 'red';
        } else {
            value.innerHTML = 'Cold';
            value.style.color = 'blue';
        }
        value.style.position = 'absolute';
        value.style.top = '25%';
        value.style.left = '15%';
        value.style.transform = 'translate(-50%, -50%)';
        value.style.fontSize = '30px';
    }

    function removeHotOrCold() {
        const value = document.getElementById('result');
        if (value) { 
            value.innerHTML = '';
        }
    }

    function displayPrevGuesses() {
        let guessesContainer = document.getElementById('guessesContainer');
        
        if (!guessesContainer) {
            guessesContainer = document.createElement('div');
            guessesContainer.id = 'guessesContainer';
            document.body.appendChild(guessesContainer);
            
            guessesContainer.style.position = 'absolute';
            guessesContainer.style.top = '30%';
            guessesContainer.style.left = '15%';
            guessesContainer.style.transform = 'translate(-50%, -10%)';
            guessesContainer.style.border = '1px solid #ddd';
            guessesContainer.style.padding = '10px';
            guessesContainer.style.marginTop = '20px'; 
            guessesContainer.style.backgroundColor = '#f9f9f9';
        }
        
        guessesContainer.innerHTML = '';
        
        guesses.forEach(guess => {
            const guessElement = document.createElement('div');
            guessElement.textContent = guess;
            guessesContainer.appendChild(guessElement);
            console.log('User guess:', guessElement);
        });
    }

    function removeGuessesContainer() {
        const guessesContainer = document.getElementById('guessesContainer');
        if (guessesContainer) {
            guessesContainer.remove();
        }
    }
});