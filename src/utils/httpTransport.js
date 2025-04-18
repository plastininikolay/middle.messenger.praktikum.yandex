const METHODS = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	DELETE: 'DELETE',
};

function queryStringify(data) {
	if (typeof data !== 'object') {
		throw new Error('Data must be object');
	}

	const keys = Object.keys(data);
	return keys.reduce((result, key, index) => {
		return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
	}, '?');
}

class HTTPTransport {
	get = (url, options = {}) => {

		return this.request(url, {...options, method: METHODS.GET}, options.timeout);
	};

	post = (url, options = {}) => {
		return this.request(url, {...options, method: METHODS.POST}, options.timeout);
	};

	put = (url, options = {}) => {
		return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
	};

	delete = (url, options = {}) => {
		return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
	};

	request = (url, options = {}, timeout = 5000) => {
		const {headers = {}, method, data} = options;

		return new Promise(function(resolve, reject) {
			if (!method) {
				reject('No method');
				return;
			}

			const xhr = new XMLHttpRequest();
			const isGet = method === METHODS.GET;

			xhr.open(
				method,
				isGet && !!data
					? `${url}${queryStringify(data)}`
					: url,
			);

			Object.keys(headers).forEach(key => {
				xhr.setRequestHeader(key, headers[key]);
			});

			xhr.onload = function() {
				resolve(xhr);
			};

			xhr.onabort = reject;
			xhr.onerror = reject;

			xhr.timeout = timeout;
			xhr.ontimeout = reject;

			if (isGet || !data) {
				xhr.send();
			} else {
				xhr.send(data);
			}
		});
	};
}

function fetchWithRetry(url, options = {}) {
	const {tries = 1} = options;

	function onError(err){
		const triesLeft = tries - 1;
		if (!triesLeft){
			throw err;
		}

		return fetchWithRetry(url, {...options, tries: triesLeft});
	}

	return fetch(url, options).catch(onError);
}
