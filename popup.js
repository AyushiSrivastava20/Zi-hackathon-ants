funcPopup = function () {
    document.querySelector('#close-button').addEventListener('click', closeWindow);
};

closeWindow = function () {
    window.close();
    document.removeEventListener('DOMContentLoaded', funcPopup);
};

document.addEventListener('DOMContentLoaded', funcPopup);
