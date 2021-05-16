import axios from "axios";

export default class HttpService {
  
  static getHttpClient = () => {
    let httpClient = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api`,
    });
    return httpClient;
  };
}
