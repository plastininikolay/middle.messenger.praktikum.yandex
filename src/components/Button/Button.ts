import { ButtonProps } from "./types";
import Block from "../../utils/block";
import "./Button.scss";

export class Button extends Block {
	constructor(props: ButtonProps) {
		super(props);
	}

	render(): string {
		const { label, variant, isFull, isLink, url, color, isDisabled } = this
			.props as ButtonProps;

		const buttonClass =
			`button ${variant} ${isFull ? "full" : ""} ${isDisabled ? "disabled" : ""}`.trim();
		const colorStyle = color ? `color: ${color}` : "";
		
		return `<button 
			class="${buttonClass}" 
			style="${colorStyle}"
			${isLink && url ? `data-route="${url}"` : ""}
			${isDisabled ? "disabled" : ""}>
			${label}
		</button>`;
	}
}