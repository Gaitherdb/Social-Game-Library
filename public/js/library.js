window.addEventListener('DOMContentLoaded', function () {
    const addGameBtn = document.querySelector('#addGame');
    const addGameForm = document.querySelector('#addGameForm');
    const cancelBtn = document.querySelector('#cancelGame');
    const gameList = document.querySelector('#ownedGames');
    const editGameForm = document.querySelectorAll('.editGameForm');
    const userGames = document.querySelectorAll('.userGames');


    // Clicking an entry will access the edit form for games in the library
    gameList.addEventListener("click", function (event) {

        var element = event.target;
        var game_id = element.parentElement.id;
        //empty columns for space for the buttons
        let cancelCol = document.getElementById("cancelCol")
        let deleteCol = document.getElementById("deleteCol")
        let saveCol = document.getElementById("saveCol")

        for (let i = 0; i < editGameForm.length; i++) {
            if (Number(editGameForm[i].id) == `${game_id}`) {
                if (editGameForm[i].classList.contains("d-none")) {

                    editGameForm[i].classList.remove("d-none")
                    cancelCol.classList.remove("d-none")
                    deleteCol.classList.remove("d-none")
                    saveCol.classList.remove("d-none")
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

        let element = event.target;
        let game_id = element.parentElement.parentElement.id;
        if (element.matches(".cnlEditBtn")) {
            for (i = 0; i < cancelEditBtn.length; i++) {
                if (cancelEditBtn[i].dataset.id == `${game_id}`) {
                    editGameForm[i].classList.add('d-none')
                    userGames[i].classList.remove('d-none')
                }
            }
            cancelCol.classList.add("d-none")
            deleteCol.classList.add("d-none")
            saveCol.classList.add("d-none")
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

    //clicking delete btn on the edit form, deletes the entry
    const deleteGameEntry = async (event) => {
        var deleteGameBtn = document.querySelectorAll('.deleteGameBtn');
        var element = event.target;
        let game_id = element.parentElement.parentElement.id;
        if (element.matches(".deleteGameBtn")) {
            for (i = 0; i < deleteGameBtn.length; i++) {
                if (deleteGameBtn[i].dataset.id == `${game_id}`) {
                    const deleteGameData = await fetch(`/api/games/${game_id}`, {
                        method: 'DELETE',
                    });

                    if (deleteGameData.ok) {
                        // If successful, refresh the page
                        document.location.reload();
                    } else {
                        alert(deleteGameData.statusText);
                    }
                }
            }
        }
    }
    //clicking the save btn in the game edit form will update any changes made to the entry
    const editGame = async (event) => {
        var element = event.target;
        var game_id = element.parentElement.parentElement.id;
        var gameName = document.querySelectorAll('#editName');
        var gamePlatform = document.querySelectorAll('#editPlatform');
        var gameBeaten = document.querySelectorAll('#editBeaten');
        var gameCurrentlyPlaying = document.querySelectorAll('#editCurrentlyPlaying');
        var saveGameBtn = document.querySelectorAll('.saveGameBtn')


        if (element.matches('.saveGameBtn')) {
            for (i = 0; i < saveGameBtn.length; i++) {
                if (saveGameBtn[i].dataset.id == `${game_id}`) {
                    let name = gameName[i].value;
                    let platform = gamePlatform[i].value;
                    let beaten = gameBeaten[i].value;
                    let currently_playing = gameCurrentlyPlaying[i].value;
                    
                    const editGameData = await fetch(`/api/games/${game_id}`, {
                        method: 'PUT',
                        body: JSON.stringify({ name, platform, beaten, currently_playing }),
                        headers: { 'Content-Type': 'application/json' },
                    });
                    if (editGameData.ok) {
                        document.location.reload();
                    } else {
                        alert(editGameData.statusText);
                    }
                }
            }

        }
    }

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
            const postGameData = await fetch('/api/games', {
                method: 'POST',
                body: JSON.stringify({ name, platform, beaten, currently_playing }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (postGameData.ok) {
                // If successful, refresh the page
                document.location.reload();
            } else {
                alert(postGameData.statusText);
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

    document
        .querySelector('#ownedGames')
        .addEventListener('click', deleteGameEntry);

    document
        .querySelector('#ownedGames')
        .addEventListener('click', editGame);
})