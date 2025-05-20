import {ChatData} from "../../types.ts";
import {UserResponse} from "../../api/types.ts";

export interface ChatWindowProps {
	messages: Array<ChatMessage>
	chat: ChatData,
	user: UserResponse
}

export interface ChatMessage {
	user_id: number,
	chat_id: number,
	content: string,
	time: string
}
