document.addEventListener('DOMContentLoaded', function () {
    const continents = ['Africa', 'Asia', 'Oceania', 'Europe', 'North America', 'South America'];
    const container = document.getElementById('buttonContainer');
    let guessBox;

    continents.forEach(continent => {
        const button = document.createElement('button');
        button.textContent = continent;
        button.addEventListener('click', function () {
            document.body.innerHTML = '';
            displayTimer();
            displayImage('United States of America.png');
            displayGuessBox();
        });
        container.appendChild(button);
    });

    function displayTimer() {
        const timer = document.createElement('div');
        document.body.appendChild(timer);

        timeLeft = 60;

        function updateTimer() {
            timer.innerHTML = 'Timer: ' + timeLeft + ' seconds';

            if (timeLeft <= 10) {
                timer.style.color = 'red';
            }

            if (timeLeft === 0) {
                clearInterval(timerInterval);
            }
            else {
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
        // image.style.transform = 'scale(0.2)';
        image.style.position = 'absolute';
        image.style.top = '40%';
        image.style.left = '50%';
        image.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(image);
    }

    function displayGuessBox() {
        const guessBox = document.createElement('input');
        guessBox.type = 'text';
        guessBox.placeholder = 'Enter your guess...';
        guessBox.id = 'userInput';

        const subButton = document.createElement('button');
        subButton.textContent = 'Submit Guess';
        subButton.addEventListener('click', function () {
            const userInput = guessBox.value;
            console.log('User guess:', userInput);
            displayHotOrCold(userInput);
            guessBox.value = '';
        });

        const container = document.createElement('div');
        container.appendChild(guessBox);
        container.appendChild(subButton);

        document.body.appendChild(container); container.style.position = 'absolute';

        container.style.top = '70%';
        container.style.left = '50%';
        container.style.transform = 'translate(-50%, -50%)';
    }

    function displayHotOrCold(country) {
        value = document.getElementById('result');

        if (!value) {
            value = document.createElement('div');
            value.id = 'result';
            document.body.appendChild(value);
        }

        if (country === 'Mexico' || country === 'Canada' || country === 'Cuba' || country === 'Russia' || country === 'The Bahamas'){
            value.innerHTML = 'Hot';
            value.style.color = 'red';
        }
        else{
            value.innerHTML = 'Cold';
            value.style.color = 'blue';
        }

        value.style.position = 'fixed';
        value.style.top = '80%';
        value.style.left = '50%';
        value.style.transform = 'translate(-50%, -50%)';
        value.style.fontSize = '30px';
    }

});
