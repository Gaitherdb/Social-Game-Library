// Create the Friendship based on the id of the Request
async function approveReq(button) {
    event.preventDefault();

    const postNum = button.dataset.postNum;

    const response = await fetch(`/api/user/request/${postNum}`, {
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
async function declineReq() {
    event.preventDefault();

    const postNum = button.dataset.postNum;

    const response = await fetch(`/api/user/request/${postNum}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/social');
    } else {
        alert(response.statusText);
    }
}