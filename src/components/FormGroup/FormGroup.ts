import Block from "../../utils/block.ts";
import {FormGroupProps} from "./types.ts";
import './FormGroup.scss'
import {validateInput} from "../../utils/validation.ts";

export class FormGroup extends Block {

	constructor(props: FormGroupProps) {
		super(props);
	}

	render(): string {
		const {name, type, labelText, validationMessage, required, value} = this.props as FormGroupProps;

		return `
            <div class="form-group">
                <label for='${name}'>${labelText}</label>
                <input type='${type}' id='${name}' name='${name}' required=${required ? 'true' : 'false'} value="${String(value || '')}">
                ${validationMessage ? `<div class="error-message">${validationMessage}</div>` : ''}
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
