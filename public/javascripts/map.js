
window.onload = () => {
  // Store center's coordinates
  const mapCenter = { lat: 38,  lng: -98 };
  
  let markers = [];
  
  // Map initialization
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
  center: mapCenter
  });


  function getPlace() {
    axios.get("http://localhost:3000/api")
    .then( response => {
      placePlaces(response.data.places);
    })
    .catch(error => {
      next(error);
    });
  }
  getPlace();
  
  function placePlaces(places){
    places.forEach((place) => {
      const center = {
        lat: place.location.coordinates[1],
        lng: place.location.coordinates[0]
      };
      const pin = new google.maps.Marker({
        position: center,
        map: map,
        title: place.name
      });
      markers.push(pin);
    });
      // Zoom to fit all markers
      const bounds = new google.maps.LatLngBounds();
      for (let i = 0; i < markers.length; i++) {
      bounds.extend(markers[i].getPosition());
      }
      map.fitBounds(bounds);
  }
};




