import Block from "../../utils/block.ts";
import {ChatItem} from "../../components/ChatItem/ChatItem.ts";
import {ChatWindow} from "../../components/ChatWindow/ChatWindow.ts";
import '../../styles/chats.scss';
import {ChatData} from "../../types.ts";
import {mockMessages} from "../../mocks.ts";

export class ChatsPage extends Block {
	constructor(chats: Array<ChatData>) {
		const ChatList = chats.map((chat, index) => new ChatItem({chat: chat, isActive: index === 0}))
		super({
			ChatList: ChatList,
			ChatWindow: new ChatWindow({messages: mockMessages, author: {name: chats[0].author, avatar: chats[0].avatar}}),
		});
	}

	override render(): string {

		return `
            <main class="chats-container">
                <div class="chat-list">
                    <h2>Список чатов</h2>
                    <div class="chat-items">
                        {{{ ChatList }}}
                    </div>
                </div>
                   {{{ ChatWindow }}}
            </main>
        `;
	}
}
