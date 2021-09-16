console.log('test')
const list = [];
const feedDiv = document.getElementById('feedDiv')

const printDetails = (list) => {
  console.log('printing details...')
  console.log(list)
  let userGame;
  let userName;

  // Create the parent elements
  let container = document.createElement('div')
  container.setAttribute('class', "row justify-content-center my-3")

  let feedList = document.createElement('ul')
  feedList.setAttribute('class', "list-group")

  list.forEach(async element => {

    const response1 = await fetch('/api/friends/user/' + element[1])
    const data1 = await response1.json();
    console.log(data1.name)

    const response2 = await fetch('/api/friends/game/' + element[0])
    const data2 = await response2.json();
    console.log(data2.name)

    // Create the <li>
    let feedItem = document.createElement('li')
    feedItem.setAttribute('class', "list-group-item list-group-item-light list-group-item-action text-center")
    feedItem.setAttribute('onclick', `showProfile(${data1.id})`)

    // Create the <p>
    let feedPost = document.createElement('p')
    feedPost.setAttribute('class', "lead")
    feedPost.textContent = data1.name + ' has added ' + data2.name + ' to their library!'

    // Append them all properly
    feedDiv.appendChild(container)
    container.appendChild(feedList)
    feedList.appendChild(feedItem)
    feedItem.appendChild(feedPost)
  })
}


const feedList = () => {
  fetch('/api/friends/feed')
    .then(
      function (response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }

        // Examine the text in the response
        response.json().then(function (data) {
          //   console.log(data)
          data.forEach(element => {
            list.push([element.game_id, element.user_id])
          });
          // console.log(list)
          printDetails(list)
        });
      }
    )
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
    });
}


feedList();

