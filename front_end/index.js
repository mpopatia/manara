var roadAtlasStyles = [
  {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
          {"saturation": -30}
      ]
  }, {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
          {"color": "#FF0000"}
      ]
  }, {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
          {"color": "#a22b65"},
          {"saturation": -80},
          {"lightness": 30},
          
      ]
  }, {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
          {"color": "#612a9c"},
          {"saturation": -80},
          {"lightness": 30},
      ]
  }, {
      "featureType": "landscape",
      "stylers": [
          {"saturation": -100}
      ]
  }, {
    "featureType": "poi",
    "stylers": [
      { "saturation": -100}
    ]
}
]


function renderModal() {
  console.log("Modal maybe?");
}


var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 24.523272, lng: 54.434817},
    zoom: 14
  });

  
  var styledMapOptions = {};

  var RoadMapType = new google.maps.StyledMapType(roadAtlasStyles, styledMapOptions);

  map.mapTypes.set('usroadatlas', RoadMapType);
  map.setMapTypeId('usroadatlas');


  var allCircles = [];
  var activities = [];

  function readActivities() {

    for (var i in activities) {
      // Add the circle for this city to the map.
      var activityCircle = new google.maps.Circle({
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          map: map,
          center: activities[i].location,
          radius: Math.sqrt(activities[i].count) * 100
      });

      allCircles.push(activityCircle);

      (function (i) {
          google.maps.event.addListener(activityCircle, "click", function (e) {
              
          });
      })(i);
    }


  }

  function deleteCircles() {
      for (var i in allCircles) {
          allCircles[i].setMap(null);
      }
      activities = [];
  }
  
  function getActivities() {
    $.get("https://api.myjson.com/bins/1vsb0", 
        {lat: map.getCenter().lat(),lng: map.getCenter().lng()}, 
        function(data) {
          deleteCircles();
          activities = [];
          for (var i in data) {
            activities.push(data[i]);
          }
          console.log("ACTIVITIES: ");
          console.log(activities);
          readActivities();
        }
      );
  }
  

  map.addListener('dragend', function () {
      if (map.zoom >= 10) {
          console.log("Center changed!");
          getActivities();
      }
  });

  getActivities();
}