import Block from "../../utils/block.ts";
import {Button} from "../Button/Button.ts";
import {ButtonVariantEnum} from "../Button/types.ts";
import {ChatMessage, ChatWindowProps} from "./types.ts";
import './ChatWindow.scss';
import {avatarUrl} from "../../mocks.ts";
import {ChatInput} from "../ChatInput/ChatInput.ts";
import {TYPES_VALIDATION} from "../../types.ts";
import {getFormData} from "../../utils/logForm.ts";

export class ChatWindow extends Block {
	constructor(props: ChatWindowProps) {
		const ChatInputComponent = new ChatInput({name: 'message', typeOfValidation: TYPES_VALIDATION.message})
		const validateAll = () => {
			ChatInputComponent.validate();
		}
		const onClickButton = () => {
			validateAll();
			console.log(getFormData([
				ChatInputComponent,
			]))
		}
		super({
			...props,
			SendButton: new Button({
				label: 'Отправить',
				variant: ButtonVariantEnum.PRIMARY,
				onClick: onClickButton,
			}),
			ChatInput: ChatInputComponent
		});

	}

	override render(): string {
		const messageElements = this.props.messages.map((msg: ChatMessage) => `
            <div class="message ${msg.sender ? 'sender' : 'receiver'}">
				${msg.text}
				<span>${msg.time}</span>
			</div>
        `).join('');
		return `
            <div class="chat-window">
				<div class="chat-top">
					<div class="author">
						<img src="${this.props.author.avatar || avatarUrl}" alt="Аватар ${this.props.author}"/>
						<h3>${this.props.author.name}</h3>
					</div>
					<div class="chat-settings"></div>
				</div>
				<div class="messages">${messageElements}</div>
				<label class="input-area">
					{{{ ChatInput }}}
					{{{ SendButton }}}
				</label>
            </div>
        `;
	}
}
