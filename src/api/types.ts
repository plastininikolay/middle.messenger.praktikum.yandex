export type LoginFormModel = {
	email: string;
	password: string;
};

export type SignupRequest = {
	first_name: string;
	second_name: string;
	login: string;
	email: string;
	password: string;
	phone: string;
};
export type SigninRequest = {
	login: string;
	password: string;
};

export type SignupResponse = {
	id: number;
} & Partial<ErrorResponse>;

export type UserResponse = {
	id: number;
	first_name: string;
	second_name: string;
	display_name: string;
	login: string;
	email: string;
	phone: string;
	avatar: string;
} & Partial<ErrorResponse>;

export type UserPasswordRequest = {
	oldPassword: string,
	newPassword: string
}

export type ErrorResponse = {
	reason: string;
};

export type ChatsRequest = {
	offset: number;
	limit: number;
	title?: number;
};

export type ChatsResponse = {
	id: number;
	title: string;
	avatar: string;
	unread_count: number;
	created_by: number;
	last_message: {
		user: {
			first_name: string;
			second_name: string;
			avatar: string;
			email: string;
			login: string;
			phone: string;
		};
		time: string;
		content: string;
	};
}[] & Partial<ErrorResponse>;

export type CreateChatRequest = {
	title: string;
};

export type CreateChatResponse = {
	id: number;
} & Partial<ErrorResponse>;

export type GetTokenRequest = {
	id: number
}

export type GetTokenResponse = {

}

export type DeleteChatRequest = {
	chatId: number;
};

export type DeleteChatResponse = {
	userId: number;
	result: {
		id: number;
		title: string;
		avatar: string;
		created_by: number;
	};
} & Partial<ErrorResponse>;

export type ChangeUserProfileRequest = {
	first_name: string;
	second_name: string;
	display_name: string;
	login: string;
	email: string;
	phone: string;
};
