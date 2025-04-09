import {ChatData, UserData} from "./types.ts";

export const avatarUrl = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'

export const mockProfileData: UserData = {
	//avatar: 'https://example.com/avatar.png',
	username: 'ivan123',
	email: 'ivan@example.com',
	login: 'ivan_login',
	firstName: 'Иван',
	lastName: 'Иванов',
	chatName: 'Иван',
	phone: '+7 (123) 456-78-90',
	password: 'password',
};
export const mockChatsData: Array<ChatData> = [
	{
		"author": "Alice",
		"text": "Привет! Как дела?",
		"avatar": "https://gravatar.com/avatar/b7df20c287a7496d291ce0c141219bd4?s=400&d=identicon&r=x",
		"unreadMessages": 3
	},
	{
		"author": "Bob",
		"text": "Все хорошо, спасибо!",
		"avatar": "https://gravatar.com/avatar/095a8409b60df9dce947362ba6b6972f?s=400&d=identicon&r=x",
		"unreadMessages": 1
	},
	{
		"author": "Charlie",
		"text": "Что нового?",
		"avatar": "https://gravatar.com/avatar/39d2ebc725e9f5790f4e416d2f49fd47?s=400&d=identicon&r=x",
		"unreadMessages": 0
	},
	{
		"author": "David",
		"text": "Давай встретимся завтра.",
		"unreadMessages": 5
	},
	{
		"author": "Eve",
		"text": "Не забудь про встречу в 3 часа.",
		"avatar": "https://gravatar.com/avatar/e477027e302a6f2ee1a7c26f3ea8f63a?s=400&d=identicon&r=x",
		"unreadMessages": 2
	},
	{
		"author": "Alice",
		"text": "Как насчет кофе?",
		"unreadMessages": 4
	},
	{
		"author": "Bob",
		"text": "Я на пути!",
		"unreadMessages": 0
	},
	{
		"author": "Charlie",
		"text": "Увидимся позже!",
		"avatar": "https://gravatar.com/avatar/ae5402dc0328edc9f00931b8375bdbea?s=400&d=identicon&r=x",
		"unreadMessages": 6
	},
	{
		"author": "David",
		"text": "Согласен, это отличная идея!",
		"unreadMessages": 1
	},
	{
		"author": "Eve",
		"text": "Где мы встретимся?",
		"unreadMessages": 3
	}
]

export const mockMessages = [
	{ sender: true, text: 'Привет! Как дела?', time: '10:00' },
	{ sender: false, text: 'Все хорошо, спасибо! А у тебя?', time: '10:01' },
	{ sender: true, text: 'Тоже все отлично!', time: '10:02' },
	{ sender: false, text: 'Как насчет встречи на выходных?', time: '10:03' },
	{ sender: true, text: 'Да, отличная идея! Где встретимся?', time: '10:04' },
	{ sender: false, text: 'Может, в кафе на углу?', time: '10:05' },
	{ sender: true, text: 'Звучит здорово! Во сколько?', time: '10:06' },
	{ sender: false, text: 'Давай в 3 часа?', time: '10:07' },
	{ sender: true, text: 'Супер! Я буду там.', time: '10:08' },
	{ sender: false, text: 'Не забудь про документы!', time: '10:09' },
	{ sender: true, text: 'Уже собираю! Все будет готово.', time: '10:10' },
	{ sender: false, text: 'Отлично, жду не дождусь!', time: '10:11' },
	{ sender: true, text: 'Кстати, ты слышал новости?', time: '10:12' },
	{ sender: false, text: 'Нет, какие?', time: '10:13' },
	{ sender: true, text: 'Говорят, открыли новый парк в центре.', time: '10:14' },
	{ sender: false, text: 'Правда? Надо будет сходить!', time: '10:15' },
	{ sender: true, text: 'Да, там должно быть очень красиво.', time: '10:16' },
	{ sender: false, text: 'Когда планируешь туда сходить?', time: '10:17' },
	{ sender: true, text: 'Возможно, в следующую субботу.', time: '10:18' },
	{ sender: false, text: 'Договорились! Напомни мне.', time: '10:19' },
	{ sender: true, text: 'Обязательно! До встречи!', time: '10:20' },
]
