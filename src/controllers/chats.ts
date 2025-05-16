import store from "../utils/store";
import {ChatsRequest, CreateChatRequest} from "../api/types";
import chatsAPI from "../api/chats-api";

class ChatsController {
	public async getChats(data: ChatsRequest) {
		try {
			store.set("requestStatus.loading", true);
			store.set("requestStatus.error", null);

			const chatsResponse = await chatsAPI.getChats(data);
			if (chatsResponse?.reason) {
				throw new Error(chatsResponse.reason);
			}
			store.set("chats", chatsResponse);
			store.set("requestStatus.loading", false);

		} catch (error) {
			console.error("Request error:", error);

			if (error instanceof Error) {
				store.set("requestStatus.error", error.message);
			} else {
				store.set("requestStatus.error", "Произошла ошибка при изменении");
			}
		} finally {
			store.set("requestStatus.loading", false);
		}
	}
	public async createChat(data: CreateChatRequest) {
		try {
			store.set("requestStatus.loading", true);
			store.set("requestStatus.error", null);

			const chatResponse = await chatsAPI.createChat(data);
			if (chatResponse?.reason) {
				throw new Error(chatResponse.reason);
			}
			store.set("requestStatus.loading", false);

		} catch (error) {
			console.error("Request error:", error);

			if (error instanceof Error) {
				store.set("requestStatus.error", error.message);
			} else {
				store.set("requestStatus.error", "Произошла ошибка при изменении");
			}
		} finally {
			store.set("requestStatus.loading", false);
		}
	}
}

export default new ChatsController();
