export interface AvatarProps {
	size?: 'small' | 'medium' | 'large';
	editable?: boolean;
	events?: Record<string, (e: Event) => void>;
}
