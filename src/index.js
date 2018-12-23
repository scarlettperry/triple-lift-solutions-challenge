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

  //fetch calls
  function fetchData(data) {
    let okRespone = []
    let failedRespone = []
    data.forEach(function(object) {
      //removing beg. & ending brackets & double quotes.
      //splitting string at "," if more than one url for a tactic
      let url = object.impression_pixel_json.replace(/^\[([\s\S]*)]$/,'$1').replace(/['"]+/g, '').split(",")
      if (url[0] !== "" && url[0] !== "NULL") {
        for(let element of url){
          fetch(element)
            .then(function() {
              console.log("ok")
            }).catch(function() {
              console.log("error")
            })
        }
      }
    })
  }



  //reformating data to just have tactic id and URL


  //array for good response - just counter

  //array for bad response - tactic id & url















}) //closes wrapper
