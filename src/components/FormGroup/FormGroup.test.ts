import { FormGroup } from './FormGroup.ts';
import { TYPES_VALIDATION } from '../../types.ts';

describe('Компонент FormGroup', () => {
  let formGroup: FormGroup;

  beforeEach(() => {
    formGroup = new FormGroup({
      name: 'test-input',
      type: 'text',
      labelText: 'Test Input',
      required: true
    });
  });

  it('должен корректно рендериться с базовыми пропсами', () => {
    const element = formGroup.getContent();
    expect(element).toBeTruthy();
    expect(element.className).toBe('form-group');

    const label = element.querySelector('label');
    expect(label).toBeTruthy();
    expect(label?.textContent).toBe('Test Input');
    expect(label?.getAttribute('for')).toBe('test-input');

    const input = element.querySelector('input');
    expect(input).toBeTruthy();
    expect(input?.getAttribute('type')).toBe('text');
    expect(input?.getAttribute('name')).toBe('test-input');
    expect(input?.getAttribute('id')).toBe('test-input');
    expect(input?.getAttribute('required')).toBe('true');
  });

  it('должен отображать сообщение валидации', () => {
    formGroup.setProps({
      validationMessage: 'This field is required'
    });

    const element = formGroup.getContent();
    const errorMessage = element.querySelector('.error-message');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage?.textContent).toBe('This field is required');
  });

  it('не должен отображать сообщение валидации когда оно отсутствует', () => {
    const element = formGroup.getContent();
    const errorMessage = element.querySelector('.error-message');
    expect(errorMessage).toBeFalsy();
  });

  it('должен корректно отображать значение поля', () => {
    formGroup.setProps({
      value: 'test value'
    });

    const element = formGroup.getContent();
    const input = element.querySelector('input');
    expect(input?.value).toBe('test value');
  });

  it('должен обрабатывать события инпута', () => {
    const mockChange = jest.fn();
    formGroup.setProps({
      eventsForInput: {
        change: mockChange
      }
    });

    const element = formGroup.getContent();
    const input = element.querySelector('input');
    input?.dispatchEvent(new Event('change'));

    expect(mockChange).toHaveBeenCalled();
  });

  it('должен валидировать инпут', () => {
    formGroup.setProps({
      required: true,
      value: ''
    });
    expect(formGroup.validate()).toBe(false);

    formGroup.setProps({
      value: 'test value'
    });
    expect(formGroup.validate()).toBe(true);
  });

  it('должен проверять валидность формы', () => {
    formGroup.setProps({
      validationMessage: 'Error'
    });
    expect(formGroup.isValid()).toBe(false);

    formGroup.setProps({
      validationMessage: undefined
    });
    expect(formGroup.isValid()).toBe(true);
  });

  it('должен поддерживать разные типы инпутов', () => {
    const types = ['text', 'email', 'password', 'tel'];

    types.forEach(type => {
      formGroup.setProps({ type });
      const element = formGroup.getContent();
      const input = element.querySelector('input');
      expect(input?.getAttribute('type')).toBe(type);
    });
  });

  it('должен поддерживать разные типы валидации', () => {
    const validationTypes = [
      TYPES_VALIDATION.first_name,
      TYPES_VALIDATION.second_name,
      TYPES_VALIDATION.login,
      TYPES_VALIDATION.email,
      TYPES_VALIDATION.password,
      TYPES_VALIDATION.phone
    ];

    validationTypes.forEach(typeOfValidation => {
      formGroup.setProps({ typeOfValidation });
      expect(formGroup.validate()).toBeDefined();
    });
  });
});
