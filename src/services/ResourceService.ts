import HttpService from "./HttpService";
import {
  AvailableResourceData,
  ResourceRequestData,
  AvailableResource,
  ResourceRequest,
} from "../interfaces/interface";
import { LAT, LONG } from "../constants/constants";
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

  static async fetchAllAvailableResources(): Promise<
    AvailableResource[] | null
  > {
    const client = HttpService.getHttpClient();
    const lat = localStorage.getItem(LAT);
    const long = localStorage.getItem(LONG);
    const response = await client.post("/available/all", { lat, long });
    if (response.status === 200) {
      const { data }: { data: AvailableResource[] } = response;
      return data;
    }
    if (response.status === 404) {
      return null;
    }
    return null;
  }

  static async fetchAllResourceRequests(): Promise<ResourceRequest[] | null> {
    const client = HttpService.getHttpClient();
    const lat = localStorage.getItem(LAT);
    const long = localStorage.getItem(LONG);
    const response = await client.post("/request/all", { lat, long });
    if (response.status === 200) {
      const { data }: { data: ResourceRequest[] } = response;
      return data;
    }
    if (response.status === 404) {
      return null;
    }
    return null;
  }

  static async fetchResourceRequestById(
    id: string
  ): Promise<ResourceRequest | null> {
    const client = HttpService.getHttpClient();
    const response = await client.get(`/request/${id}`);
    if (response.status === 200) {
      const { data }: { data: ResourceRequest } = response;
      return data;
    }
    if (response.status === 404) {
      return null;
    }
    return null;
  }
}
