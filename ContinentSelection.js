document.addEventListener('DOMContentLoaded', function() {
    const continents = ['Africa', 'Asia', 'Oceania', 'Europe', 'North America', 'South America'];
    const container = document.getElementById('buttonContainer');

    continents.forEach(continent => {
        const button = document.createElement('button');
        button.textContent = continent;
        button.addEventListener('click', function() {
            document.body.innerHTML = '';
        });
        container.appendChild(button);
    });
});
