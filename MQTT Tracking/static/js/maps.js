// leaflet-map.js

// Initialize the map centered around specific coordinates
var southwest = L.latLng(12.91862141764393, 80.24301973255754)
var northeast = L.latLng(12.9253380162951, 80.23541862632625)
var bounds = L.latLngBounds(southwest, northeast);


const mapCenter = [12.920941717601204, 80.23976211560127];
var map = L.map('map', {
    center: bounds.getCenter(),
    zoom: 5,
   // maxBounds: bounds,
    //maxBoundsViscosity: 1.0
});
// Add a tile layer from OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
 }).addTo(map);

var CartoDB_DarkMatterNoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
});

CartoDB_DarkMatterNoLabels.addTo(map);


map.on('zoomend', function() {
  var currentZoom = map.getZoom();
  if(currentZoom < 10)
  {
    map.setView(mapCenter, 10);
  }
});

var markerss = {};
var markerLocations = [];

// Function to update the location of a marker with a given ID
function updateMarkerLocation(markerId, lat, long) {
    // Get the old marker, if it exists
    var oldMarker = markers[markerId];
  
    // If the old marker exists, remove it from the map
    if (oldMarker) {
      oldMarker.remove();
    }
  
    // Create a new marker with the given ID, lat, and long
    var newMarker = L.marker([lat, long], { markerId: markerId }).addTo(map);
  
    // Store the new marker in the markers object
    markers[markerId] = newMarker;
  }
 
//   updateMarkerLocation('myMarker',12.920941717601204, 80.23976211560127);

// Marker Movements :

// var arr = [[12.920700894519332, 80.23955324071105],
// [12.920748725504806, 80.23955324071105],
// [12.920838425349437, 80.23957591636565],
// [12.920909011311329, 80.23960810287171],
// [12.92100051160261, 80.23964028937775],
// [12.921099854738047, 80.23969661576335],
// [12.921136454830616, 80.23971002680754],
// [12.921204426416852, 80.2397153912252],
// [12.921209654999647, 80.2397288022694],
// [12.921256712239854, 80.23976098877546],
// [12.921267169403132, 80.23976635319313],
// [12.921340369533869, 80.23978244644616]]

// var lat = 12.920700894519332 ;
// var long = 80.23955324071105 ;
// setInterval(function coords(){
//     updateMarkerLocation("markerId", lat, long);
//     lat += 0.00005;
//     long += 0.00002;
// }, 2000)
var coords = [
    { markerId: 'marker1', lat: 12.920700894519332, long: 80.23955324071105 },
    { markerId: 'marker2', lat: 12.920800894519332, long: 80.23965324071105 }
  ];
  var client = mqtt.connect('ws://68.178.168.62:8083',{clientId: 'your-client-id', 
  username: 'howin',   
  password: 'howin',});
  var markers = {};
// Subscribe to the topic
//    client.on('connect', function () {
//      client.subscribe('123', function (err) {
//        if (!err) {
//          console.log("Successfully subscribed to the topic.");
//        }
//      });
//    });
for (var i = 1; i <= 10; i++) {
  var topic = i.toString(); // Convert the numerical value to a string
  client.subscribe(topic, function (err) {
    if (!err) {
      console.log("Successfully subscribed to topic:", topic);
    }
  });
}
function createTopicButton(topic) {
  var button = document.createElement('button');
  button.textContent = 'Topic ' + topic;
  button.className = 'custom-button'; // Add the custom-button class
  button.addEventListener('click', function () {
      // Highlight the corresponding marker on the map
      highlightMarker(topic);
  });
  return button;
}
var topicButtonsContainer = document.getElementById('topicButtons');
for (var i = 1; i <= 10; i++) {
    var topic = i.toString();
    var button = createTopicButton(topic);
    topicButtonsContainer.appendChild(button);
}

function updateMarker(deviceId, lat, long) {
  if (!markers[deviceId]) {
      // Create a new marker if it doesn't exist
      markers[deviceId] = L.marker([lat, long]).addTo(map);
  } else {
      // Update the existing marker's position
      markers[deviceId].setLatLng([lat, long]);
  }
}
client.on('message', function (topic, message) {
  var deviceId = topic;
  // Convert the message to a string
  var messageStr = message.toString();

  // Parse the JSON
  var messageJson;
  try {
    messageJson = JSON.parse(messageStr);
  } catch (error) {
    console.error('Error parsing MQTT message:', error);
    return; // Exit the function if parsing fails
  }

  // Extract device ID and coordinates
 // var deviceId =messageJson.deviceId;
  var lat = messageJson.latitude;
  var long = messageJson.longitude;
  if (isNaN(lat) || isNaN(long)) {
    console.error('Invalid GPS coordinates:', lat, long);
    return; // Exit the function if coordinates are invalid
  }

  console.log('Device ID:', deviceId);
  console.log('Latitude:', lat);
  console.log('Longitude:', long);

  // Update or create a marker for the device on the map

  updateMarker(deviceId, lat, long);
});

var highlightedIcon = L.icon({
  iconUrl: 'D:/Revised code/static/icons/mining-truck.png', // URL to the highlighted marker icon image
  iconSize: [40, 41], // Adjust the size as needed
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
function highlightMarker(topic) {
  // Update the marker's appearance (e.g., change color, size, etc.) based on the topic
  // You can access the marker using the markers object and update its properties here
  var marker = markers[topic];
  if (marker) {
      // For example, change the marker's icon to a highlighted one
      marker.setIcon(highlightedIcon);
      
      // You can also center the map on the marker's position when it's highlighted
      map.setView(marker.getLatLng(), 20);
  }
}
// Define the reset button element
var resetButton = document.getElementById('resetButton');

// Add a click event listener to the reset button
resetButton.addEventListener('click', function () {
    // Loop through all markers and reset their icons to the default state
    for (var topic in markers) {
        if (markers.hasOwnProperty(topic)) {
            resetMarkerAppearance(topic);
        }
    }
});


// Define default marker icon
var defaultIcon = L.icon({
    iconUrl: 'D:/Revised code/static/icons/placeholder.png', // URL to the default marker icon image
    iconSize: [35, 41], // Adjust the size as needed
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

// Define a function to reset the marker appearance (e.g., unhighlight)
function resetMarkerAppearance(topic) {
  // Reset the marker appearance to its default state
  // For example, change the marker's icon back to the original one
  var marker = markers[topic];
  if (marker) {
      marker.setIcon(defaultIcon);
  }
}

  // Update the marker location
//  markerLocations.push([lat, long]);
//  map.fitBounds(markerLocations);

  // Update the location of each marker every 2 seconds
