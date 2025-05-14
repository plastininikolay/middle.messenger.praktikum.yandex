export default class HTTP {
	private baseUrl: string;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	async get(endpoint: string) {
		const response = await fetch(`${this.baseUrl}${endpoint}`);
		this.checkResponse(response);
		return response.json();
	}

	async post(endpoint: string, body: any) {
		const response = await fetch(`${this.baseUrl}${endpoint}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});
		this.checkResponse(response);
		return response.json();
	}

	private checkResponse(response: Response) {
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
	}
}
