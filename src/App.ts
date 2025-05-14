import "./styles/index.scss";

import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { AuthPage } from "./pages/AuthPage/AuthPage";
import { ProfileEditPage } from "./pages/ProfileEditPage/ProfileEditPage";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import { RegistrationPage } from "./pages/RegistrationPage/RegistrationPage";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";
import { ChangePasswordPage } from "./pages/ChangePassword/ChangePassword";
import { mockChatsData, mockProfileData } from "./mocks";
import { ChatData, UserData } from "./types";
import { ChatsPage } from "./pages/ChatsPage/ChatsPage";
import Block from "./utils/block";

export enum PAGE_NAMES {
	notFound = "404",
	serverError = "500",
	authentication = "auth",
	chats = "chats",
	profile = "profile",
	profileEdit = "profile-edit",
	registration = "registration",
	chagePassword = "chage-password",
}

type PageProps = UserData | ChatData[] | Record<string, never>;
type PageConstructor<T extends Block = Block> = new (args: any) => T;
interface AppState {
	currentPage: PAGE_NAMES;
	user: UserData;
}

export default class App {
	private state: AppState;

	private readonly appElement: HTMLElement | null;

	private readonly pagesMap: { [key: string]: PageConstructor } = {
		[PAGE_NAMES.authentication]: AuthPage,
		[PAGE_NAMES.chats]: ChatsPage,
		[PAGE_NAMES.profile]: ProfilePage,
		[PAGE_NAMES.profileEdit]: ProfileEditPage,
		[PAGE_NAMES.registration]: RegistrationPage,
		[PAGE_NAMES.notFound]: NotFoundPage,
		[PAGE_NAMES.serverError]: ErrorPage,
		[PAGE_NAMES.chagePassword]: ChangePasswordPage,
	};

	constructor() {
		this.state = {
			currentPage: this.getCurrentPage(),
			user: mockProfileData,
		};
		this.appElement = document.getElementById("app");
	}

	private getCurrentPage(): PAGE_NAMES {
		const path = window.location.pathname;
		const page = String(path.split("/").pop()) as PAGE_NAMES;
		return Object.values(PAGE_NAMES).includes(page)
			? page
			: PAGE_NAMES.notFound;
	}

	render(): string {
		const PageClass =
			this.pagesMap[this.state.currentPage] ||
			this.pagesMap[PAGE_NAMES.notFound];
		const props = this.getPageProps(this.state.currentPage);
		const page = new PageClass(props);

		if (this.appElement) {
			this.appElement.innerHTML = "";
			this.appElement.appendChild(page.getContent());
		}

		return "";
	}

	private getPageProps(pageName: PAGE_NAMES): PageProps {
		switch (pageName) {
			case PAGE_NAMES.profile:
				return this.state.user;
			case PAGE_NAMES.profileEdit:
				return this.state.user;
			case PAGE_NAMES.chagePassword:
				return this.state.user;
			case PAGE_NAMES.chats:
				return mockChatsData;
			default:
				return {};
		}
	}
	changeUserData(newUserData: UserData) {
		this.state.user = newUserData;
	}
	changePassword(password: string) {
		this.state.user.password = password;
	}
}
