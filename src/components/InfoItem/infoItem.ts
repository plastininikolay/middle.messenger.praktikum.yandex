import Block from "../../utils/block";
import { InfoItemProps } from "./types";
import "./infoItem.scss";
import { validateInput } from "../../utils/validation";

export class InfoItem extends Block {
	constructor(props: InfoItemProps) {
		super(props);
	}
	render(): string {
		const { name, value, edit, validationMessage, labelText } = this
			.props as InfoItemProps;
		return `
				<div class="info-item">
    				<span class="info-label">${labelText}:</span>
    				${
							edit
								? `<input class="info-value" type='text' name='${name}' placeholder='Введите данные...' value="${value}">
						${validationMessage ? `<div class="error-message">${validationMessage}</div>` : ""}
						`
								: `<span class="info-value">${value}</span>`
						}
				</div>`;
	}
	validate(): boolean {
		const inputElement = this._element?.querySelector("input");
		return validateInput({
			value: inputElement?.value,
			props: this.props as InfoItemProps,
		});
	}
	
	isValid(): boolean {
		return !(this.props as InfoItemProps).validationMessage;
	}
}
