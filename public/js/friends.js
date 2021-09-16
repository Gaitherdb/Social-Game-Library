const mainDiv = document.getElementById("friendlist");

// Show the Friend Request form
function showRequestForm(button) {
  let requestForm = document.getElementById("addFriendForm");
  requestForm.classList.remove("d-none");
  button.classList.add("d-none")
}

// Hide the Friend Request form
function cancelRequest(button) {
  event.preventDefault();

  let requestForm = document.getElementById("addFriendForm");
  let addFriendBtn = document.getElementById("addFriendBtn")

  requestForm.classList.add("d-none");
  addFriendBtn.classList.remove("d-none");
}

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