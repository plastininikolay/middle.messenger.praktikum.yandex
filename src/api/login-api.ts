import { BaseAPI } from "./base-api";
import {
	ErrorResponse,
	SigninRequest,
	SignupRequest,
	SignupResponse,
	UserResponse,
} from "./types";

class AuthAPI extends BaseAPI {
	constructor() {
		super("https://ya-praktikum.tech/api/v2/auth");
	}

	signup(data: SignupRequest): Promise<SignupResponse> {
		return this.post<SignupResponse>("/signup", {
			data,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	signin(data: SigninRequest): Promise<void | ErrorResponse> {
		return this.post<void | ErrorResponse>("/signin", {
			data,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	getUser(): Promise<UserResponse> {
		return this.get<UserResponse>("/user");
	}

	logout(): Promise<void> {
		return this.post<void>("/logout");
	}
}

export default new AuthAPI();
