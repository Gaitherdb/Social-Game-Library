console.log('test')
const list = [];
const feedDiv = document.getElementById('feedDiv')

const printDetails = (list) => {
    console.log('printing details...')
    console.log(list)
    let userGame;
    let userName;

    list.forEach(async element => {

        const response1 = await fetch('/api/friends/user/' + element[1])
        const data1 = await response1.json();
        console.log(data1.name)


        const response2 = await fetch('/api/friends/game/' + element[0])
        const data2 = await response2.json();
        console.log(data2.name)


        let feedPost = document.createElement('p')
        feedDiv.appendChild(feedPost)
        feedPost.textContent = data1.name + ' has added ' + data2.name + ' to their library!'
    })
}


const feedList = () => {
    fetch('/api/friends/feed')
      .then(
        function(response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }
    
          // Examine the text in the response
          response.json().then(function(data) {
            //   console.log(data)
            data.forEach(element => {
                list.push([element.game_id, element.user_id])
            });
            // console.log(list)
            printDetails(list)
          });
        }
      )
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
    }


    feedList();

    