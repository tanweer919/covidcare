export default class LocationService {
  showPosition(position: GeolocationPosition) {
    localStorage.setItem("lat", JSON.stringify(position.coords.latitude));
    localStorage.setItem("long", JSON.stringify(position.coords.longitude));
    localStorage.setItem("locationSet", JSON.stringify(true));
  }
  showError(error: GeolocationPositionError, reject: (reason?: any) => void) {}
  getLocation(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            this.showPosition(position);
            resolve("");
          },
          (error: GeolocationPositionError) => {
            reject(error.code);
          }
        );
      }
    });
  }
}
