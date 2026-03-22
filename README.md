# MAX Platform Docs MCP Server

MCP-сервер с локальной документацией по MAX Platform для AI-кодинг-агентов. После сборки сервер отдаёт документацию через `stdio` и покрывает не только MAX Bot API, но и руководства, mini apps / MAX Bridge API и библиотеку UI-компонентов.

## Что покрывает проект

- 29 эндпоинтов MAX Bot API
- 26 моделей данных
- 20 руководств в 8 категориях
- MAX Bridge API для мини-приложений: 6 объектов и 17 событий
- 35 UI-компонентов MAX UI
- 7 MCP tools и расширенный набор resources

## Требования

- Node.js `>= 18`
- npm `>= 8`

Проверка:

```bash
node --version
npm --version
```

## Установка и сборка

```bash
git clone https://github.com/Launchery/max_docs_mcp.git
cd max_docs_mcp
npm install
npm run build
```

Точка входа после сборки: `dist/index.js`.

Для локального запуска из корня репозитория уже есть пример в [`./.mcp.json`](./.mcp.json).

## Быстрый старт

```bash
git clone https://github.com/Launchery/max_docs_mcp.git
cd max_docs_mcp
npm install
npm run build
echo "$(pwd)/dist/index.js"
```

Дальше подключите этот путь к вашему MCP-клиенту как `stdio`-сервер:

```json
{
  "mcpServers": {
    "max-docs": {
      "command": "node",
      "args": ["/absolute/path/to/max_docs_mcp/dist/index.js"]
    }
  }
}
```

## Подключение к клиентам

Сервер использует `stdio`, поэтому схема везде одна и та же: клиент запускает `node <path>/dist/index.js` как дочерний процесс.

### Claude Code

```bash
claude mcp add --scope user max-docs -- node "/absolute/path/to/max_docs_mcp/dist/index.js"
```

Проверка в сессии:

```text
/mcp
```

### Claude Desktop

Добавьте блок `mcpServers.max-docs` в `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "max-docs": {
      "command": "node",
      "args": ["/absolute/path/to/max_docs_mcp/dist/index.js"]
    }
  }
}
```

### Cursor

Создайте `.cursor/mcp.json` в рабочем проекте:

```json
{
  "mcpServers": {
    "max-docs": {
      "command": "node",
      "args": ["/absolute/path/to/max_docs_mcp/dist/index.js"]
    }
  }
}
```

### Windsurf

Добавьте тот же `stdio`-сервер в `mcp_config.json`:

```json
{
  "mcpServers": {
    "max-docs": {
      "command": "node",
      "args": ["/absolute/path/to/max_docs_mcp/dist/index.js"]
    }
  }
}
```

### VS Code + Continue

```yaml
mcpServers:
  - name: max-docs
    command: node
    args:
      - /absolute/path/to/max_docs_mcp/dist/index.js
```

### OpenAI Codex CLI

```json
{
  "mcpServers": {
    "max-docs": {
      "command": "node",
      "args": ["/absolute/path/to/max_docs_mcp/dist/index.js"]
    }
  }
}
```

Или через флаг:

```bash
codex --mcp-config '{"max-docs":{"command":"node","args":["/absolute/path/to/max_docs_mcp/dist/index.js"]}}'
```

### OpenCode CLI

```toml
[mcp.max-docs]
type = "stdio"
command = "node"
args = ["/absolute/path/to/max_docs_mcp/dist/index.js"]
```

## Проверка работоспособности

Сборка:

```bash
npm run build
```

Прямой запуск:

```bash
npm start
```

Сервер должен запуститься и ждать JSON-RPC сообщения по stdin.

Проверка `initialize` вручную:

```bash
echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"test","version":"1.0.0"}}}' | node dist/index.js
```

В ответе должны быть:

- `"name": "max-docs"`
- `"version": "2.0.0"`

Проверка tool-вызова вручную:

```bash
printf '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"test","version":"1.0.0"}}}\n{"jsonrpc":"2.0","method":"notifications/initialized"}\n{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"list_guides","arguments":{}}}\n' | node dist/index.js 2>/dev/null
```

## Доступные tools

Сервер регистрирует 7 инструментов.

| Tool | Аргументы | Что возвращает |
| --- | --- | --- |
| `list_endpoints` | нет | Таблицу всех 29 эндпоинтов MAX Bot API |
| `get_endpoint` | `method`, `path` | Полную документацию конкретного эндпоинта |
| `search_docs` | `query` | Поиск по endpoint-ам, моделям, guide-ам, Bridge API и UI-компонентам |
| `list_guides` | `category?` | Список всех guide-ов или guide-ов выбранной категории |
| `get_guide` | `id` | Полный текст guide-а по ID |
| `get_bridge_api` | `object?` | Обзор MAX Bridge API, объект Bridge API или список событий |
| `get_component` | `name?` | Обзор MAX UI или описание конкретного компонента |

