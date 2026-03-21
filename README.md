# MAX Bot API Documentation MCP Server

MCP-сервер, предоставляющий документацию [MAX Bot API](https://dev.max.ru/docs-api) в виде ресурсов и инструментов для AI-кодинг-агентов. Агент получает доступ ко всем 29 эндпоинтам, 18 моделям данных и может искать по документации — без необходимости ходить в интернет.

---

## Оглавление

1. [Требования](#требования)
2. [Установка и сборка](#установка-и-сборка)
3. [Быстрый старт](#быстрый-старт)
4. [Подключение к кодинг-агентам](#подключение-к-кодинг-агентам)
   - [Claude Code (CLI)](#claude-code-cli)
   - [Claude Desktop](#claude-desktop)
   - [Cursor](#cursor)
   - [Windsurf](#windsurf)
   - [VS Code + Continue](#vs-code--continue)
   - [OpenAI Codex CLI](#openai-codex-cli)
   - [OpenCode CLI](#opencode-cli)
5. [Проверка работоспособности](#проверка-работоспособности)
6. [Доступные инструменты (Tools)](#доступные-инструменты-tools)
7. [Доступные ресурсы (Resources)](#доступные-ресурсы-resources)
8. [Примеры использования агентом](#примеры-использования-агентом)
9. [Структура проекта](#структура-проекта)
10. [Разработка](#разработка)
11. [Устранение неполадок](#устранение-неполадок)

---

## Требования

- **Node.js** >= 18 (проверить: `node --version`)
- **npm** >= 8 (проверить: `npm --version`)
- **git** (проверить: `git --version`)

---

## Установка и сборка

```bash
# 1. Клонировать репозиторий
git clone https://github.com/Launchery/max_docs_mcp.git
cd max_docs_mcp

# 2. Установить зависимости
npm install

# 3. Собрать проект
npm run build
```

После успешной сборки появится папка `dist/` с скомпилированными JS-файлами. Точка входа — `dist/index.js`.

Убедитесь, что сборка прошла без ошибок:

```bash
npm run build
# Должен отработать без вывода (тишина = успех)
```

Запомните абсолютный путь до собранного сервера — он понадобится для конфигурации:

```bash
echo "$(pwd)/dist/index.js"
# Например: /home/user/max_docs_mcp/dist/index.js
```

---

## Быстрый старт

Три шага от клонирования до работающего агента (на примере Claude Code):

```bash
# 1. Клонировать и собрать
git clone https://github.com/Launchery/max_docs_mcp.git
cd max_docs_mcp && npm install && npm run build

# 2. Подключить глобально к Claude Code
claude mcp add max-docs -- node "$(pwd)/dist/index.js"

# 3. Готово! Перейти в проект с ботом и начать работу
cd ~/my-max-bot
claude
# Спросите: «Как отправить сообщение через MAX Bot API?»
```

---

## Подключение к кодинг-агентам

Сервер использует **stdio**-транспорт — он запускается как дочерний процесс и общается через stdin/stdout по протоколу JSON-RPC.

> Во всех примерах ниже замените `<MCP_SERVER_PATH>` на абсолютный путь к `dist/index.js` внутри клонированного репозитория. Узнать путь: `cd max_docs_mcp && echo "$(pwd)/dist/index.js"`

### Claude Code (CLI)

**Вариант 1 — команда `claude mcp add` (рекомендуется):**

```bash
# Глобально (для всех проектов)
claude mcp add --scope user max-docs -- node "<MCP_SERVER_PATH>"

# Для конкретного проекта
cd ~/my-project
claude mcp add --scope project max-docs -- node "<MCP_SERVER_PATH>"
```

**Вариант 2 — файл `.mcp.json` в корне рабочего проекта:**

Создайте файл `.mcp.json` в корне проекта, где вы пишете бота (не в папке MCP-сервера):

```json
{
  "mcpServers": {
    "max-docs": {
      "command": "node",
      "args": ["<MCP_SERVER_PATH>"]
    }
  }
}
```

**Вариант 3 — глобальная конфигурация `~/.claude.json`:**

```json
{
  "mcpServers": {
    "max-docs": {
      "command": "node",
      "args": ["<MCP_SERVER_PATH>"]
    }
  }
}
```

**Проверка подключения:**

```bash
# Запустить Claude Code
claude

# В сессии выполнить:
/mcp
# Должен отобразиться сервер "max-docs" со статусом "connected"
```

---

### Claude Desktop

Откройте настройки Claude Desktop:
- macOS: `Claude` → `Settings` → `Developer` → `Edit Config`
- Windows: `File` → `Settings` → `Developer` → `Edit Config`

Откроется файл `claude_desktop_config.json`. Добавьте в него:

```json
{
  "mcpServers": {
    "max-docs": {
      "command": "node",
      "args": ["<MCP_SERVER_PATH>"]
    }
  }
}
```

Перезапустите Claude Desktop. В новом чате появится иконка MCP-инструментов.

---

### Cursor

Создайте файл `.cursor/mcp.json` в корне вашего рабочего проекта:

```json
{
  "mcpServers": {
    "max-docs": {
      "command": "node",
      "args": ["<MCP_SERVER_PATH>"]
    }
  }
}
```

Или настройте глобально через `Cursor Settings` → `MCP` → `Add new MCP server`:

- **Name:** `max-docs`
- **Type:** `stdio`
- **Command:** `node "<MCP_SERVER_PATH>"`

Перезапустите Cursor. Сервер появится в списке MCP-серверов в настройках.

---

### Windsurf

Откройте `Windsurf Settings` → `Cascade` → `MCP` → `Add Server` → `Add custom server`.

Откроется файл `mcp_config.json`. Добавьте:

```json
{
  "mcpServers": {
    "max-docs": {
      "command": "node",
      "args": ["<MCP_SERVER_PATH>"]
    }
  }
}
```

Нажмите кнопку обновления рядом с сервером для активации.

---

### VS Code + Continue

В файле конфигурации Continue (`~/.continue/config.yaml` или `.continue/config.yaml` в проекте):

```yaml
mcpServers:
  - name: max-docs
    command: node
    args:
      - <MCP_SERVER_PATH>
```

Перезапустите Continue extension.

---

### OpenAI Codex CLI

**Вариант 1 — конфигурационный файл:**

Создайте или отредактируйте `~/.codex/config.json` (глобально) или `.codex/config.json` (в корне проекта):

```json
{
  "mcpServers": {
    "max-docs": {
      "command": "node",
      "args": ["<MCP_SERVER_PATH>"]
    }
  }
}
```

**Вариант 2 — флаг при запуске:**

```bash
codex --mcp-config '{"max-docs":{"command":"node","args":["<MCP_SERVER_PATH>"]}}'
```

После настройки Codex автоматически запустит MCP-сервер при старте сессии и получит доступ к инструментам `list_endpoints`, `get_endpoint`, `search_docs`.

**Проверка:** запустите `codex` и попросите «Покажи все эндпоинты MAX Bot API» — агент должен вызвать `list_endpoints`.

---

### OpenCode CLI

**Вариант 1 — `opencode.json` в корне проекта:**

```json
{
  "mcp": {
    "max-docs": {
      "type": "stdio",
      "command": "node",
      "args": ["<MCP_SERVER_PATH>"]
    }
  }
}
```

**Вариант 2 — `opencode.toml` в корне проекта:**

```toml
[mcp.max-docs]
type = "stdio"
command = "node"
args = ["<MCP_SERVER_PATH>"]
```

После создания файла конфигурации запустите `opencode` в директории проекта. Сервер подключится автоматически.

**Проверка:** в сессии OpenCode нажмите `?` для просмотра доступных инструментов — в списке должны появиться `list_endpoints`, `get_endpoint`, `search_docs`.

---

## Проверка работоспособности

### Быстрый тест через терминал

Из директории клонированного репозитория:

```bash
cd max_docs_mcp

echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"test","version":"1.0.0"}}}' | node dist/index.js
```

Ожидаемый ответ (сервер вернёт JSON):

```json
{
  "result": {
    "protocolVersion": "2024-11-05",
    "capabilities": {
      "resources": { "listChanged": true },
      "tools": { "listChanged": true }
    },
    "serverInfo": { "name": "max-docs", "version": "1.0.0" }
  },
  "jsonrpc": "2.0",
  "id": 1
}
```

### Тест инструментов в кодинг-агенте

Запустите агент и попросите:

```
Покажи все эндпоинты MAX Bot API
```

Агент вызовет инструмент `list_endpoints` и покажет таблицу 29 эндпоинтов.

---

## Доступные инструменты (Tools)

Сервер предоставляет **3 инструмента**, которые агент вызывает автоматически по контексту запроса.

### `list_endpoints`

Возвращает таблицу всех 29 эндпоинтов MAX Bot API.

- **Параметры:** нет
- **Когда используется:** агент хочет узнать, какие API-методы доступны

Пример ответа:

```
| # | Метод  | Путь                              | Группа         | Описание                    |
|---|--------|-----------------------------------|----------------|-----------------------------|
| 1 | GET    | /me                               | bot            | Получить информацию о боте  |
| 2 | GET    | /chats                            | chats          | Получить список чатов       |
| 3 | POST   | /messages                         | messages       | Отправить сообщение         |
...
```

### `get_endpoint`

Возвращает полную документацию конкретного эндпоинта: параметры, тело запроса, схему ответа, примеры curl, заметки.

- **Параметры:**
  - `method` — HTTP-метод (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`)
  - `path` — путь эндпоинта (например, `/messages`, `/chats/{chatId}`)
- **Когда используется:** агенту нужны детали конкретного API-вызова для написания кода

Если эндпоинт не найден, возвращает список похожих с подсказками.

### `search_docs`

Ищет по всей документации: описания эндпоинтов, имена параметров, поля моделей, заметки.

- **Параметры:**
  - `query` — поисковый запрос (ключевые слова)
- **Возвращает:** до 10 результатов, отсортированных по релевантности
- **Когда используется:** агент ищет, как реализовать конкретную функциональность

---

## Доступные ресурсы (Resources)

Ресурсы — это статические блоки документации, которые агент может запросить целиком.

| URI | Содержимое |
|-----|-----------|
| `max-docs://overview` | Авторизация, base URL, rate limits, HTTP статус-коды |
| `max-docs://api/bot` | GET /me — информация о боте |
| `max-docs://api/chats` | 5 эндпоинтов управления чатами |
| `max-docs://api/pinned-messages` | Закрепление и открепление сообщений |
| `max-docs://api/members` | 8 эндпоинтов управления участниками |
| `max-docs://api/messages` | 6 эндпоинтов работы с сообщениями |
| `max-docs://api/subscriptions` | Webhooks и long polling (4 эндпоинта) |
| `max-docs://api/uploads` | Загрузка файлов |
| `max-docs://api/callbacks` | POST /answers — ответы на callback-кнопки |
| `max-docs://models` | Обзор всех 18 моделей данных |
| `max-docs://models/{name}` | Детали конкретной модели (например, `max-docs://models/Message`) |

Доступные имена моделей для `max-docs://models/{name}`:

`User`, `BotInfo`, `Chat`, `Message`, `MessageBody`, `NewMessageBody`, `NewMessageLink`, `LinkedMessage`, `Recipient`, `MessageStat`, `Image`, `Update`, `ChatMember`, `InlineKeyboardAttachment`, `PhotoAttachment`, `VideoAttachment`, `AudioAttachment`, `FileAttachment`, `Button`, `Subscription`

---

## Примеры использования агентом

Ниже — примеры промптов, которые вы можете дать кодинг-агенту. Агент автоматически обратится к MCP-серверу за нужной документацией.

### Написать бота с нуля

```
Напиши MAX-бота на TypeScript, который:
1. Слушает входящие сообщения через long polling
2. Отвечает эхом на любое текстовое сообщение
3. На команду /start отправляет приветствие с inline-клавиатурой
```

Агент вызовет `search_docs("long polling")`, `get_endpoint("POST", "/messages")`, прочитает ресурс `max-docs://models/NewMessageBody` и напишет код с правильными API-вызовами.

### Добавить конкретную функцию

```
Добавь в бота функцию загрузки фото: пользователь отправляет фото, бот его сохраняет и отвечает ссылкой
```

Агент вызовет `get_endpoint("POST", "/uploads")` и `search_docs("photo attachment")`.

### Разобраться в конкретном API

```
Как работают webhook-подписки в MAX? Какие есть ограничения?
```

Агент вызовет `search_docs("webhook")` или прочитает ресурс `max-docs://api/subscriptions`.

### Обработка callback-кнопок

```
Покажи, как обрабатывать нажатия на inline-кнопки в MAX боте
```

Агент использует `get_endpoint("POST", "/answers")` и `search_docs("callback button inline_keyboard")`.

---

## Структура проекта

```
max_docs_mcp/
├── package.json                     # Манифест проекта
├── tsconfig.json                    # Настройки TypeScript
├── .gitignore
├── .mcp.json                        # MCP-конфигурация (пример)
├── README.md                        # Эта инструкция
├── src/
│   ├── index.ts                     # Точка входа: StdioServerTransport
│   ├── server.ts                    # Создание McpServer, регистрация resources + tools
│   ├── data/
│   │   ├── types.ts                 # TypeScript-интерфейсы
│   │   ├── overview.ts              # Auth, base URL, rate limits
│   │   ├── endpoints/
│   │   │   ├── index.ts             # Реэкспорт + allEndpoints[]
│   │   │   ├── bot.ts               # GET /me
│   │   │   ├── chats.ts             # /chats (5 эндпоинтов)
│   │   │   ├── pinned-messages.ts   # /chats/{chatId}/pin (3)
│   │   │   ├── members.ts          # /chats/{chatId}/members (8)
│   │   │   ├── messages.ts          # /messages (6)
│   │   │   ├── subscriptions.ts     # /subscriptions + /updates (4)
│   │   │   ├── uploads.ts           # POST /uploads (1)
│   │   │   └── callbacks.ts         # POST /answers (1)
│   │   └── models/
│   │       ├── index.ts             # Реэкспорт + allModels[]
│   │       ├── user.ts              # User, BotInfo
│   │       ├── chat.ts              # Chat
│   │       ├── message.ts           # Message, MessageBody, NewMessageBody и др.
│   │       ├── update.ts            # Update (15 типов событий)
│   │       ├── chat-member.ts       # ChatMember
│   │       ├── attachment.ts        # Attachment-типы, Button
│   │       └── subscription.ts      # Subscription
│   ├── resources/
│   │   └── registry.ts              # Регистрация 11 MCP-ресурсов
│   ├── tools/
│   │   ├── list-endpoints.ts        # list_endpoints
│   │   ├── get-endpoint.ts          # get_endpoint
│   │   └── search-docs.ts           # search_docs
│   └── utils/
│       ├── formatter.ts             # Форматирование в Markdown
│       └── search.ts                # Поиск по ключевым словам
└── dist/                            # Скомпилированный JS (после npm run build)
```

---

## Разработка

### Обновление до последней версии

```bash
cd max_docs_mcp
git pull
npm install
npm run build
```

После пересборки перезапустите кодинг-агент для переподключения к серверу.

### Режим наблюдения

При внесении изменений в документацию или код:

```bash
# В одном терминале — автоматическая пересборка при изменениях
npm run dev

# В другом — перезапустите кодинг-агент для переподключения к серверу
```

### Добавление нового эндпоинта

1. Добавьте объект `EndpointDoc` в соответствующий файл в `src/data/endpoints/`
2. Если это новая группа — создайте файл и добавьте реэкспорт в `src/data/endpoints/index.ts`
3. Пересоберите: `npm run build`

### Добавление новой модели

1. Добавьте объект `ModelDoc` в соответствующий файл в `src/data/models/`
2. Добавьте в массив экспорта и в `src/data/models/index.ts`
3. Пересоберите: `npm run build`

---

## Устранение неполадок

### Сервер не запускается

```bash
cd max_docs_mcp

# Проверить, что сборка актуальна
npm run build

# Проверить запуск напрямую
node dist/index.js
# Сервер должен запуститься и ждать ввода (не падать)
# Нажмите Ctrl+C для выхода
```

### Агент не видит сервер

- Убедитесь, что путь в конфигурации **абсолютный** и ведёт к `dist/index.js`
- Проверьте, что `dist/index.js` существует (выполните `npm run build` в папке `max_docs_mcp`)
- Перезапустите кодинг-агент после изменения конфигурации
- В Claude Code выполните `/mcp` для просмотра статуса подключённых серверов

### Агент не использует инструменты

Агент сам решает, когда обращаться к MCP-серверу. Чтобы явно направить его:

- Упомяните «MAX Bot API» в промпте
- Попросите «используй MCP-сервер max-docs»
- Попросите «найди в документации MAX...»

### Ошибка «Cannot find module»

```bash
cd max_docs_mcp

# Полная переустановка
rm -rf node_modules dist
npm install
npm run build
```

### Проверка JSON-RPC вручную

```bash
cd max_docs_mcp

# Отправить initialize + вызов инструмента
printf '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"test","version":"1.0.0"}}}\n{"jsonrpc":"2.0","method":"notifications/initialized"}\n{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"list_endpoints","arguments":{}}}\n' | node dist/index.js 2>/dev/null
```
