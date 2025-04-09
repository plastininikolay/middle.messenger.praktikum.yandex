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
	validate(): boolean {
		const inputElement = this._element?.querySelector('input');
		return validateInput({value: inputElement?.value, props: this.props as FormGroupProps})
	}
}
