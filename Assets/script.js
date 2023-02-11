
const myapiKey = "6e962b69616246e393f54d1a809bdb41";

// The Leaflet map Object
const map = L.map('map', { zoomControl: false }).setView([38.908838755401035, -77.02346458179596], 12);

// Retina displays require different mat tiles quality
const isRetina = L.Browser.retina;

const baseUrl = "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=" + myapiKey;
const retinaUrl = "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey=" + myapiKey;

// Add map tiles layer. Set 20 as the maximal zoom and provide map data attribution.
L.tileLayer(isRetina ? retinaUrl : baseUrl, {
  attribution: 'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" rel="nofollow" target="_blank">(c) OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" rel="nofollow" target="_blank">(c) OpenStreetMap</a> contributors',
  apiKey: myapiKey,
  maxZoom: 20,
  id: 'osm-bright'
}).addTo(map);

// add a zoom control to bottom-right corner
L.control.zoom({
  position: 'bottomright'
}).addTo(map);

const autocompleteInput = new autocomplete.GeocoderAutocomplete(
  document.getElementById("autocomplete"),
  myapiKey,
  {
    type: 'city',
  });

autocompleteInput.on('select', (location) => {
  console.log(location.properties.lon);
  console.log(location.properties.lat);
  brew(location.properties.lat, location.properties.lon);
  map.panTo([location.properties.lat, location.properties.lon]);
  autocompleteInput.on("select", (location) => {
    console.log(location.properties);
    console.log(location.properties.lat);
    entertainment(location.properties.place_id);
    brew(location.properties.lat, location.properties.lon);
    map.panTo([location.properties.lat, location.properties.lon]);
  });

  // generate an marker icon with https://apidocs.geoapify.com/playground/icon
  const markerIcon = L.icon({
    iconUrl: `https://api.geoapify.com/v1/icon/?type=awesome&color=%232ea2ff&size=large&scaleFactor=2&apiKey=${myapiKey}`,
    iconSize: [38, 56], // size of the icon
    iconAnchor: [19, 51], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -60] // point from which the popup should open relative to the iconAnchor
  });

  let marker;

  autocompleteInput.on('select', (location) => {
    // Add marker with the selected location
    if (marker) {
      marker.remove();
    }

    if (location) {
      marker = L.marker([location.properties.lat, location.properties.lon], {
        icon: markerIcon
      }).addTo(map);

      map.panTo([location.properties.lat, location.properties.lon]);

      brew([location.properties.lat, location.properties.ion]);

      const breweriesUl = document.getElementById("breweries-ul");
      breweriesUl.innerHTML = "";
    }
  });
  autocompleteInput.on("select", (location) => {
    // Add marker with the selected location
    if (marker) {
      marker.remove();
    }

    if (location) {
      marker = L.marker([location.properties.lat, location.properties.lon], {
        icon: markerIcon,
      }).addTo(map);

      console.log(marker);
      map.panTo([location.properties.lat, location.properties.lon]);

    }
  });

  console.log(window)


  function brew(lat, long) {
    fetch('https://api.openbrewerydb.org/breweries?by_dist=' + lat + ',' + long + '&per_page=10')
    function brew(lat, long) {
      console.log("hello", lat, long);
      fetch("https://api.openbrewerydb.org/breweries?by_dist=" + lat + "," + long + "&per_page=10")
        .then((response) => response.json())
        .then((data) => {
          var breweriesUl = document.getElementById("breweries-ul");
          for (const brewery of data) {
            const breweryLi = document.createElement("li");
            breweryLi.innerHTML = brewery.name;
            breweriesUl.appendChild(breweryLi);

          }

          console.log(data);
          for (const brewery of data) {
            const breweryLi = document.createElement("li");
            breweryLi.innerHTML = `${brewery.name}(${brewery.brewery_type}): ${brewery.phone},  ${brewery.street}, ${brewery.website_url}. `;
            breweriesUl.appendChild(breweryLi);
          }
        });
    
      }}})