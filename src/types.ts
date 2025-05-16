import {ChatsResponse, UserResponse} from "./api/types";

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

export enum TYPES_VALIDATION {
	first_name = "first_name",
	second_name = "second_name",
	login = "login",
	email = "email",
	password = "password",
	phone = "phone",
	message = "message",
}

export interface UserData {
	avatar?: string;
	username?: string;
	email?: string;
	login?: string;
	password?: string;
	firstName?: string;
	lastName?: string;
	chatName?: string;
	phone?: string;
}

export interface ChatData {
	avatar: string | null;
	created_by: number;
	id: number;
	last_message: string | null;
	title: string;
	unread_count: number;
}

export interface BaseInputType {
	name: string;
	required?: boolean;
	validationMessage?: string;
	value?: string;
	typeOfValidation?: TYPES_VALIDATION;
	eventsForInput?: Record<string, (e: Event) => void>;
}

export interface ChatInputType extends BaseInputType{
	placeholder: string;
}

export type Indexed<T = unknown> = {
	[key in string]: T;
};

export type StringIndexed = Record<string, any>;

export type AppState = {
	requestStatus?: {
		loading: boolean;
		error?: string;
	}
	isLoggedIn: boolean;
	user?: UserResponse;
	chats?: ChatsResponse;
};
