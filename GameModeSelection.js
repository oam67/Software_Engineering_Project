document.addEventListener('DOMContentLoaded', function () {
    const easyModeButton = document.getElementById('easyModeButton');
    const hardModeButton = document.getElementById('hardModeButton');

    const selectMode = (mode) => {
        sessionStorage.setItem('gameMode', mode);

        document.getElementById('gameModeButtons').style.display = 'none';
        window.location.href = 'ContinentSelection.html';
    };

    easyModeButton.addEventListener('click', () => selectMode('easy'));
    hardModeButton.addEventListener('click', () => selectMode('hard'));
});
