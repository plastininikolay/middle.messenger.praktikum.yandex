import queryStringify from "./queryStringify";

const METHODS = {
	GET: "GET",
	POST: "POST",
	PUT: "PUT",
	DELETE: "DELETE",
};

export class HTTPTransport {
	get = (url: string, options: any) => {
		return this.request(
			url,
			{ ...options, method: METHODS.GET },
			options.timeout,
		);
	};

	post = (url: string, options: any) => {
		return this.request(
			url,
			{ ...options, method: METHODS.POST },
			options.timeout,
		);
	};

	put = (url: string, options: any) => {
		return this.request(
			url,
			{ ...options, method: METHODS.PUT },
			options.timeout,
		);
	};

	delete = (url: string, options: any) => {
		return this.request(
			url,
			{ ...options, method: METHODS.DELETE },
			options.timeout,
		);
	};

	request = (url: string, options: any, timeout = 5000) => {
		const { headers = {}, method, data, withCredentials = true } = options;

		return new Promise(function (resolve, reject) {
			if (!method) {
				reject("No method");
				return;
			}

			const xhr = new XMLHttpRequest();
			const isGet = method === METHODS.GET;

			xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

			Object.keys(headers).forEach((key) => {
				xhr.setRequestHeader(key, headers[key]);
			});

			xhr.onload = function () {
				resolve(xhr);
			};

			xhr.onabort = reject;
			xhr.onerror = reject;

			xhr.timeout = timeout;
			xhr.withCredentials = withCredentials;
			xhr.ontimeout = reject;

			if (isGet || !data) {
				xhr.send();
			} else if (data instanceof FormData) {
				xhr.send(data);
			} else {
				xhr.setRequestHeader("Content-Type", "application/json");
				xhr.send(JSON.stringify(data));
			}
		});
	};
}
