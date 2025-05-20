import queryStringify from "./queryStringify";

type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

const METHODS: Record<HTTPMethod, HTTPMethod> = {
	GET: "GET",
	POST: "POST",
	PUT: "PUT",
	DELETE: "DELETE",
};

export type RequestOptions = {
	headers?: Record<string, string>;
	method?: HTTPMethod;
	data?: Record<string, any> | FormData;
	timeout?: number;
	withCredentials?: boolean;
};

export class HTTPTransport {
	get = (url: string, options: RequestOptions = {}) => {
		return this.request(
			url,
			{ ...options, method: METHODS.GET },
			options.timeout,
		);
	};post = (url: string, options: RequestOptions = {}) => {
		return this.request(
			url,
			{ ...options, method: METHODS.POST },
			options.timeout,
		);
	};put = (url: string, options: RequestOptions = {}) => {
		return this.request(
			url,
			{ ...options, method: METHODS.PUT },
			options.timeout,
		);
	};delete = (url: string, options: RequestOptions = {}) => {
		return this.request(
			url,
			{ ...options, method: METHODS.DELETE },
			options.timeout,
		);
	};request = (
		url: string,
		options: RequestOptions,
		timeout = 5000,
	): Promise<XMLHttpRequest> => {
		const { headers = {}, method, data, withCredentials = true } = options;	return new Promise(function (resolve, reject) {
			if (!method) {
				reject(new Error("No method"));
				return;
			}		const xhr = new XMLHttpRequest();
			const isGet = method === METHODS.GET;		xhr.open(
				method,
				isGet && !!data
					? `${url}${queryStringify(data as Record<string, any>)}`
					: url,
			);		Object.keys(headers).forEach((key) => {
				xhr.setRequestHeader(key, headers[key]);
			});		xhr.onload = function () {
				resolve(xhr);
			};		xhr.onabort = () => reject(new Error("Request aborted"));
			xhr.onerror = () => reject(new Error("Network error occurred"));		xhr.timeout = timeout;
			xhr.withCredentials = withCredentials;
			xhr.ontimeout = () => reject(new Error("Request timeout"));		if (isGet || !data) {
				xhr.send();
			} else if (data instanceof FormData) {
				xhr.send(data);
			} else {
				xhr.send(JSON.stringify(data));
			}
		});
	};
}
