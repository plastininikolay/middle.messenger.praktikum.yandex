import Router from "../utils/router";
import store from "../utils/store";
import { PAGE_NAMES } from "../types";
import {ChangeUserProfileRequest, UserPasswordRequest} from "../api/types";
import userAPI from "../api/user-api";

class UserController {
	public async changeUserProfile(data: ChangeUserProfileRequest) {
		try {
			store.set("requestStatus.loading", true);
			store.set("requestStatus.error", null);

			const userResponse = await userAPI.changeUserProfile(data);
			if (userResponse?.reason) {
				throw new Error(userResponse.reason);
			}
			store.set("user", userResponse);
			store.set("requestStatus.loading", false);
			Router.getInstance("#app").go(`/${PAGE_NAMES.profile}`);
		} catch (error) {
			console.error("Request error:", error);

			if (error instanceof Error) {
				store.set("requestStatus.error", error.message);
			} else {
				store.set("requestStatus.error", "Произошла ошибка при изменении");
			}
		} finally {
			store.set("requestStatus.loading", false);
		}
	}
	public async changeUserPassword(data: UserPasswordRequest) {
		try {
			store.set("requestStatus.loading", true);
			store.set("requestStatus.error", null);

			const userResponse = await userAPI.changeUserPassword(data);
			if (userResponse?.reason) {
				throw new Error(userResponse.reason);
			}
			Router.getInstance("#app").go(`/${PAGE_NAMES.profile}`);
		} catch (error) {
			console.error("Unexpected error:", error);

			if (error instanceof Error) {
				store.set("requestStatus.error", error.message);
			} else {
				store.set("requestStatus.error", "Произошла ошибка при изменении");
			}
		} finally {
			store.set("requestStatus.loading", false);
		}
	}
	async changeAvatar(file: File) {
		try {
			store.set("requestStatus.loading", true);
			store.set("requestStatus.error", null);

			const formData = new FormData();
			formData.append("avatar", file);

			const userResponse = await userAPI.changeUserAvatar(formData);

			if (userResponse?.reason) {
				throw new Error(userResponse.reason);
			}

			// Обновляем информацию о пользователе в сторе
			store.set("user", userResponse);
			store.set("requestStatus.loading", false);

			return userResponse;
		} catch (error) {
			console.error("Request error:", error);

			if (error instanceof Error) {
				store.set("requestStatus.error", error.message);
			} else {
				store.set("requestStatus.error", "Произошла ошибка при изменении аватара");
			}
			throw error;
		} finally {
			store.set("requestStatus.loading", false);
		}
	}
}

export default new UserController();
