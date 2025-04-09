import Block from "../../utils/block.ts";
import {Button} from "../../components/Button/Button.ts";
import {ButtonVariantEnum} from "../../components/Button/types.ts";
import '../../styles/errors.scss'
import {PAGE_NAMES} from "../../App.ts";

export class ErrorPage extends Block {
	constructor() {
		super({
			Button: new Button({
				isFull: false,
				isLink: true,
				url: PAGE_NAMES.chats,
				variant: ButtonVariantEnum.SECONDARY,
				label: 'Назад к чатам'
			}),
		});
	}
	override render() {
		return `
			<main class="error-container">
    			<h1>500</h1>
    			<h2>Мы уже фиксим</h2>
    			{{{ Button }}}
			</main>`;
	}
}
