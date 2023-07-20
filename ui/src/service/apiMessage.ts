import { API_BASE_URL } from "../constants";
import { ApiClient, Method } from "./apiClient";

export class ApiMessage extends ApiClient {
  constructor(remoteHostUrl: string = API_BASE_URL) {
    super(remoteHostUrl);
  }

  async get(channelId: string) {
    return await this.request({
      endpoint: `/messages/${channelId}`,
      method: Method.GET,
    });
  }
}
