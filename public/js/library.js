window.addEventListener('DOMContentLoaded', function () {
    const addGameBtn = document.querySelector('#addGame');
    const addGameForm = document.querySelector('#addGameForm');
    const cancelBtn = document.querySelector('#cancelGame');
    const gameList = document.querySelector('#ownedGames');
    const editGameForm = document.querySelectorAll('.editGameForm');
    const userGames = document.querySelectorAll('.userGames');


    //Event listener to click and access the edit form for games in the library
    gameList.addEventListener("click", function (event) {

        var element = event.target;
        var game_id = element.parentElement.id;
        //empy columns for space for the buttons
        let cancelCol = document.getElementById("cancelCol")
        let deleteCol = document.getElementById("deleteCol")

        for (let i = 0; i < editGameForm.length; i++) {
            if (Number(editGameForm[i].id) == `${game_id}`) {
                if (editGameForm[i].classList.contains("d-none")) {

                    editGameForm[i].classList.remove("d-none")
                    cancelCol.classList.remove("d-none")
                    deleteCol.classList.remove("d-none")
                    for (let i = 0; i < userGames.length; i++) {

                        if (userGames[i].id == `${game_id}`) {
                            userGames[i].classList.add("d-none");

                        }
                    }
                }
            }
        }
    })
    //clicking the cancel button on the edit form, hides the form 
    gameList.addEventListener("click", function (event) {
        var cancelEditBtn = document.querySelectorAll('.cnlEditBtn');
        var deleteGameBtn = document.querySelectorAll('.deleteGameBtn');
        var element = event.target;
        let game_id = element.parentElement.parentElement.id;
        console.log("game_id")
        console.log(game_id)
        if (element.matches(".cnlEditBtn")) {
            console.log('hi')
            for(i=0; i < cancelEditBtn.length; i++){
                console.log('bye')
                console.log(cancelEditBtn[i].dataset.id);
        
                if(cancelEditBtn[i].dataset.id == `${game_id}`){
                    console.log("noooo")
                    console.log(editGameForm[i])
                    editGameForm[i].classList.add('d-none')
                    userGames[i].classList.remove('d-none')

                }
            }
        }
    })

    //clicking Add Game button will show form and hide the button
    addGameBtn.addEventListener("click", function () {
        if (addGameForm.style.display === "none") {
            addGameForm.style.display = "block";
            addGameBtn.style.display = "none";
        }
    })

    //hitting the cancel button on the form, hides the form and brings back add game button
    cancelBtn.addEventListener("click", function () {

        if (addGameForm.style.display === "block") {
            addGameForm.style.display = "none";
            addGameBtn.style.display = "block";
        }
    })

    //fetches a post request if the form is filled out, otherwise alerts a modal
    const postGameHandler = async (event) => {
        event.preventDefault();

        const name = document.querySelector('#gameName').value;
        const platform = document.querySelector('#platform').value;
        var beaten = document.querySelector('#beaten').checked;
        var currently_playing = document.querySelector('#currently_playing').checked;
        const errorModal = document.querySelector('#staticBackdrop');


        if (name && platform != "Platform") {
            // Send a POST request to the API endpoint
            const response = await fetch('/api/games', {
                method: 'POST',
                body: JSON.stringify({ name, platform, beaten, currently_playing }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                // If successful, refresh the page
                document.location.reload();
            } else {
                alert(response.statusText);
            }
        } else {
            errorModal.style.display = "block";
            const modalClose = document.querySelector('.btn-close');
            modalClose.onclick = function () {
                errorModal.style.display = "none";
            }
        }
    }

    document
        .querySelector('#addGameForm')
        .addEventListener('submit', postGameHandler);
})