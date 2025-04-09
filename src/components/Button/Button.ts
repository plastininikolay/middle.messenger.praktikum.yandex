import {ButtonProps} from "./types.ts";
import Block from "../../utils/block.ts";
import './Button.scss'

export class Button extends Block {

	constructor(props: ButtonProps) {
		super(props);
	}

	render(): string {
		const {label, variant, isFull, isLink, url, color, isDisabled} = this.props as ButtonProps;

		const buttonClass = `button ${variant} ${isFull ? 'full' : ''} ${isDisabled ? 'disabled' : ''}`.trim();
		const colorStyle = color ? `color: ${color}` : ''
		return isLink ?
			`<a href="${url}" class="${buttonClass}" style="${colorStyle}">
			${label}
			</a>`
			:
			`<button 
				class="${buttonClass}" 
				style="${colorStyle}">
				${label}
			</button>`
	}
}
