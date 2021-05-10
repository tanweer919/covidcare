import axios from "axios";

export default class HttpService {
  
  static getHttpClient = () => {
    let httpClient = axios.create({ baseURL: "http://localhost:8080/api" });
    return httpClient;
  };
}
