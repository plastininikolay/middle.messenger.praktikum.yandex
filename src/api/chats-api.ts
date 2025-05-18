import {BaseAPI} from "./base-api";
import {ChatsRequest, ChatsResponse, CreateChatRequest, CreateChatResponse, ErrorResponse,} from "./types";

class ChatsAPI extends BaseAPI {
	constructor() {
		super("https://ya-praktikum.tech/api/v2/chats");
	}getChats(data: ChatsRequest): Promise<ChatsResponse> {
		return this.get<ChatsResponse>("/", {
			data,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}createChat(data: CreateChatRequest): Promise<CreateChatResponse | ErrorResponse> {
		return this.post<CreateChatResponse | ErrorResponse>("/", {
			data,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
	addUserToChat(userId: number, chatId: number): Promise<void | ErrorResponse> {
		return this.put<void | ErrorResponse>('/users', {
			data: {
				users: [userId],
				chatId: chatId
			},
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
	removeUserFromChat(userId: number, chatId: number): Promise<void | ErrorResponse> {
		return this.delete<void | ErrorResponse>('/users', {
			data: {
				users: [userId],
				chatId: chatId
			},
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
}

export default new ChatsAPI();
