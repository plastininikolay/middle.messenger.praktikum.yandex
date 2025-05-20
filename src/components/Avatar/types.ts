export interface AvatarProps {
	avatarUrl?: string;
	alt?: string;
	size?: 'small' | 'medium' | 'large';
	editable?: boolean;
	events?: Record<string, (e: Event) => void>;
}
