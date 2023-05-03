import { API_BASE_URL } from "../constants";
import { ApiClient, Method } from "./apiClient";

export class ApiUser extends ApiClient {
    constructor(remoteHostUrl : string = API_BASE_URL) {
        super(remoteHostUrl);
    }

    async getUser() {
        return await this.request({endpoint: '/auth/login/', method: Method.GET});  
    }
}