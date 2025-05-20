import Block, {BlockProps} from "../../utils/block";
import {ChatItem} from "../../components/ChatItem/ChatItem";
import {ChatWindow} from "../../components/ChatWindow/ChatWindow";
import "../../styles/chats.scss";
import {AppState, BaseInputType, ChatData, PAGE_NAMES} from "../../types";
import connect from "../../utils/connect";
import ChatsController from '../../controllers/chats';
import {Button} from "../../components/Button/Button.ts";
import {ButtonVariantEnum} from "../../components/Button/types.ts";
import {ChatInput} from "../../components/ChatInput/ChatInput.ts";
import {validateInput} from "../../utils/validation.ts";
import Router from "../../utils/router.ts";



class ChatsPageBase extends Block {
	constructor(props: Record<string, any>) {
		void ChatsController.getChats({
			offset: 0,
			limit: 10,
		})
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
		const onClickToProfileButton = () => {
			Router.getInstance("#app").go(`/${PAGE_NAMES.profile}`);
		}
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
			CreateChatInput: chatInput,
			CreateChatButton: new Button({
				isFull: false,
				variant: ButtonVariantEnum.PRIMARY,
				label: "Добавить чат",
				events: {
					click: onClickCreateChat
				},
			}),
			ToSettingsButton: new Button({
				label: "Профиль",
				variant: ButtonVariantEnum.SECONDARY,
				events: {
					click: onClickToProfileButton,
				},
			}),
		});
	}
	override componentDidUpdate() {
		const ChatWindowComponent = new ChatWindow({
			chat: this.props.chats?.find((chat: ChatData) => chat.id === this.props.activeChatId)
		})
		const onChangeActiveChat = async (chat: ChatData, setProps:(nextProps: BlockProps) => void) => {
			setProps({activeChatId: chat.id});
			try {
				await ChatsController.connectToChat(chat.id)
			} catch (error) {
				console.error('Ошибка при подключении к чату:', error);
			}
		}
		const ChatList = this.props.chats?.map(
			(chat: ChatData,) =>
				new ChatItem({
					chat: chat,
					isActive: chat.id === this.props.activeChatId,
					events: {
						click: () => onChangeActiveChat(chat, this.setProps)
					}
				}),
		);
		this.lists = {...this.lists, ChatList}
		this.children = {...this.children, ChatWindowComponent}
		return true
	}
	override componentWillUnmount() {
		ChatsController.closeConnection();
	}
	override render(): string {
		return `
            <main class="chats-container">
                <div class="chat-list">
                    <div class="up-block">
                    	<h4>Список чатов</h4>
                    	{{{ ToSettingsButton }}}
					</div>
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
			"{{{ ChatWindowComponent }}}"}
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
