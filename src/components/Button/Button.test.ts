import { Button } from './Button.ts';
import { ButtonVariantEnum } from './types.ts';

describe('Компонент Button', () => {
  let button: Button;

  beforeEach(() => {
    button = new Button({
      label: 'Test Button',
      variant: ButtonVariantEnum.PRIMARY
    });
  });

  it('должен корректно рендериться с базовыми пропсами', () => {
    const element = button.getContent();
    expect(element).toBeTruthy();
    expect(element.tagName).toBe('BUTTON');
    expect(element.textContent?.trim()).toBe('Test Button');
    expect(element.className).toContain('button');
    expect(element.className).toContain('primary');
  });

  it('должен корректно отображать состояние disabled', () => {
    button.setProps({ isDisabled: true });
    const element = button.getContent();
    expect(element.className).toContain('disabled');
    expect(element.hasAttribute('disabled')).toBe(true);
  });

  it('должен корректно отображать полную ширину', () => {
    button.setProps({ isFull: true });
    const element = button.getContent();
    expect(element.className).toContain('full');
  });

  it('должен корректно отображаться как ссылка с маршрутом', () => {
    button.setProps({ isLink: true, url: '/test' });
    const element = button.getContent();
    expect(element.getAttribute('data-route')).toBe('/test');
  });

  it('должен корректно отображать пользовательский цвет', () => {
    const color = 'rgb(255, 0, 0)';
    button.setProps({ color });
    const element = button.getContent();
    expect(element.style.color).toBe(color);
  });

  it('должен корректно обрабатывать клики', () => {
    const mockClick = jest.fn();
    button.setProps({
      events: {
        click: mockClick
      }
    });

    const element = button.getContent();
    element.click();

    expect(mockClick).toHaveBeenCalled();
  });

  it('должен корректно отображать разные варианты кнопки', () => {
    const variants = [
      ButtonVariantEnum.PRIMARY,
      ButtonVariantEnum.SECONDARY,
      ButtonVariantEnum.UNDERLINE,
      ButtonVariantEnum.DELETE
    ];

    variants.forEach(variant => {
      button.setProps({ variant });
      const element = button.getContent();
      expect(element.className).toContain(variant);
    });
  });
});
