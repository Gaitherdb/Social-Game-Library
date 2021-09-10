window.addEventListener('DOMContentLoaded', function () {
    const addGameBtn = document.querySelector('#addGame');
    const addGameForm = document.querySelector('#addGameForm');

    addGameBtn.addEventListener("click", function () {
        if (addGameForm.style.display === "none") {
            addGameForm.style.display = "block";
            addGameBtn.style.display = "none";
        }
    })

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
            errorModal.style.display= "block";
            const modalClose = document.querySelector('.btn-close');
            modalClose.onclick = function () {
                errorModal.style.display= "none";
            }
        }
    }

    document
        .querySelector('#addGameForm')
        .addEventListener('submit', postGameHandler);
})