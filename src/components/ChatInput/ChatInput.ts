import Block from "../../utils/block";
import "./ChatInput.scss";
import { validateInput } from "../../utils/validation";
import {BaseInputType, ChatInputType} from "../../types";

export class ChatInput extends Block {
	constructor(props: ChatInputType) {
		super(props);
	}

	render(): string {
		const { validationMessage, value, name, placeholder } = this.props as ChatInputType;

		return `<div class="input ${validationMessage ? 'error-input' : ''}">
				${validationMessage ? `<div class="error-message">${validationMessage}</div>` : ""}
				<input type="text" name='${name}' placeholder="${placeholder}" value="${value || ""}"/>
		</div>`;
	}
	validate(): boolean {
		const inputElement = this._element?.querySelector("input");

		return validateInput({
			value: inputElement?.value,
			props: this.props as BaseInputType,
		});
	}
}
