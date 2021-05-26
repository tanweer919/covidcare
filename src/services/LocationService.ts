import HttpService from "./HttpService";
import { LAT, LONG, LOCATIONSET, CITY } from "../constants/constants";
export default class LocationService {
  async showPosition(position: GeolocationPosition): Promise<string> {
    localStorage.setItem(LAT, JSON.stringify(position.coords.latitude));
    localStorage.setItem(LONG, JSON.stringify(position.coords.longitude));
    const client = HttpService.getHttpClient();
    const { data: city } = await client.post("/city/latlng", {
      lat: position.coords.latitude,
      long: position.coords.longitude,
    });
    localStorage.setItem(CITY, city);
    localStorage.setItem(LOCATIONSET, JSON.stringify(true));
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
