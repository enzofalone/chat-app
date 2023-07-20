import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";
import { API_BASE_URL } from "../constants";

export enum Method {
  GET = "get",
  POST = "post",
  PATCH = "patch",
  PUT = "put",
  DELETE = "delete",
}

export class ApiClient {
  remoteHostUrl: string;

  constructor(remoteHostUrl: string = API_BASE_URL) {
    this.remoteHostUrl = remoteHostUrl;
  }

  /**
   * Standard request function used for any request into the API client
   */

  async request({ endpoint = "/", method = Method.GET, data = {} }) {
    if (endpoint.charAt(0) != "/") endpoint = "/" + endpoint;

    const url = API_BASE_URL + endpoint;

    const headers: any = {
      Accept: "application/json",
      "Access-Control-Allow-Origin": API_BASE_URL,
    } as any as AxiosRequestHeaders;

    const config: AxiosRequestConfig = {
      headers,
      url,
      method,
    };

    try {
      const res: AxiosResponse = await axios({
        headers,
        url,
        method,
        withCredentials: true
      });

      return { data: res.data, error: null };
    } catch (err: any) {
      console.error({ endpoint, method, errorResponse: err.response });
      const message = err?.response?.data?.error?.message;
      return { data: null, error: message || String(err) };
    }
  }
}
