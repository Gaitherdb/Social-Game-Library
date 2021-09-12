console.log('test of friends js')
const friendlist = ['f1', 'f2', 'f3'];
const myfunc = async () => {
const response = await fetch(`/api/friends`)
    // method: 'GET',
    // headers: {
    //   'Content-Type': 'application/json',
    // },
//   });

  let derp = document.getElementById('fuck')
  console.log(response)
  derp.textContent = 'fasdfasdf';
}
myfunc();