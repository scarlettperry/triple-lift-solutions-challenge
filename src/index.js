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
        reformatData(results.data)
      }
    })
  }

  //reformats data
  function reformatData(data) {
    let tacticAndUrl = data.map(obj => {
      let rObj = {}
      rObj.tactic_id = obj.tactic_id
      rObj.impression_pixel_json = obj.impression_pixel_json
        .replace(/\\\//g, "/") //remove backslahses & replace with /
        .replace(/['"]+/g, '') //remove extra doubles quotes
        .replace(/^\[([\s\S]*)]$/,'$1') //remove opening and closing brackets
      return rObj
    })
    // fetchData(tacticAndUrl)
  }

  //fetch calls
  // function fetchData(data) {
  //   data.forEach(function (dataObj) {
  //     if (dataObj.impression_pixel_json !== "NULL" && dataObj.impression_pixel_json !== "") {
  //       fetch(dataObj.impression_pixel_json)
  //         .then(resp => resp.json())
  //         .then(console.log)
  //     }
  //   })
  // }


  //array for good response - just counter

  //array for bad response - tactic id & url















}) //closes wrapper
