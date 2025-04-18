import Block from "../../utils/block.ts";
import './ChatInput.scss'
import {validateInput} from "../../utils/validation.ts";
import {BaseInputType} from "../../types.ts";

export class ChatInput extends Block {

	constructor(props: BaseInputType) {
		super(props);
	}

	render(): string {
		const {validationMessage, value} = this.props as BaseInputType;

		return `<div class="input">
				${validationMessage ? `<div class="error-message">${validationMessage}</div>` : ''}
				<input type="text" placeholder="Введите сообщение..." value="${value || ''}"/>
		</div>`;
	}
	validate(): boolean {
		const inputElement = this._element?.querySelector('input');

		return validateInput({value: inputElement?.value, props: this.props as BaseInputType})
	}
}
