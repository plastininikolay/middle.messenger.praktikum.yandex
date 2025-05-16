import { BaseAPI } from "./base-api";
import {ChangeUserProfileRequest, ErrorResponse, UserPasswordRequest, UserResponse} from "./types";

class UserAPI extends BaseAPI {
	constructor() {
		super("https://ya-praktikum.tech/api/v2/user");
	}

	changeUserProfile(data: ChangeUserProfileRequest): Promise<UserResponse> {
		return this.put<UserResponse>("/profile", {
			data,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
	changeUserPassword(data: UserPasswordRequest): Promise<void | ErrorResponse> {
		return this.put<void | ErrorResponse>("/password", {
			data,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
}

export default new UserAPI();
