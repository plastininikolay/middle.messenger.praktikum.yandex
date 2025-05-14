import Block from "../../utils/block";
import { ChatItemProps } from "./types";
import "./ChatItem.scss";
import { avatarUrl } from "../../mocks";

export class ChatItem extends Block {
	constructor(props: ChatItemProps) {
		super(props);
	}

	override render(): string {
		const { chat, isActive } = this.props as ChatItemProps;
		const activeClass = isActive ? "active" : "";
		return `
            <div class="chat-item ${activeClass}">
            <img src="${chat.avatar || avatarUrl}" alt="Аватар ${chat.author}"/>
            	<div class="chat-info">
            		<div class="author">${chat.author}</div>
            		<div class="text">${chat.text}</div>
            		<div class="unread-messages ${!chat.unreadMessages ? "hidden" : ""}">${chat.unreadMessages}</div>
				</div>

			</div>
        `;
	}
}
