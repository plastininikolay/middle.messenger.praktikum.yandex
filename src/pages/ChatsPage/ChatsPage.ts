import Block from "../../utils/block";
import {ChatItem} from "../../components/ChatItem/ChatItem";
import {ChatWindow} from "../../components/ChatWindow/ChatWindow";
import "../../styles/chats.scss";
import {AppState, BaseInputType, ChatData} from "../../types";
import {mockMessages} from "../../mocks";
import connect from "../../utils/connect";
import ChatsController from '../../controllers/chats';
import {Button} from "../../components/Button/Button.ts";
import {ButtonVariantEnum} from "../../components/Button/types.ts";
import {ChatInput} from "../../components/ChatInput/ChatInput.ts";
import {validateInput} from "../../utils/validation.ts";

class ChatsPageBase extends Block {
	constructor(props: Record<string, any>) {
		const chatInput = new ChatInput({
			name: 'create_chat',
			placeholder: 'Введите название нового чата',
			required: true,
			eventsForInput: {
				blur: (e) => {
					const element = e.currentTarget as HTMLInputElement;
					validateInput({
						value: element?.value,
						props: this.children.CreateChatInput.getProps() as BaseInputType,
					});
				},
			},
		})
		void ChatsController.getChats({
			offset: 0,
			limit: 10,
		})
		const onChangeActiveChat = (chat: ChatData) => {
			this.setProps({activeChatId: chat.id});
		}
		const ChatList = props.chats?.map(
			(chat: ChatData, index: number) =>
				new ChatItem({
					chat: this.props.chats[index],
					isActive: chat.id === props.activeChatId,
					events: {
						click: () => onChangeActiveChat(chat)
					}
				}),
		);

		const onClickCreateChat = async () => {
			const inputVal = chatInput.getProps().value
			await ChatsController.createChat({title: inputVal})
			await ChatsController.getChats({
				offset: 0,
				limit: 10,
			})
		}
		super({
			...props,
			ChatList: ChatList,
			ChatWindow: new ChatWindow({
				messages: mockMessages,
				chat: props.chats?.find((chat: ChatData) => chat.id === props.activeChatId)
			}),
			CreateChatInput: chatInput,
			CreateChatButton: new Button({
				isFull: false,
				variant: ButtonVariantEnum.PRIMARY,
				label: "Добавить чат",
				events: {
					click: onClickCreateChat
				},
			})
		});
	}

	override render(): string {
		return `
            <main class="chats-container">
                <div class="chat-list">
                    <h2>Список чатов</h2>
                    <div class="chat-items">
                        ${this.props.requestStatus.loading || !this.props.chats ?
			'<div class="loader"></div>' :
			'{{{ ChatList }}}'
		}
                    </div>
                     <div class="create-chat">
                            {{{ CreateChatInput }}}
                            {{{ CreateChatButton }}}
                   </div>
                </div>
                   ${this.props.requestStatus.loading || !this.props.chats ?
			'<div class="chat-loader"></div>' :
			"{{{ ChatWindow }}}"}
            </main>
        `;
	}
}

const mapStateToProps = (state: Partial<AppState>) => {
	return {
		chats: state.chats,
		requestStatus: state.requestStatus
	};
};

export const ChatsPage = connect(mapStateToProps)(ChatsPageBase);
