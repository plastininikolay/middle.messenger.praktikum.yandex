import {BaseAPI} from "./base-api";
import {
	ChatsRequest,
	ChatsResponse,
	CreateChatRequest,
	CreateChatResponse,
	DeleteChatRequest, DeleteChatResponse,
	ErrorResponse,
} from "./types";
import {BASE_URL} from "../constanst.ts";

class ChatsAPI extends BaseAPI {
	constructor() {
		super(`${BASE_URL}/chats`);
	}
	getChats(data: ChatsRequest): Promise<ChatsResponse> {
		return this.get("/", {
			data,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
	createChat(data: CreateChatRequest): Promise<CreateChatResponse | ErrorResponse> {
		return this.post("/", {
			data,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
	deleteChat(data: DeleteChatRequest): Promise<DeleteChatResponse | ErrorResponse> {
		return this.delete("/", {
			data,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
	addUserToChat(userId: number, chatId: number): Promise<void | ErrorResponse> {
		return this.put('/users', {
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
		return this.delete('/users', {
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
