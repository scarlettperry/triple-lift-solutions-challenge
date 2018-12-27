//automatically enables cross-domain requests when needed
let proxyURL = 'https://fierce-depths-54082.herokuapp.com/'

document.addEventListener('DOMContentLoaded', function () {
  let appendOkRespones = document.getElementById('ok-response')
  let appendFailedRespones = document.getElementById('failed-response')
  let failedResponesList = document.getElementById('bad-requests')

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
        .replace(/\\\//g, "/") //removes backslahses & replaces with /
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
            okResponsesDOM(okResponses)
            failedResponesDOM(failedRespones)
          })
          //
          //failedRespones freezes application so I have commented it out
          // .then(()=>{
          //   failedList(failedRespones)
          // })
          // .catch((error) => {
          //   console.log(error)
          // })
      }
    })
  }

  //appends count for 2XX, 3XX responses
  function okResponsesDOM(count) {
    appendOkRespones.innerText=`OK Responses: ${count}`
  }

  //appends count for failed responses
  function failedResponesDOM(array) {
                                  //calls helper function
    let failedCount = array.filter(onlyUnique)
    return appendFailedRespones.innerText=`Failed Responses: ${failedCount.length}`
  }

  //appends tactic id and url for failed responses
  function failedList(array) {
                                  //calls helper function
    let failedArray = array.filter(onlyUnique)
    failedArray.forEach(function (failedResponeObj) {
      let bulletPoint = document.createElement("li")
      bulletPoint.innerText =
      `
      ${failedResponeObj.tactic_id}: ${failedResponeObj.impression_pixel_json}
      `
      failedResponesList.append(bulletPoint)
    })
  }

  //removes duplicates from array of failed respones
  function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
  }



}) //closes wrapper
