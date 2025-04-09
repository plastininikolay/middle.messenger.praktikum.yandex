export interface ChatWindowProps {
	author: {
		name: string
		avatar?: string
	}
	messages: Array<ChatMessage>
}

export interface ChatMessage {
	sender: boolean,
	text: string,
	time: string
}
