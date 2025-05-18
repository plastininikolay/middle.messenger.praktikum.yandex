import Router from "./utils/router";
import {AuthPage} from "./pages/AuthPage/AuthPage";
import {RegistrationPage} from "./pages/RegistrationPage/RegistrationPage";
import {ChatsPage} from "./pages/ChatsPage/ChatsPage";
import {ProfilePage} from "./pages/ProfilePage/ProfilePage";
import {ProfileEditPage} from "./pages/ProfileEditPage/ProfileEditPage";
import {ChangePasswordPage} from "./pages/ChangePassword/ChangePassword";
import {NotFoundPage} from "./pages/NotFoundPage/NotFoundPage";
import {ErrorPage} from "./pages/ErrorPage/ErrorPage";
import {PAGE_NAMES} from "./types";
import "./styles/index.scss";
import store from "./utils/store";
import {StoreEvents} from "./utils/store";
import UserAuthController from "./controllers/user-login";
import ChatsController from "./controllers/chats.ts";

// Инициализируем систему с подпиской на события
store.on(StoreEvents.Updated, () => {
	console.log("Store updated, new state:", store.getState());
});

document.addEventListener("DOMContentLoaded", async () => {
	if (!store.getState().user &&
		window.location.pathname !== `/${PAGE_NAMES.authentication}` &&
		window.location.pathname !== `/${PAGE_NAMES.registration}`) {
		await UserAuthController.checkAuth();
	}
	if (store.getState().user && window.location.pathname === `/${PAGE_NAMES.chats}`) {
		void ChatsController.getChats({
			offset: 0,
			limit: 10,
		})
	}
	const router = Router.getInstance("#app");router
		.use(`/${PAGE_NAMES.authentication}`, AuthPage)
		.use(`/${PAGE_NAMES.registration}`, RegistrationPage)
		.use(`/${PAGE_NAMES.chats}`, ChatsPage)
		.use(`/${PAGE_NAMES.profile}`, ProfilePage)
		.use(`/${PAGE_NAMES.profileEdit}`, ProfileEditPage)
		.use(`/${PAGE_NAMES.chagePassword}`, ChangePasswordPage)
		.use(`/${PAGE_NAMES.notFound}`, NotFoundPage)
		.use(`/${PAGE_NAMES.serverError}`, ErrorPage)
		.use("/", AuthPage);router.start();
});
