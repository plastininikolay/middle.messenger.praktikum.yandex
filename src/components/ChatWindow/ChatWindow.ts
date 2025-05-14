import Block from "../../utils/block";
import { Button } from "../Button/Button";
import { ButtonVariantEnum } from "../Button/types";
import { ChatMessage, ChatWindowProps } from "./types";
import "./ChatWindow.scss";
import { avatarUrl } from "../../mocks";
import { ChatInput } from "../ChatInput/ChatInput";
import { BaseInputType, TYPES_VALIDATION } from "../../types";
import { getFormData } from "../../utils/logForm";
import { validateInput } from "../../utils/validation";

export class ChatWindow extends Block {
	constructor(props: ChatWindowProps) {
		const ChatInputComponent = new ChatInput({
			name: "message",
			typeOfValidation: TYPES_VALIDATION.message,
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
		const validateAll = () => {
			ChatInputComponent.validate();
		};
		const onClickButton = () => {
			validateAll();
			console.log(getFormData([ChatInputComponent]));
		};
		super({
			...props,
			SendButton: new Button({
				label: "Отправить",
				variant: ButtonVariantEnum.PRIMARY,
				events: {
					click: onClickButton,
				},
			}),
			ChatInput: ChatInputComponent,
		});
	}

	override render(): string {
		const messageElements = this.props.messages
			.map(
				(msg: ChatMessage) => `
            <div class="message ${msg.sender ? "sender" : "receiver"}">
				${msg.text}
				<span>${msg.time}</span>
			</div>
        `,
			)
			.join("");
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
