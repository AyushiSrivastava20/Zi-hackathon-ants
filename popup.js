funcPopup = function () {
   console.log("hello!!!!!!!!!")
};

closeWindow = function () {
    window.close();
    document.removeEventListener('DOMContentLoaded', funcPopup);
};

document.addEventListener('DOMContentLoaded', funcPopup);
