import { BaseAPI } from "./base-api";
import {ChangeUserProfileRequest, ErrorResponse, UserPasswordRequest, UserResponse} from "./types";
import {BASE_URL} from "../constanst.ts";

class UserAPI extends BaseAPI {
	constructor() {
		super(`${BASE_URL}/user`);
	}changeUserProfile(data: ChangeUserProfileRequest): Promise<UserResponse> {
		return this.put("/profile", {
			data,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
	changeUserPassword(data: UserPasswordRequest): Promise<void | ErrorResponse> {
		return this.put("/password", {
			data,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
	changeUserAvatar(formData: FormData): Promise<UserResponse> {
		return this.put("/profile/avatar", {
			data: formData,
		});
	}
}

export default new UserAPI();
