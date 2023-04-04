import { API_BASE_URL } from "../constants";
import { ApiClient, Method } from "./apiClient";

export class ApiServer extends ApiClient {
    constructor(remoteHostUrl : string = API_BASE_URL) {
        super(remoteHostUrl);
    }

    async getServers() {
        return await this.request({endpoint: '/server', method: Method.GET});  
    }
}