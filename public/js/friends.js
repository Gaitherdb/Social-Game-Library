const mainDiv = document.getElementById("friendlist");

const myfunc = () => {
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
myfunc();
