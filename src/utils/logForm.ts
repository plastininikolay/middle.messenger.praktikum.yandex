import {FormGroup} from "../components/FormGroup/FormGroup.ts";
import {FormGroupProps} from "../components/FormGroup/types.ts";

export const getFormData = (formGroups: FormGroup[]) => {
	return formGroups.reduce((prevVal, val) => {
		const props = val.getProps() as FormGroupProps
		return {...prevVal, [props.name]: props.value}
	}, {})
}
