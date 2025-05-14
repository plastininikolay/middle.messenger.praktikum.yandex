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
	author: string;
	text: string;
	avatar?: string;
	unreadMessages: number;
}

export interface BaseInputType {
	name: string;
	required?: boolean;
	validationMessage?: string;
	value?: string;
	typeOfValidation?: TYPES_VALIDATION;
	eventsForInput?: Record<string, (e: Event) => void>;
}

export type Indexed<T = unknown> = {
	[key in string]: T;
};

export type StringIndexed = Record<string, any>;
