var formSubmit = document.getElementById("score-form")



formSubmit.addEventListener("click", function(event) {
event.preventDefault();
  testFetch();
  


});
var testFetch = function() {
  fetch('https://maps.geoapify.com/v1/tile/carto/{z}/{x}/{y}.png?&apiKey=6e962b69616246e393f54d1a809bdb41', {
    
      var : map = new maplibregl.Map({
        container: 'my-map',
        style: 'https://maps.geoapify.com/v1/styles/osm-carto/style.json?apiKey=6e962b69616246e393f54d1a809bdb41',
    })
    
    
  })
    .then(response => response.json())
    .then(_data => {
      
    
    });

  var geoCode = function() {
    var requestOptions = {
      method: 'GET',
    };
    
    fetch("https://api.geoapify.com/v1/geocode/search?text=38%20Upper%20Montagu%20Street%2C%20Westminster%20W1H%201LJ%2C%20United%20Kingdom&apiKey=0d4f7050671f439ca4d8713d9d7dfe5a", requestOptions)
      .then(response => response.json())
      


  }
} 



  
