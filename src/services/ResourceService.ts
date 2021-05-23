import HttpService from "./HttpService";
import { AvailableResourceData } from "../interfaces/interface";
export default class ResourceServie {
  static async createResource(
    availableData: AvailableResourceData
  ): Promise<boolean> {
    const client = HttpService.getHttpClient();
    const response = await client.post("/available/add", availableData);
    if (response.status === 201) {
      return true;
    } else if (response.status === 400) {
      return false;
    } else {
      return false;
    }
  }
}
