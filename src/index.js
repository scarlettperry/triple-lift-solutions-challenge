document.addEventListener('DOMContentLoaded', function () {

  let input = document.getElementById('csv')
  input.addEventListener("change", parseData)

  //parsing uploaded file object
  function parseData(event) {
    let file = event.target.files[0]
    Papa.parse(file,{
      header: true,
      dynamticTyping: true,
      complete: function(results){
        reformatURL(results.data)
      }
    })
  }
  
  //slicing URL values if begin with "[ & end with ]"
  function reformatURL(data) {
    console.log(data);
    data.forEach(function(object) {
      return console.log(object.impression_pixel_json.replace(/[\[\]""]+/g,'').split(","))
    })
  }

  //reformating data to just have tactic id and URL

  //fetch calls  if not NULL or emptry string

  //array for good response - just counter
  //array for bad response - tactic id & url















}) //closes wrapper
