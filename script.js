let map, service;

function initMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        map = new google.maps.Map(document.getElementById("map"), {
          zoom: 14,
          center: userLocation,
        });

        service = new google.maps.places.PlacesService(map);
        const request = {
          location: userLocation,
          radius: 5000,
          type: ['hospital'],
        };

        service.nearbySearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            results.forEach((place) => {
              const marker = new google.maps.Marker({
                position: place.geometry.location,
                map: map,
              });

              const infowindow = new google.maps.InfoWindow({
                content: place.name,
              });

              marker.addListener("click", () => {
                infowindow.open(map, marker);
              });
            });
          } else {
            document.getElementById("status").innerText =
              "Aucun hôpital trouvé dans votre zone.";
          }
        });
      },
      () => {
        document.getElementById("status").innerText =
          "Géolocalisation refusée. Impossible de trouver votre position.";
      }
    );
  } else {
    document.getElementById("status").innerText =
      "La géolocalisation n'est pas supportée par votre navigateur.";
  }
}
