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
    let correctGuess = 'United States';
    let timerInterval;
    let timeLeft = 60;

    continents.forEach(continent => {
        const label = document.createElement('div');
        label.textContent = continent.name;
        label.className = 'label';
        label.style.left = continent.position.left;
        label.style.top = continent.position.top;

        label.addEventListener('click', function () {
            document.body.innerHTML = '';
            displayTimer();
            displayImage('United States of America.png');
            displayGuessBox();
        });

        labelContainer.appendChild(label);
    });

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

    function displayImage(imageName) {
        const image = document.createElement('img');
        image.src = imageName;
        image.style.position = 'absolute';
        image.style.top = '40%';
        image.style.left = '50%';
        image.style.transform = 'translate(-50%, -50%)';
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
            const userInput = guessBox.value;
            console.log('User guess:', userInput);
            guessBox.value = '';
            if (userInput != correctGuess){
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
            else {
                timeLeft += 5;
                const timer = document.querySelector('div[style*="position: fixed"]');
                timer.style.color = 'green';
                setTimeout(() => {
                    timer.style.color = timeLeft <= 10 ? 'green' : 'black';
                }, 2000);
                guesses = [];
                removeGuessesContainer();
                removeHotOrCold();
            }
        });
        
        const container = document.createElement('div');
        container.appendChild(guessBox);
        container.appendChild(subButton);
        document.body.appendChild(container);
        container.style.position = 'absolute';
        container.style.top = '70%';
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
        value.style.top = '80%';
        value.style.left = '50%';
        value.style.transform = 'translate(-50%, -50%)';
        value.style.fontSize = '30px';
    }

    function removeHotOrCold() {
        const value = document.getElementById('result');
        value.innerHTML = '';
    }

    function displayPrevGuesses() {
        let guessesContainer = document.getElementById('guessesContainer');
        
        if (!guessesContainer) {
            guessesContainer = document.createElement('div');
            guessesContainer.id = 'guessesContainer';
            document.body.appendChild(guessesContainer);
            
            guessesContainer.style.position = 'absolute';
            guessesContainer.style.top = '80%';
            guessesContainer.style.left = '50%';
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