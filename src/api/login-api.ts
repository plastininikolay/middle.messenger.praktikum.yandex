import { BaseAPI } from "./base-api";
import {
	ErrorResponse,
	SigninRequest,
	SignupRequest,
	SignupResponse,
	UserResponse,
} from "./types";
import {BASE_URL} from "../constanst.ts";

class AuthAPI extends BaseAPI {
	constructor() {
		super(`${BASE_URL}/auth`);
	}
	signup(data: SignupRequest): Promise<SignupResponse> {
		return this.post("/signup", {
			data,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
	signin(data: SigninRequest): Promise<void | ErrorResponse> {
		return this.post("/signin", {
			data,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
	getUser(): Promise<UserResponse> {
		return this.get("/user");
	}
	logout(): Promise<void> {
		return this.post("/logout");
	}
}

export default new AuthAPI();
