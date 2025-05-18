import {HTTPTransport} from "./httpTransport.ts";
import store from "./store.ts";

class MessagesService {
	private socket: WebSocket | null = null;
	private pingInterval: number | null = null;
	private http = new HTTPTransport();
	private chatId: number | null = null;async connect(chatId: number, userId: number) {
		this.chatId = chatId;
		this.close();	try {
			const response = await this.http.post(`https://ya-praktikum.tech/api/v2/chats/token/${chatId}`);		let data;
			try {
				data = JSON.parse(response.responseText);
			} catch (e) {
				throw new Error('Некорректный формат ответа при получении токена');
			}		const token = data.token;		if (!token) {
				throw new Error('Не удалось получить токен для чата');
			}
			this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
			this.socket.addEventListener('open', () => {
				console.log('Соединение установлено');
				store.set('messages', []);
				this.getMessages();
				this.pingInterval = setInterval(() => {
					this.ping();
				}, 30000);
			});		this.socket.addEventListener('close', (event) => {
				if (this.pingInterval) {
					clearInterval(this.pingInterval);
					this.pingInterval = null;
				}			if (event.wasClean) {
					console.log('Соединение закрыто чисто');
				} else {
					console.log('Обрыв соединения');
				}
				console.log(`Код: ${event.code} | Причина: ${event.reason}`);
			});		this.socket.addEventListener('message', (event) => {
				try {
					const data = JSON.parse(event.data);				if (Array.isArray(data)) {
						console.log('Получена история сообщений:', data);					// Сортируем сообщения от старых к новым
						const sortedMessages = [...data].sort((a, b) =>
							new Date(a.time).getTime() - new Date(b.time).getTime()
						);
						store.set('messages', sortedMessages);
					} else if (data.type === 'message') {
						console.log('Получено новое сообщение:', data);					// Добавляем новое сообщение в стор
						const messages = store.getState().messages || [];
						store.set('messages', [...messages, data]);
					}
				} catch (e) {
					console.error('Ошибка при обработке сообщения:', e);
				}
			});		this.socket.addEventListener('error', (event) => {
				console.error('Ошибка', event);
			});		return this.socket;
		} catch (error) {
			console.error('Ошибка при подключении к чату:', error);
			throw error;
		}
	}
	getMessages(offset = 0) {
		if (!this.socket) {
			throw new Error('Socket не подключен');
		}	this.socket.send(JSON.stringify({
			content: offset.toString(),
			type: 'get old',
		}));
	}
	loadMoreMessages() {
		const messages = store.getState().messages || [];
		this.getMessages(messages.length);
	}sendMessage(content: string) {
		if (!this.socket) {
			throw new Error('Socket не подключен');
		}	this.socket.send(JSON.stringify({
			content,
			type: 'message',
		}));
	}
	ping() {
		if (!this.socket) {
			return;
		}	this.socket.send(JSON.stringify({
			type: 'ping',
		}));
	}close() {
		if (this.socket) {
			this.socket.close();
			this.socket = null;
		}	if (this.pingInterval) {
			clearInterval(this.pingInterval);
			this.pingInterval = null;
		}
		this.chatId = null;
	}
	getCurrentChatId() {
		return this.chatId;
	}
}

export const messagesService = new MessagesService();
