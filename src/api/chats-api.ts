import { BaseAPI } from "./base-api";
import {
	ChatsRequest,
	ChatsResponse, CreateChatRequest, CreateChatResponse,
	ErrorResponse, GetTokenRequest,
} from "./types";

class ChatsAPI extends BaseAPI {
	constructor() {
		super("https://ya-praktikum.tech/api/v2/chats");
	}

	getChats(data: ChatsRequest): Promise<ChatsResponse> {
		return this.get<ChatsResponse>("/", {
			data,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	createChat(data: CreateChatRequest): Promise<CreateChatResponse | ErrorResponse> {
		return this.post<CreateChatResponse | ErrorResponse>("/", {
			data,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
	getToken(data: GetTokenRequest) : Promise<{token: string}> {
		return this.get(`/${data.id}`)
	}
}

export default new ChatsAPI();
