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