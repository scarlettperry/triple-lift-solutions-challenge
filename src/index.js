document.addEventListener('DOMContentLoaded', function () {
  let queryString = "?tripleliftTest=true&tl_tactic_id=343664"
  let input = document.getElementById('csv')
  input.addEventListener("change", parseData)

  //parsing uploaded file object
  function parseData(event) {
    let file = event.target.files[0]
    Papa.parse(file,{
      header: true,
      dynamticTyping: true,
      complete: function(results){
        fetchData(results.data)
      }
    })
  }

  //fetch
  function fetchData(data) {
    //removing brackets and splitting string at "," if more than one url for a tactic
    data.forEach(function(object) {
      let url = object.impression_pixel_json.replace(/[\[\]""]+/g,'').split(",")
      if (url[0] !== "" && url[0] !== "NULL") {
        for(let element of url){
          fetch(element+queryString)
            .then(function() {
              console.log("ok")
            }).catch(function() {
              console.log("error")
            })
        }
      }
    })
  }

  //fetch calls if URL does not equal NULL or an emptry string
  // function fetchData(data, parseData) {
  //   console.log(parseData)
    // fetch(data.impression_pixel_json)
    // .then(resp => resp.json())
    // .then(console.log);
    // console.log(data.impression_pixel_json)
      // console.log(data.impression_pixel_json)
      // for(let element of data.impression_pixel_json){
      //   console.log(element)
      // }
      // fetch(element.impression_pixel_json)
      //   .then(resp => resp.json())
      //   .then(response => console.log(response))

  // }

  //reformating data to just have tactic id and URL


  //array for good response - just counter

  //array for bad response - tactic id & url















}) //closes wrapper
