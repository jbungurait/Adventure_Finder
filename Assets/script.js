const myapiKey = "6e962b69616246e393f54d1a809bdb41";

// The Leaflet map Object
const map = L.map("map", { zoomControl: false }).setView(
  [38.908838755401035, -77.02346458179596],
  12
);

// Retina displays require different mat tiles quality
const isRetina = L.Browser.retina;

const baseUrl =
  "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=" +
  myapiKey;
const retinaUrl =
  "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey=" +
  myapiKey;

// Add map tiles layer. Set 20 as the maximal zoom and provide map data attribution.
L.tileLayer(isRetina ? retinaUrl : baseUrl, {
  attribution:
    'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a       href="https://openmaptiles.org/" rel="nofollow" target="_blank">(c) OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" rel="nofollow" target="_blank">(c) OpenStreetMap</a> contributors',
  apiKey: myapiKey,
  maxZoom: 20,
  id: "osm-bright",
}).addTo(map);

// add a zoom control to bottom-right corner
L.control
  .zoom({
    position: "bottomright",
  })
  .addTo(map);

const autocompleteInput = new autocomplete.GeocoderAutocomplete(
  document.getElementById("autocomplete"),
  myapiKey,
  {
    type: "city",
  }
);
var entertainmentDiv = document.getElementById("entertainment-ul");
var hotelDiv = document.getElementById("hotel-ul");

autocompleteInput.on("select", (location) => {
  // console.log(location.properties);
  // console.log(location.properties.lat);
  const selectedLocation = location.properties.name;

  let cities = JSON.parse(localStorage.getItem("cities")) || [];
  cities.push(selectedLocation);
  localStorage.setItem("cities", JSON.stringify(cities));

  entertainmentDiv.textContent = "";
  hotelDiv.textContent = "";
  entertainment(location.properties.place_id);
  brew(location.properties.lat, location.properties.lon);
  hotel(location.properties.place_id);
  map.panTo([location.properties.lat, location.properties.lon]);
});

// generate an marker icon with https://apidocs.geoapify.com/playground/icon
const markerIcon = L.icon({
  iconUrl: `https://api.geoapify.com/v1/icon/?type=awesome&color=%232ea2ff&size=large&scaleFactor=2&apiKey=${myapiKey}`,
  iconSize: [38, 56], // size of the icon
  iconAnchor: [19, 51], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -60], // point from which the popup should open relative to the iconAnchor
});

let marker;

autocompleteInput.on("select", (location) => {
  // Add marker with the selected location
  if (marker) {
    marker.remove();
  }
  if (location) {
    marker = L.marker([location.properties.lat, location.properties.lon], {
      icon: markerIcon,
    }).addTo(map);

    // console.log(marker);
    map.panTo([location.properties.lat, location.properties.lon]);
  }
});

function brew(lat, long) {
  // console.log("hello", lat, long);
  fetch(
    "https://api.openbrewerydb.org/breweries?by_dist=" +
      lat +
      "," +
      long +
      "&per_page=10"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const breweriesUl = document.getElementById("breweries-ul");
      breweriesUl.innerHTML = "";

      for (const brewery of data) {
        const breweryLi = document.createElement("li");

        breweryLi.innerHTML = `<span class="business-name">${
          brewery.name
        }</span>
        (<span class="brewery-type">${brewery.brewery_type}</span>)<br>
        Address: ${brewery.street}, 
        ${brewery.city},
        ${brewery.state}
        ${brewery.postal_code}
        
        <div>Phone:<a href="tel:Phone${brewery.phone}" >${brewery.phone.replace(
          /(\d{3})(\d{3})(\d{4})/,
          "($1) $2-$3"
        )}</a></div>
        <div> <a href="${brewery.website_url}">${
          brewery.website_url
        }</a></div>`;

        breweriesUl.appendChild(breweryLi);
      }
    });
}

function entertainment(id) {
  // console.log("entertainment", entertainment);
  fetch(
    "https://api.geoapify.com/v2/places?categories=entertainment.culture&filter=place:" +
      id +
      "&limit=10&apiKey=56552ab1bbc6495d8b095457b9993b3e"
  )
    .then((response) => response.json())
    .then((data) => {
      // console.log(data.features);
      const entertainmentUl = document.getElementById("entertainment-ul");
      for (const feature of data.features) {
        // console.log(feature);
        const entertainmentName = document.createElement("li");
        entertainmentName.setAttribute("class", "business-name");
        //this is meant to provide the entertainment name
        entertainmentName.innerHTML = feature.properties.name;
        //this is meant to provide the entertainment address
        const entertainmentAddress = document.createElement("li");
        entertainmentAddress.innerHTML +=
          " Address: " +
          feature.properties.address_line2.replace(
            ", United States of America",
            ""
          );
        const entertainmentWebsite = document.createElement("li");
        entertainmentWebsite.innerHTML +=
          "<a href=" +
          feature.properties.datasource.raw.website +
          ">" +
          feature.properties.datasource.raw.website +
          "</a>";

        entertainmentUl.appendChild(entertainmentName);
        entertainmentUl.appendChild(entertainmentAddress);

        //if phone number, then display phone number
        if (feature.properties.datasource.raw.phone) {
          const entertainmentPhone = document.createElement("li");
          const numberLayout = feature.properties.datasource.raw.phone
            .replace(/\+1|\D/g, "")
            .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");

          entertainmentPhone.innerHTML +=
            " Phone:" +
            '<a href="tel:' +
            numberLayout +
            '">' +
            numberLayout +
            "</a>";
          entertainmentUl.appendChild(entertainmentPhone);
          entertainmentUl.appendChild(entertainmentWebsite);
        }
      }
    });
}

// hotel api
function hotel(id) {
  var apiUrl = "https://api.geoapify.com/v2/places?";
  var apiKey2 = "716cf20b2b0d4e18bf967f6f679eeeac";
  var placeDetails =
    apiUrl +
    "categories=accommodation.hotel,accommodation.motel &filter=place:" +
    id +
    "&limit=10" +
    "&apiKey=" +
    apiKey2;
  if (!placeDetails) {
    console.log("Err: no placeDetails. line:150");
  } else {
    fetch(placeDetails)
      .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
        return response.json();
      })
      .then((data) => {
        console.log("data", data);
        const hotelUl = document.getElementById("hotel-ul");
        for (const feature of data.features) {
          console.log(
            "Hotel response Data: ",
            feature.properties.address_line2
          );
          const hotelLi = document.createElement("li");

          hotelLi.innerHTML = `<span class="business-name">${feature.properties.name}</span>`;

          hotelLi.innerHTML +=
            "<br> Address: " +
            feature.properties.address_line2.replace(
              ", United States of America",
              ""
            );

          if (feature.properties.datasource.raw.phone) {
            const numberLayout = feature.properties.datasource.raw.phone
              .replace(/\+1|\D/g, "")
              .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
            hotelLi.innerHTML +=
              "<br> Phone:" +
              '<a href="tel:' +
              numberLayout +
              '">' +
              numberLayout +
              "</a>";
            hotelUl.appendChild(hotelLi);
          }
          if (feature.properties.datasource.raw.website)
            hotelLi.innerHTML +=
              "<br><a href=" +
              feature.properties.datasource.raw.website +
              ">" +
              feature.properties.datasource.raw.website +
              "</a";
        }
      });
  }
}

const cities = JSON.parse(localStorage.getItem("cities")) || [];
const cityList = document.getElementById("city-list");
cities.forEach((city) => {
  const listItem = document.createElement("li");
  listItem.textContent = city;
  cityList.appendChild(listItem);
});
