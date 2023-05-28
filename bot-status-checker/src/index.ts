import TelegramBot from "node-telegram-bot-api";
import axios from "axios";
import fs from "fs";

const token = process.env.TELEGRAM_BOT_TOKEN || "";

if (!token) {
  console.error("TELEGRAM_BOT_TOKEN is not set");
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

type User = {
  chatId: number;
  status: "active" | "inactive";
};

class Users {
  private users: { [key: number]: User } = {};

  constructor() {
    if (!fs.existsSync("assets")) {
      fs.mkdirSync("assets");
      fs.mkdirSync("assets/db");
      fs.writeFileSync("assets/db/users.json", "{}");
    } else if (!fs.existsSync("assets/db")) {
      fs.mkdirSync("assets/db");
      fs.writeFileSync("assets/db/users.json", "{}");
    } else if (!fs.existsSync("assets/db/users.json")) {
      fs.writeFileSync("assets/db/users.json", "{}");
    }

    this.users = JSON.parse(fs.readFileSync("assets/db/users.json", "utf-8"));
  }

  private writeUsers() {
    fs.writeFileSync("assets/db/users.json", JSON.stringify(this.users));
  }

  addUser(user: User) {
    this.users[user.chatId] = user;
    this.writeUsers();
  }

  markUserAsInactive(chatId: number) {
    this.users[chatId].status = "inactive";

    this.writeUsers();
  }

  getUser(chatId: number) {
    return this.users[chatId];
  }

  getActiveUsers() {
    return Object.values(this.users).filter((user) => user.status === "active");
  }
}

const users = new Users();

bot.onText(/\*/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "I didn't understand that command.");
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  users.addUser({ chatId: chatId, status: "active" });
  bot.sendMessage(chatId, "You will receive messages from now on");
});

bot.onText(/\/stop/, (msg) => {
  const chatId = msg.chat.id;

  users.markUserAsInactive(chatId);

  bot.sendMessage(chatId, "You will not receive any more messages");
});

const checkUrl = async (
  url: string
): Promise<{ status: boolean; message: string }> => {
  return axios
    .get(url)
    .then((res) => {
      return {
        status: true,
        message: res.statusText,
      };
    })
    .catch((e) => {
      return {
        status: false,
        message: e.toString(),
      };
    });
};

const checkStatus = (): string => {
  const urls = [
    {
      url: "https://poster-peredelano.orby-tech.space/",
      description: "Main page",
      validator: checkUrl,
    },
    {
      url: "https://poster-peredelano.orby-tech.space/api/events",
      description: "Events API",
      validator: (url: string) => {
        return axios
          .get(url)
          .then((res) => res.data)
          .then((res) => {
            if (res.length === 0) {
              return {
                status: false,
                message: "No events",
              };
            }
            return {
              status: true,
              message: res.bo,
            };
          })
          .catch((e) => {
            return {
              status: false,
              message: e.toString(),
            };
          });
      },
    },
    {
      url: "https://metrics.orby-tech.space/poster-peredelano.orby-tech.space",
      description: "Metrics",
      validator: checkUrl,
    },
    {
      url: "https://poster-peredelano.orby-tech.space/event/limassol-24-06",
      description: "Limassol event page",
      validator: checkUrl,
    },
  ];

  let counter = 0;

  urls.forEach(async (url) => {
    const { status, message } = await url.validator(url.url);
    if (!status) {
      emitError(`${url.description} is down. Error: ${message}`);
    }
    counter++;
    if (counter % 3 === 0) {
      counter = 0;
      return "I am alive";
    }
  });

  return "";
};

const emit = (text: string) => {
  users.getActiveUsers().forEach((user) => {
    bot.sendMessage(user.chatId, text);
  });
};

const emitError = (e: string) => {
  emit("Error: " + e);
};

const testsRun = () => {
  try {
    emit(checkStatus());
  } catch (e: any) {
    emitError(e.toString());
  }
};

setInterval(() => {
  testsRun();
}, 1000 * 60 * 10);
testsRun();
