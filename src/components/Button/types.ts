export enum ButtonVariantEnum  {
	PRIMARY = 'primary',
	SECONDARY = 'secondary',
	UNDERLINE = 'underline'
}

export interface ButtonProps {
	label: string;
	variant: ButtonVariantEnum;
	isDisabled?: boolean;
	isFull?: boolean;
	isLink?: boolean;
	url?: string;
	color?: string;
	events?: Record<string, (e: Event) => void>
}
