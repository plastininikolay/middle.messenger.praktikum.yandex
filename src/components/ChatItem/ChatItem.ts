import Block from "../../utils/block";
import { ChatItemProps } from "./types";
import "./ChatItem.scss";
import { avatarUrl } from "../../mocks";
import {BASE_URL} from "../../constanst.ts";

export class ChatItem extends Block {
	constructor(props: ChatItemProps) {
		super(props);
	}
	override render(): string {
		const { chat, isActive } = this.props as ChatItemProps;
		const activeClass = isActive ? "active" : "";
		const baseUrl = `${BASE_URL}/resources`;
		const fullAvatarUrl = chat.avatar ? `${baseUrl}${chat.avatar}` : avatarUrl;

		return `
            <div class="chat-item ${activeClass}">
            <img src="${fullAvatarUrl}" alt="Аватар ${chat.title}"/>
            	<div class="chat-info">
            		<div class="author">${chat.title}</div>
            		<div class="text">${chat.last_message?.content ?? ''}</div>
            		<div class="unread-messages ${!chat.unread_count ? "hidden" : ""}">${chat.unread_count}</div>
				</div>		</div>
        `;
	}
}
