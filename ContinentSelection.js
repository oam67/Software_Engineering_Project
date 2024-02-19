document.addEventListener('DOMContentLoaded', function() {
    const continents = ['Africa', 'Asia', 'Oceania', 'Europe', 'North America', 'South America'];
    const container = document.getElementById('buttonContainer');

    continents.forEach(continent => {
        const button = document.createElement('button');
        button.textContent = continent;
        button.addEventListener('click', function() {
            document.body.innerHTML = '';
            displayTimer();
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

            if (timeLeft === 0){
                clearInterval(timerInterval);
            }
            else {
                timeLeft --;
            }
        }
        const timerInterval = setInterval(updateTimer, 1000);
        
        timer.style.position = 'fixed';
        timer.style.top = '10px';
        timer.style.right = '10px';
        timer.style.fontSize = '45px';
    }
});
