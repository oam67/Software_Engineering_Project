document.addEventListener('DOMContentLoaded', function () {
    const easyModeButton = document.getElementById('easyModeButton');
    const hardModeButton = document.getElementById('hardModeButton');

    const selectMode = () => {
        document.getElementById('gameModeButtons').style.display = 'none';
        window.location.href = 'ContinentSelection.html';
    };

    easyModeButton.addEventListener('click', selectMode);
    hardModeButton.addEventListener('click', selectMode);
});
