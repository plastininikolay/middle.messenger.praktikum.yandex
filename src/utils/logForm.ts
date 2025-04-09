import {FormGroup} from "../components/FormGroup/FormGroup.ts";
import {BaseInputType} from "../types.ts";

export const getFormData = (formGroups: FormGroup[]) => {
	return formGroups.reduce((prevVal, val) => {
		const props = val.getProps() as BaseInputType
		return {...prevVal, [props.name]: props.value}
	}, {})
}
