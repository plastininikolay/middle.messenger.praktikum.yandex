import { ChatData } from "../../types";

export interface ChatItemProps {
	chat: ChatData;
	isActive: boolean;
	events?: Record<string, (e: Event) => void>
}
