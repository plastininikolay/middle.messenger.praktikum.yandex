import { ChatInput } from './ChatInput';

describe('Компонент ввода сообщений', () => {
  it('должен создаваться с базовыми параметрами', () => {
    const chatInput = new ChatInput({
      name: 'message',
      placeholder: 'Введите сообщение'
    });

    if (!chatInput) {
      throw new Error('Компонент не создан');
    }
  });

  it('должен рендерить поле ввода с правильным placeholder', () => {
    const placeholder = 'Введите сообщение';
    const chatInput = new ChatInput({
      name: 'message',
      placeholder
    });

    const element = chatInput.element as HTMLElement;
    if (!element) {
      throw new Error('Элемент не создан');
    }

    const input = element.querySelector('input');
    if (!input) {
      throw new Error('Поле ввода не найдено');
    }

    if (input.placeholder !== placeholder) {
      throw new Error('Неверный placeholder');
    }
  });

  it('должен обрабатывать ввод текста', () => {
    let inputValue = '';
    const chatInput = new ChatInput({
      name: 'message',
      placeholder: 'Введите сообщение',
      eventsForInput: {
        input: (e: Event) => {
          const target = e.target as HTMLInputElement;
          inputValue = target.value;
        }
      }
    });

    const element = chatInput.element as HTMLElement;
    if (!element) {
      throw new Error('Элемент не создан');
    }

    const input = element.querySelector('input');
    if (!input) {
      throw new Error('Поле ввода не найдено');
    }

    const testValue = 'Тестовое сообщение';
    input.value = testValue;
    input.dispatchEvent(new Event('input'));

    if (inputValue !== testValue) {
      throw new Error('Обработчик ввода не сработал');
    }
  });

  it('должен отправлять сообщение по нажатию Enter', () => {
    let messageSent = false;
    const chatInput = new ChatInput({
      name: 'message',
      placeholder: 'Введите сообщение',
      eventsForInput: {
        keydown: (e: Event) => {
          const keyboardEvent = e as KeyboardEvent;
          if (keyboardEvent.key === 'Enter') {
            messageSent = true;
          }
        }
      }
    });

    const element = chatInput.element as HTMLElement;
    if (!element) {
      throw new Error('Элемент не создан');
    }

    const input = element.querySelector('input');
    if (!input) {
      throw new Error('Поле ввода не найдено');
    }

    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    if (!messageSent) {
      throw new Error('Сообщение не отправлено по Enter');
    }
  });

  it('должен показывать сообщение об ошибке при валидации', () => {
    const chatInput = new ChatInput({
      name: 'message',
      placeholder: 'Введите сообщение',
      validationMessage: 'Обязательное поле',
      isErrorBottom: true
    });

    const element = chatInput.element as HTMLElement;
    if (!element) {
      throw new Error('Элемент не создан');
    }

    const errorMessage = element.querySelector('.error-message');
    if (!errorMessage) {
      throw new Error('Сообщение об ошибке не найдено');
    }

    if (errorMessage.textContent !== 'Обязательное поле') {
      throw new Error('Неверный текст сообщения об ошибке');
    }

    if (!errorMessage.classList.contains('bottom')) {
      throw new Error('Класс bottom не добавлен к сообщению об ошибке');
    }
  });

  it('должен очищать поле ввода после отправки', () => {
    const chatInput = new ChatInput({
      name: 'message',
      placeholder: 'Введите сообщение',
      eventsForInput: {
        keydown: (e: Event) => {
          const keyboardEvent = e as KeyboardEvent;
          if (keyboardEvent.key === 'Enter') {
            const target = e.target as HTMLInputElement;
            target.value = '';
          }
        }
      }
    });

    const element = chatInput.element as HTMLElement;
    if (!element) {
      throw new Error('Элемент не создан');
    }

    const input = element.querySelector('input');
    if (!input) {
      throw new Error('Поле ввода не найдено');
    }

    input.value = 'Тестовое сообщение';
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    if (input.value !== '') {
      throw new Error('Поле ввода не очищено после отправки');
    }
  });
});