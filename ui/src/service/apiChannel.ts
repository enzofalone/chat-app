import { API_BASE_URL } from "../constants";
import { ApiClient, Method } from "./apiClient";

export class ApiChannel extends ApiClient {
    constructor(remoteHostUrl : string = API_BASE_URL) {
        super(remoteHostUrl);
    }

    async getChannels() {
        return await this.request({endpoint: '/channel', method: Method.GET});  
    }
}