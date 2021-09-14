const mainDiv = document.getElementById("friendlist");

const printFriends = () => {
fetch('/api/friends')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        data[0].friends.forEach(element => {
            const listItem = document.createElement("li")
            const friendEl = document.createElement("a")
            listItem.appendChild(friendEl)
            friendEl.textContent = element.name
            console.log(element.name)
            friendEl.setAttribute("href", '/profile/' + element.id)
            mainDiv.appendChild(listItem)
        });
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}
printFriends();

const getuserId = async (event) => {
  event.preventDefault();
  console.log('friend req btn test')
  const inputEmail = document.querySelector('#exampleInputEmail1').value.trim();

  fetch('/api/users/test/')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data)
        data.forEach(el => {

          console.log(el.email)
          console.log(inputEmail)

          if (el.email===inputEmail){
            newFormHandler(el.id)
          }
        })
      });
    }
  )
}

const newFormHandler = async (id) => {
  
  // const destination_user_id = document.querySelector('#exampleInputEmail1').value.trim();
  console.log(id)

  const destination_user_id = id

  if (destination_user_id) {
    const response = await fetch(`/api/friends/request/`, {
      method: 'POST',
      body: JSON.stringify({destination_user_id}),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(JSON.stringify({destination_user_id}))

    if (response.ok) {
      console.log(response)
    } else {
      alert('Failed to create friend request');
    }
  }
};


document
    .querySelector('.new-request-form')
    .addEventListener('submit', getuserId);