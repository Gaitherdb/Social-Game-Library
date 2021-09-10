window.addEventListener('DOMContentLoaded', function(){
    const addGameBtn = document.querySelector('#addGame');
    const addGameForm = document.querySelector('#addGameForm');

    addGameBtn.addEventListener("click", function (event) {
        if (addGameForm.style.display === "none") {
            addGameForm.style.display = "block";
            addGameBtn.style.display = "none";
        }
     })
     

    // const postGameHandler = async (event) => {

    // }

    // document
    // .querySelector('#addGame')
    // .addEventListener('click', postGameHandler);
})