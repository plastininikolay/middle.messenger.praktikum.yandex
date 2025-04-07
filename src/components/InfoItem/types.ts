import {BaseInputType} from "../../types.ts";

export interface InfoItemProps extends BaseInputType {
	name: string;
	edit?: boolean;
	labelText: string
}
