import store from "../utils/store";
import {ChatsRequest, CreateChatRequest} from "../api/types";
import chatsAPI from "../api/chats-api";
import {messagesService} from "../utils/messagesService.ts";

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
	public async addUserToChat(userId: number, chatId: number) {
		try {
			store.set("requestStatus.loading", true);
			store.set("requestStatus.error", null);

			const response = await chatsAPI.addUserToChat(userId, chatId);

			if (response?.reason) {
				throw new Error(response.reason);
			}

			store.set("requestStatus.loading", false);
			return response;

		} catch (error) {
			console.error("Request error:", error);

			if (error instanceof Error) {
				store.set("requestStatus.error", error.message);
			} else {
				store.set("requestStatus.error", "Произошла ошибка при добавлении пользователя");
			}
			throw error;
		} finally {
			store.set("requestStatus.loading", false);
		}
	}
	public async removeUserFromChat(userId: number, chatId: number) {
		try {
			store.set("requestStatus.loading", true);
			store.set("requestStatus.error", null);

			const response = await chatsAPI.removeUserFromChat(userId, chatId);

			if (response?.reason) {
				throw new Error(response.reason);
			}

			store.set("requestStatus.loading", false);
			return response;

		} catch (error) {
			console.error("Request error:", error);

			if (error instanceof Error) {
				store.set("requestStatus.error", error.message);
			} else {
				store.set("requestStatus.error", "Произошла ошибка при удалении пользователя");
			}
			throw error;
		} finally {
			store.set("requestStatus.loading", false);
		}
	}
	async connectToChat(chatId: number) {
		const user = store.getState().user;
		if (!user) {
			throw new Error('Пользователь не авторизован');
		}

		try {
			return await messagesService.connect(chatId, user.id);
		} catch (error) {
			console.error('Ошибка при подключении к чату:', error);
			throw error;
		}
	}

	sendMessage(content: string) {
		try {
			return messagesService.sendMessage(content);
		} catch (error) {
			console.error('Ошибка при отправке сообщения:', error);
			throw error;
		}
	}
	loadMoreMessages() {
		try {
			return messagesService.loadMoreMessages();
		} catch (error) {
			console.error('Ошибка при загрузке старых сообщений:', error);
			throw error;
		}
	}
	closeConnection() {
		messagesService.close();
	}
}

export default new ChatsController();
