import Router from "../utils/router";
import store from "../utils/store";
import { PAGE_NAMES } from "../types";
import { SigninRequest, SignupRequest } from "../api/types";
import authAPI from "../api/login-api";

class UserAuthController {
	public async login(data: SigninRequest) {
		try {
			store.set("requestStatus.loading", true);
			store.set("requestStatus.error", null);
			const authResponse = await authAPI.signin({
				login: data.login,
				password: data.password,
			});
			if (authResponse?.reason) {
				throw new Error(authResponse.reason);
			}		const user = await authAPI.getUser();
			store.set("user", user);
			store.set("isLoggedIn", true);
			store.set("requestStatus.loading", false);
			Router.getInstance("#app").go(`/${PAGE_NAMES.chats}`);
		} catch (error) {
			console.error("Request error:", error);
			if (error instanceof Error) {
				store.set("requestStatus.error", error.message);
			} else {
				store.set("requestStatus.error", "Произошла ошибка при входе");
			}
		} finally {
			store.set("requestStatus.loading", false);
		}
	}
	public async signup(data: SignupRequest) {
		try {
			store.set("requestStatus.loading", true);
			store.set("requestStatus.error", null);
			const authResponse = await authAPI.signup(data);		if (authResponse?.reason) {
				throw new Error(authResponse.reason);
			}
			await authAPI.signin({
				login: data.login,
				password: data.password,
			});
			const user = await authAPI.getUser();
			store.set("user", user);
			store.set("isLoggedIn", true);
			store.set("requestStatus.loading", false);		Router.getInstance("#app").go(`/${PAGE_NAMES.chats}`);
		} catch (error) {
			console.error("Signup error:", error);		if (error instanceof Error) {
				store.set("requestStatus.error", error.message);
			} else {
				store.set("requestStatus.error", "Произошла ошибка при регистрации");
			}
		} finally {
			store.set("requestStatus.loading", false);
		}
	}
	public async logout() {
		try {
			store.set("requestStatus.loading", true);		await authAPI.logout();		store.set("user", null);
			store.set("isLoggedIn", false);
			store.set("requestStatus.loading", false);
			Router.getInstance("#app").go(`/${PAGE_NAMES.authentication}`);
		} catch (error) {
			console.error("Logout error:", error);
		} finally {
			store.set("requestStatus.loading", false);
		}
	}
	public async checkAuth() {
		try {
			store.set("requestStatus.loading", true);		const user = await authAPI.getUser();
			if (user.reason) {
				throw new Error(user.reason)
			}
			store.set("user", user);
			store.set("isLoggedIn", true);
			return true;
		} catch (error) {
			console.log(error);
			store.set("user", null);
			store.set("isLoggedIn", false);
			store.set("requestStatus.loading", false);
			return false;
		} finally {
			store.set("requestStatus.loading", false);
		}
	}
}

export default new UserAuthController();
