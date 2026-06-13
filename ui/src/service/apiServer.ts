import { API_BASE_URL } from '../constants';
import { ApiClient, Method } from './apiClient';

export class ApiServer extends ApiClient {
  constructor(remoteHostUrl: string = API_BASE_URL) {
    super(remoteHostUrl);
  }

  async getAll() {
    return await this.request({ endpoint: '/server', method: Method.GET });
  }

  async create(serverName: string) {
    return await this.request({
      endpoint: `/server/`,
      data: { serverName },
      method: Method.POST,
    });
  }

  async createInviteLink(workspaceId: string) {
    return await this.request({
      endpoint: `/server/join/generate?workspaceId=${workspaceId}`,
      method: Method.GET,
    });
  }

  async join(workspaceId: string) {
    return await this.request({
      endpoint: `/server/join/${workspaceId}`,
      method: Method.GET,
    });
  }
}
