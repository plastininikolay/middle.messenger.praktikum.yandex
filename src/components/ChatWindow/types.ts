import {ChatData} from "../../types.ts";

export interface ChatWindowProps {
	messages: Array<ChatMessage>
	chat: ChatData
}

export interface ChatMessage {
	sender: boolean,
	text: string,
	time: string
}
