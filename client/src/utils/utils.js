// TODO: Protect API with auth token
export const API_URL = 'http://localhost:3001' || process.env.API_URL;

export function t(string) {
  // Placeholder function for supporting traslations.
  // Needs to be raplaced with normal tranlation behaviour.
  const ru = new Map();

  ru.set('Add task', 'Добавить задачу');
  ru.set('Back', 'Назад');
  ru.set('BeeJee test task', 'BeeJee: тестовое задание');
  ru.set('Cancel', 'Отмена');
  ru.set('done', 'выполнено');
  ru.set('Done', 'Выполнено');
  ru.set('Edit', 'Редактировать');
  ru.set('edited by admin', 'отредактировано администратором');
  ru.set('Email is invalid', 'Email не валиден');
  ru.set('Invalid credentials', 'Неверные реквизиты доступа');
  ru.set('Log in', 'Вход');
  ru.set('Log out', 'Выход');
  ru.set('Logged in successfully', 'Авторизация прошла успешно');
  ru.set('Logged out successfully', 'Выход успешен');
  ru.set('Password', 'Пароль');
  ru.set('Save', 'Сохранить');
  ru.set('Status', 'Статус');
  ru.set('Task added successfully', 'Задача успешно добавлена');
  ru.set('Task updated successfully', 'Задача успешно обновлена');
  ru.set('Text', 'Текст');
  ru.set('This field is reqired', 'Поле обязательно для заполнения');
  ru.set('Username', 'Имя пользователя');

  return ru.get(string) ?? string;
}
