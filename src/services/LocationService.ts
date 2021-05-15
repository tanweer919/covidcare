export default class LocationService {
  showPosition(position:GeolocationPosition){
    localStorage.setItem(
      "lat",
      JSON.stringify(position.coords.latitude)
    );
    localStorage.setItem(
      "long",
      JSON.stringify(position.coords.longitude)
    );
    localStorage.setItem(
      "locationSet", 
      JSON.stringify(true)
    )
  };
  showError(error: GeolocationPositionError){
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        console.log("The request to get user location timed out.");
        break;
    }
  };
  getLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
    }
  };
}