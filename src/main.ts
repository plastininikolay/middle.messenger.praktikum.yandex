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

store.on(StoreEvents.Updated, () => {
	console.log("Store updated, new state:", store.getState());
});

document.addEventListener("DOMContentLoaded", async () => {
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
