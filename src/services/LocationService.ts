import HttpService from "./HttpService";
export default class LocationService {
  async showPosition(position: GeolocationPosition): Promise<string> {
    console.log(position);
    localStorage.setItem("lat", JSON.stringify(position.coords.latitude));
    localStorage.setItem("long", JSON.stringify(position.coords.longitude));
    const client = HttpService.getHttpClient();
    const { data: city } = await client.post("/city/latlng", {
      lat: position.coords.latitude,
      long: position.coords.longitude,
    });
    localStorage.setItem("city", JSON.stringify(city));
    localStorage.setItem("locationSet", JSON.stringify(true));
    return city
  }
  showError(error: GeolocationPositionError, reject: (reason?: any) => void) {}
  getLocation(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position: GeolocationPosition) => {
            const city = await this.showPosition(position);
            resolve(city);
          },
          (error: GeolocationPositionError) => {
            reject(error.code);
          }
        );
      }
    });
  }
}
