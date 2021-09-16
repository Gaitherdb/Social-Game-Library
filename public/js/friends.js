const mainDiv = document.getElementById("friendlist");

// Create a new request object
async function submitRequest() {
  event.preventDefault();

  let requestForm = document.getElementById("addFriendForm");
  let addFriendBtn = document.getElementById("addFriendBtn")
  let email = document.getElementById("requestEmail").value;

  const response = await fetch(`/api/users/request/`, {
    method: 'POST',
    body: JSON.stringify({ email }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    alert("Friend Request sent successfully!")
  } else {
    alert(response.statusText);
  }

  requestForm.classList.add("d-none");
  addFriendBtn.classList.remove("d-none");
}

// Show the profile of the selected friend
async function showProfile(friendID) {
  const response = await fetch(`/profile/${friendID}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace(`/profile/${friendID}`);
  } else {
    alert(response.statusText);
  }
}

// Create the Friendship based on the id of the Request
async function approveReq(button) {
  const senderID = button.dataset.senderid;

  const response = await fetch(`/api/users/request/${senderID}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    window.location.reload();
  } else {
    alert(response.statusText);
  }
}

// Delete the Request by their id
async function declineReq(button) {

  const senderID = button.dataset.senderid;

  const response = await fetch(`/api/users/request/${senderID}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    window.location.reload();
  } else {
    alert(response.statusText);
  }
}

// Show the request form
function showRequestForm(button) {
  event.preventDefault();

  let requestForm = document.getElementById("addFriendForm");

  if (requestForm.classList.contains("d-none")) {
    requestForm.classList.remove("d-none");
    button.classList.add("active");
  }
  else {
    button.classList.remove("active");
    requestForm.classList.add("d-none");
  }
}

// Show the list of incoming friend request
function showRequestList(button) {
  event.preventDefault();

  let requestList = document.getElementById("requestList");

  if (requestList.classList.contains("d-none")) {
    requestList.classList.remove("d-none");
    button.classList.add("active");
  }
  else {
    requestList.classList.add("d-none");
    button.classList.remove("active");
  }
}

// Remove friend from friendslist
async function removeFriend(button) {
  let name = button.dataset.friend;
  let id = button.dataset.id;
  var r = confirm(`Are you sure you want to remove ${name} from your friendslist?`);
  if (r) {
    const response = await fetch(`/api/friends/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      window.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}