import Block from "../../utils/block";
import {Button} from "../Button/Button";
import {ButtonVariantEnum} from "../Button/types";
import {ChatMessage, ChatWindowProps} from "./types";
import "./ChatWindow.scss";
import {ChatInput} from "../ChatInput/ChatInput";
import {AppState, BaseInputType, TYPES_VALIDATION} from "../../types";
import {validateInput} from "../../utils/validation";
import connect from "../../utils/connect.ts";
import ChatsController from "../../controllers/chats.ts";

export class ChatWindowBase extends Block {
	constructor(props: ChatWindowProps) {
		const ChatInputComponent = new ChatInput({
			name: "message",
			typeOfValidation: TYPES_VALIDATION.message,
			placeholder: "Введите сообщение...",
			eventsForInput: {
				blur: (e) => {
					const element = e.currentTarget as HTMLInputElement;
					validateInput({
						value: element?.value,
						props: this.children.ChatInput.getProps() as BaseInputType,
					});
				},
			},
		});
		const onClickSendButton = () => {
			if (ChatInputComponent.validate()) {
				const messageText = ChatInputComponent.getProps().value;

				if (messageText && messageText.trim()) {
					// Отправляем сообщение через контроллер
					ChatsController.sendMessage(messageText);

					// Очищаем поле ввода после отправки
					ChatInputComponent.setProps({value: ""});
				}
			}
		};

		super({
			...props,
			SendButton: new Button({
				label: "Отправить",
				variant: ButtonVariantEnum.PRIMARY,
				events: {
					click: onClickSendButton,
				},
			}),
			ChatInput: ChatInputComponent,
		});
	}

	override componentDidUpdate(): boolean {
		const UserIdInputComponent = new ChatInput({
			name: "user_id",
			placeholder: "ID пользователя",
			isErrorBottom: true,
			required: true,
			eventsForInput: {
				blur: (e) => {
					const element = e.currentTarget as HTMLInputElement;
					validateInput({
						value: element?.value,
						props: this.children.UserIdInput.getProps() as BaseInputType,
					});
				},
			},
		});
		const onClickAddUserButton = async () => {
			if (UserIdInputComponent.validate()) {
				const userId = parseInt(UserIdInputComponent.getProps().value, 10);
				if (!isNaN(userId) && this.props.chat?.id) {
					try {
						await ChatsController.addUserToChat(userId, this.props.chat.id);
						// Очищаем поле ввода после успешного добавления
						UserIdInputComponent.setProps({value: ""});
						// Показываем сообщение об успехе
						alert(`Пользователь с ID ${userId} успешно добавлен в чат`);
					} catch (error) {
						console.error('Ошибка при добавлении пользователя:', error);
						alert('Не удалось добавить пользователя. Проверьте ID и попробуйте снова.');
					}
				} else {
					alert('Введите корректный ID пользователя');
				}
			}
		};
		const onClickRemoveUserButton = async () => {
			if (UserIdInputComponent.validate()) {
				const userId = parseInt(UserIdInputComponent.getProps().value, 10);
				if (!isNaN(userId) && this.props.chat?.id) {
					try {
						await ChatsController.removeUserFromChat(userId, this.props.chat.id);
						UserIdInputComponent.setProps({value: ""});
						alert(`Пользователь с ID ${userId} успешно удален из чата`);
					} catch (error) {
						console.error('Ошибка при удалении пользователя:', error);
						alert('Не удалось удалить пользователя. Проверьте ID и попробуйте снова.');
					}
				} else {
					alert('Введите корректный ID пользователя');
				}
			}
		};
		this.children = {
			...this.children,
			UserIdInput: UserIdInputComponent,
			AddUserButton: new Button({
				label: "Добавить пользователя",
				variant: ButtonVariantEnum.PRIMARY,
				events: {
					click: onClickAddUserButton,
				},
			}),
			RemoveUserButton: new Button({
				label: "Удалить пользователя",
				variant: ButtonVariantEnum.DELETE,
				events: {
					click: onClickRemoveUserButton,
				},
			}),
		}
		return true;
	}

	override render(): string {
		const formatTime = (timeStr: string) => {
			try {
				const date = new Date(timeStr);
				return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
			} catch (e) {
				return timeStr;
			}
		};
		const messageElements = this.props?.messages ? this.props.messages
			.map(
				(msg: ChatMessage) => `
            <div class="message ${msg.user_id !== this.props.user?.id ? "sender" : "receiver"}">
				${msg.content}
				<span>${formatTime(msg.time)}</span>
			</div>
        `,
			)
			.join("") : 'Нет сообщений';
		return `
            <div class="chat-window">
            <div class="chat-top">
							<div class="chat-settings">
							{{{ UserIdInput }}}
							{{{ AddUserButton }}}
							{{{ RemoveUserButton }}}
							</div>
						</div>
						<div class="messages">
				${this.props.chat ?
			`${messageElements}`
			: '<div class="no-chat">Выберите чат</div>'}
				</div>
						<label class="input-area">
							{{{ ChatInput }}}
							{{{ SendButton }}}
						</label>
            </div>
        `;
	}
}


const mapStateToProps = (state: Partial<AppState>) => {
	return {
		user: state.user,
		messages: state.messages
	};
};

export const ChatWindow = connect(mapStateToProps)(ChatWindowBase);
