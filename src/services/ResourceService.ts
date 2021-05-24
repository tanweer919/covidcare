import HttpService from "./HttpService";
import {
  AvailableResourceData,
  ResourceRequestData,
} from "../interfaces/interface";
export default class ResourceService {
  static async createAvailableResource(
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
  static async createResourceRequest(
    requestData: ResourceRequestData
  ): Promise<boolean> {
    const client = HttpService.getHttpClient();
    const response = await client.post("/request/add", requestData);
    if (response.status === 201) {
      return true;
    } else if (response.status === 400) {
      return false;
    } else {
      return false;
    }
  }
}
