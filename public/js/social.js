// Create the Friendship based on the id of the Request
async function approveReq(button) {
    event.preventDefault();

    const senderID = button.dataset.senderid;

    const response = await fetch(`/api/users/request/${senderID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/social');
    } else {
        alert(response.statusText);
    }
}

// Delete the Request by their id
async function declineReq(button) {
    event.preventDefault();

    const senderID = button.dataset.senderid;

    const response = await fetch(`/api/users/request/${senderID}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/social');
    } else {
        alert(response.statusText);
    }
}

// Show Feed
function showFeed() {
    event.preventDefault();

    let requestList = document.getElementById("requestList");
    let feedList = document.getElementById("feedList");
    let feedTab = document.getElementById("feedTab");
    let requestTab = document.getElementById("requestTab");

    requestList.classList.add("d-none");
    feedList.classList.remove("d-none");
    feedTab.classList.add("active")
    requestTab.classList.remove("active")
}

function showRequests() {
    event.preventDefault();

    let requestList = document.getElementById("requestList");
    let feedList = document.getElementById("feedList");
    let feedTab = document.getElementById("feedTab");
    let requestTab = document.getElementById("requestTab");

    requestList.classList.remove("d-none");
    feedList.classList.add("d-none");
    feedTab.classList.remove("active")
    requestTab.classList.add("active")
}

