//automatically enables cross-domain requests when needed
let proxyURL = 'https://fierce-depths-54082.herokuapp.com/'

document.addEventListener('DOMContentLoaded', function () {
  let appendOkRespones = document.getElementById('ok-response')

  let input = document.getElementById('csv')
  input.addEventListener("change", parseData)

  //parses uploaded file object
  function parseData(event) {
    let file = event.target.files[0]
    Papa.parse(file,{
      header: true,
      dynamticTyping: true,
      complete: function(results){
        //calls helper function
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
        .replace(/\\\//g, "/") //removes backslahses & replace with /
        .replace(/['"]+/g, '') //removes extra double quotes
        .replace(/^\[([\s\S]*)]$/,'$1') //removes opening and closing brackets
      return rObj
    })
    //calls helper function
    fetchData(tacticAndUrl)
  }

  // fetch calls
  function fetchData(data) {
    let okResponses = 0
    let failedRespones = []

    data.forEach(function (dataObj) {
      if (dataObj.impression_pixel_json !== "NULL" && dataObj.impression_pixel_json !== "") {
        fetch(proxyURL+dataObj.impression_pixel_json)
          .then((response) => {
            //200-299                           //300-399
            if (200 >=response.status<=299 && response.status < 400) {
              okResponses++
            } else if (response.status >= 400) {
              failedRespones.push(dataObj)
            }
            else {
              throw new Error(dataObj, 'Something went wrong');
            }
            okResponsesDOM(okResponses)
            failedResponesDOM(failedRespones)

          })
          // .catch((error) => {
          //   console.log(error)
          // });
          // .then(function () {
          // })
      }
    })
  }

  function okResponsesDOM(count) {
    appendOkRespones.innerText=`Ok Responses: ${count}`
  }

  function failedResponesDOM(array) {
    console.log(array)
  }















}) //closes wrapper
