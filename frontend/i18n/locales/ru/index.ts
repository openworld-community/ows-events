import { defineTranslation } from '..';

export const defaultTranslation = {
  meta: {
    title: 'Афиша',
    home: {
      title: 'Главная'
    },
    about_us: {
      title: 'О нас'
    },
    payment_info: {
      title: 'Оплата'
    }
  },
  global: {
    country: 'Страна',
    city: 'Город',
    search: 'Поиск',
    timezone: 'Часовой пояс',
    button: { back: 'Назад', share: 'Поделиться', cancel: 'Отмена', search: 'Поиск', delete: 'Очистить' },
    nav: 'Навигация'
  },
  about: {
    title: 'О нас',
    idea: 'Идея проекта "Афиши" - создать удобную площадку для поиска мероприятий, которые проходят в интересующем пользователя регионе. Пока что будут только IT-мероприятия, но в будущем мы хотим добавлять все: от конференций до музыкальных вечеров.',
    functionality:
      'На странице каждого мероприятия будет доступна информация о дате начала и окончания, локации, описании и цене. Пользователь сможет записаться на мероприятие и добавить его в избранное. Организатор мероприятия сможет добавлять информацию о нем на площадку.',
    monetization:
      'Монетизация проекта будет осуществляться за счет рекламы мероприятий, которые будут подниматься в начало списка.',
    github: 'Ссылка на GitHub проекта',
    alt: 'О проекте Переделано: Афиша'
  },
  home: {
    title: 'Мероприятия',
    button: {
      add_event_aria: 'Добавить мероприятие',
      afisha_logo_aria: 'Вернуться к началу страницы'
    },
    events: {
      image_alt: 'Фото мероприятия',
      ad: 'Реклама',
      anchor_chat: 'Перейти в чат'
    },
    peredelano: {
      description:
        'Тут мы объединяемся, чтобы вместе сделать проекты. Рынок и мир сейчас сложные, с работой туго, со смыслами тоже — поэтому мы решили делать и то и другое сами.'
    }
  },
  event: {
    button: {
      delete: 'Удалить',
      edit: 'Редактировать',
      contact: 'Связаться',
      register: 'Зарегистрироваться'
    },
    image: {
      event: 'изображение мероприятия'
    },
    price: {
      free: 'Бесплатно'
    }
  },
  component: {
    user_location: {
      not_found: 'Мы не смогли найти вас('
    },
    new_event_modal: {
      title: 'Добавьте мероприятие',
      cancel: 'Отмена',
      submit: 'Сохранить',
      add_image: 'Добавить фото',
      remove_image: 'Удалить фото',
      fields: {
        location: 'Локация',
        country: 'Страна',
        city: 'Город',
        timezone: 'Часовой пояс',
        main_info: 'Общая информация',
        title: 'Название',
        description: 'Описание',
        start: 'Начало',
        end: 'Окончание',
        price: 'Стоимость',
        url_to_rigistration: 'Ссылка на регистрацию'
      }
    },
    need_authorize_modal: {
      title: 'Для создания мероприятия необходимо авторизоваться',
      button: {
        close: 'Закрыть'
      }
    },
    delete_event_modal: {
      title: 'Удаление мероприятия',
      button: {
        cancel: 'Отмена',
        submit: 'Подтвердить'
      }
    },
    pre_authorisation_modal: {
      title: 'Войдите в аккаунт',
      button: {
        cancel: 'Отмена',
        login: 'Войти',
        logout: 'Выйти',
      }
    },
    language_selector: {
      label: 'Язык'
    },
    header: {
      about: 'Подробнее об Афише',
      event: {
        manage: 'Управление событием'
      },
      authorization: {
        authorize: 'Авторизоваться с помощью Telegram',
        deauthorize: 'Выйти из личного кабинета'
      }
    }
  },
  dates: {
    day: {
      key_zero: ' дней',
      key_one: ' день',
      key_few: ' дня',
      key_many: ' дней'
    },
    clock: 'часы'
  },
  header: {
    subscription_expired: '$t(dates.day.key) до конца подписки'
  },
};

export default defineTranslation(defaultTranslation);
