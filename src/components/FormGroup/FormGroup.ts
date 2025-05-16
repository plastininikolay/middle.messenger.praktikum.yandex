import Block from "../../utils/block";
import { FormGroupProps } from "./types";
import "./FormGroup.scss";
import { validateInput } from "../../utils/validation";

export class FormGroup extends Block {
	constructor(props: FormGroupProps) {
		super(props);
	}

	render(): string {
		const { name, type, labelText, validationMessage, required, value } = this
			.props as FormGroupProps;

		return `
            <div class="form-group">
                <label for='${name}'>${labelText}</label>
                <input type='${type}' id='${name}' name='${name}' required=${required ? "true" : "false"} value="${String(value || "")}">
                ${validationMessage ? `<div class="error-message">${validationMessage}</div>` : ""}
            </div>`;
	}
	validate(): boolean {
		const inputElement = this._element?.querySelector("input");
		return validateInput({
			value: inputElement?.value,
			props: this.props as FormGroupProps,
		});
	}
	
	isValid(): boolean {
		return !(this.props as FormGroupProps).validationMessage;
	}
}
