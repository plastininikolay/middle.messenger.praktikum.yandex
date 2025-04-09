import {Button} from "../../components/Button/Button.ts";
import {ButtonVariantEnum} from "../../components/Button/types.ts";
import Block from "../../utils/block.ts";
import '../../styles/errors.scss'
import {PAGE_NAMES} from "../../App.ts";

export class NotFoundPage extends Block {
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
				<h1>404</h1>
				<h2>Не туда попали</h2>
				{{{ Button }}}
			</main>`;
	}
}
