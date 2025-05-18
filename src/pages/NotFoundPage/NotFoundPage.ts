import { Button } from "../../components/Button/Button";
import { ButtonVariantEnum } from "../../components/Button/types";
import Block from "../../utils/block";
import "../../styles/errors.scss";
import { PAGE_NAMES } from "../../types";
import Router from "../../utils/router";

export class NotFoundPage extends Block {
	constructor() {
		const onChatClick = () => {
			Router.getInstance("#app").go(`/${PAGE_NAMES.chats}`);
		};	super({
			Button: new Button({
				isFull: false,
				isLink: true,
				url: PAGE_NAMES.chats,
				variant: ButtonVariantEnum.SECONDARY,
				label: "Назад к чатам",
				events: {
					click: onChatClick
				},
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
