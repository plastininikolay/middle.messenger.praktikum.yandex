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
	componentDidMount() {
		const inputElement = this._element?.querySelector('input');

		if (inputElement) {
				inputElement.addEventListener('blur', () => {
					this.validate();
				}, {once: true});
		} else {
			console.error(`Element with id ${this.props.name} not found.`);
		}
	}
	validate(): boolean {
		return validateInput({element: this._element, props: this.props, setProps: this.setProps})
	}
}
