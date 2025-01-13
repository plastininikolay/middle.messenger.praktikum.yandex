# Проект: Веб-приложение "чат" с пользовательскими страницами

## Описание

Это веб-приложение включает в себя несколько пользовательских страниц, таких как:
- Страница 404 (Не найдено) - src/pages/404.html
#### Отображает несуществующий контент, есть возможность перехода на страницу чатов
- Страница 500 (Ошибка сервера) - src/pages/500.html
#### Отображает ошибки сервера, есть возможность перехода на страницу чатов
- Страница профиля пользователя - src/pages/profile.html
#### Страница профиля пользователя, есть возможность увидеть информацию по аккаунту, включает кнопку перехода на страницу редактирования информации
- Страница редактирования профиля - src/pages/profile-edit.html
#### Есть возможность изменять информацию по аккаунту
- Страница регистрации - src/pages/registration.html
#### Отображает форму с необходимыми инпутами для создания аккаунта, есть кнопка перехода на страницу авторизации
- Страница авторизации - src/pages/auth.html
#### Форма с заполнением необходимых данных для авторизации, кнопка перехода на страницу регистрации
- Страница чатов - src/pages/chats.html
#### Страница для обмена сообщениями с другими пользователями

Проект разработан с использованием HTML, CSS и Handlebars и предназначен для демонстрации основных функций пользовательского интерфейса.

#### Стили в папке styles

#### Для запуска проекта требуется скачать все необходимые зависимости
```npm install```
#### Затем запустить проект с помощью команды
```npm run dev```
#### Переход по страницам осуществляется через обращение к конкретным html страницам например: `http://localhost:3000/src/pages/chats.html`

#### деплой на netlify - https://plastininikolay-praktikum-yandex.netlify.app