### Категории для `list_guides`

- `platform`
- `chatbot`
- `tutorials`
- `sdk`
- `mini-apps`
- `channels`
- `partners`
- `legal`

### Доступные guide ID

```text
connection-guide
service-selection
bot-creation
nocode-bot-creation
bot-management
bot-coding-preparation
hello-bot-javascript
hello-bot-go
sdk-javascript
sdk-go
channel-creation
channel-management
partner-integration
legal-rules
legal-requirements
legal-agreement
legal-privacy
bridge-api
mini-apps-introduction
data-validation
```

### Доступные Bridge API объекты

```text
BackButton
ScreenCapture
HapticFeedback
BiometricManager
DeviceStorage
SecureStorage
events
```

### Примеры компонентов для `get_component`

```text
Button
Input
Avatar.Container
Flex
Typography.Title
Profile
```

## Доступные resources

### API и модели

- `max-docs://overview`
- `max-docs://api/bot`
- `max-docs://api/chats`
- `max-docs://api/pinned-messages`
- `max-docs://api/members`
- `max-docs://api/messages`
- `max-docs://api/subscriptions`
- `max-docs://api/uploads`
- `max-docs://api/callbacks`
- `max-docs://models`
- `max-docs://models/{name}`

### Руководства

- `max-docs://guides`
- `max-docs://guides/platform`
- `max-docs://guides/chatbot`
- `max-docs://guides/tutorials`
- `max-docs://guides/sdk`
- `max-docs://guides/mini-apps`
- `max-docs://guides/channels`
- `max-docs://guides/partners`
- `max-docs://guides/legal`
- `max-docs://guides/{id}`

### Mini apps / Bridge API

- `max-docs://mini-apps`
- `max-docs://mini-apps/bridge-api`
- `max-docs://mini-apps/bridge-api/events`
- `max-docs://mini-apps/bridge-api/{name}`

### UI components

- `max-docs://ui-components`
- `max-docs://ui-components/{name}`

## Примеры запросов к агенту

```text
Покажи все эндпоинты MAX Bot API и объясни, какой использовать для отправки сообщения.
```

```text
Используй документацию MAX и покажи guide по созданию чат-бота.
```

```text
Какие события есть у MAX Bridge API и как слушать кнопку "назад"?
```

```text
Найди в MAX UI компонент Button и покажи его параметры.
```

```text
Подскажи, как валидировать данные мини-приложения в MAX.
```

## Структура проекта

```text
max_docs_mcp/
├── .mcp.json
├── README.md
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts
│   ├── server.ts
│   ├── data/
│   │   ├── overview.ts
│   │   ├── types.ts
│   │   ├── endpoints/
│   │   ├── models/
│   │   ├── guides/
│   │   ├── mini-apps/
│   │   └── ui-components/
│   ├── resources/
│   │   └── registry.ts
│   ├── tools/
│   │   ├── list-endpoints.ts
│   │   ├── get-endpoint.ts
│   │   ├── search-docs.ts
│   │   ├── list-guides.ts
│   │   ├── get-guide.ts
│   │   ├── get-bridge-api.ts
│   │   └── get-component.ts
│   └── utils/
│       ├── formatter.ts
│       └── search.ts
└── dist/
```

## Разработка

Режимы работы:

```bash
npm run build
npm run dev
npm start
```

Если вы добавляете новую документацию:

1. Обновите соответствующий файл в `src/data/...`
2. Добавьте экспорт в нужный `index.ts`
3. Если появляется новый MCP tool или resource, зарегистрируйте его в `src/server.ts` или `src/resources/registry.ts`
4. Пересоберите проект через `npm run build`

## Устранение неполадок

### Сервер не запускается

```bash
npm run build
node dist/index.js
```

Если процесс не падает сразу, сервер стартует корректно и ждёт stdin.

### Клиент не видит MCP-сервер

- Проверьте, что указан абсолютный путь к `dist/index.js`
- Пересоберите проект: `npm run build`
- Перезапустите MCP-клиент после изменения конфигурации
- Для Claude Code проверьте `/mcp`

### Документация выглядит старой

```bash
git pull
npm install
npm run build
```

### Ошибка `Cannot find module`

Переустановите зависимости и пересоберите проект:

```bash
rm -rf node_modules dist
npm install
npm run build
```
