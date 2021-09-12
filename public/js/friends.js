console.log('test of friends js')

const mainDiv = document.getElementById("friendlist")
const friendEl = document.createElement("p")


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
        console.log(data);
        data[0].friends.forEach(element => {
            friendEl.textContent = element.name
            console.log(element.name)
            mainDiv.appendChild(friendEl)
        });
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}
myfunc();
