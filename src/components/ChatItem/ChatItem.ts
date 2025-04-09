import Block from "../../utils/block.ts";
import {ChatItemProps} from "./types.ts";
import './ChatItem.scss'
import {avatarUrl} from "../../mocks.ts";

export class ChatItem extends Block {
	constructor(props: ChatItemProps) {
		super(props);
	}

	override render(): string {
		const {chat, isActive} = this.props as ChatItemProps
		const activeClass = isActive ? 'active' : '';
		return `
            <div class="chat-item ${activeClass}">
            <img src="${chat.avatar || avatarUrl}" alt="Аватар ${chat.author}"/>
            	<div class="chat-info">
            		<div class="author">${chat.author}</div>
            		<div class="text">${chat.text}</div>
            		<div class="unread-messages ${!chat.unreadMessages ? 'hidden' : ''}">${chat.unreadMessages}</div>
				</div>
           
			</div>
        `;
	}
}
