import { HTTPTransport, RequestOptions } from "../utils/httpTransport";

export class BaseAPI {
	protected http: HTTPTransport;
	protected baseURL: string;

	constructor(baseURL: string) {
		this.http = new HTTPTransport();
		this.baseURL = baseURL;
	}

	protected get<T>(url: string, options: RequestOptions = {}): Promise<T> {
		return this.http
			.get(`${this.baseURL}${url}`, options)
			.then(this.parseResponse);
	}

	protected post<T>(url: string, options: RequestOptions = {}): Promise<T> {
		return this.http
			.post(`${this.baseURL}${url}`, options)
			.then(this.parseResponse);
	}

	protected put<T>(url: string, options: RequestOptions = {}): Promise<T> {
		return this.http
			.put(`${this.baseURL}${url}`, options)
			.then(this.parseResponse);
	}

	protected delete<T>(url: string, options: RequestOptions = {}): Promise<T> {
		return this.http
			.delete(`${this.baseURL}${url}`, options)
			.then(this.parseResponse);
	}

	private parseResponse(xhr: XMLHttpRequest): any {
		try {
			return JSON.parse(xhr.response);
		} catch (error: unknown) {
			console.log(error);
			return xhr.response;
		}
	}
}
