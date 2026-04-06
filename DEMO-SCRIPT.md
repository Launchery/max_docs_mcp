# Demo Script — max_docs_mcp

> 30–60 second terminal demo for `max_docs_mcp`.

## Goal
Show that `max_docs_mcp` is not just a docs dump, but a practical MCP server that gives coding agents grounded MAX Platform answers.

## Best demo story
1. build the MCP server;
2. show the MCP config shape;
3. run a minimal `initialize` handshake;
4. call one high-signal tool (`list_guides` or `search_docs`);
5. explain why this is useful for coding agents.

## Fast demo path

### 1. Build
```bash
npm install
npm run build
```

### 2. Show MCP config shape
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

### 3. Prove the server initializes
```bash
echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"demo","version":"1.0.0"}}}' | node dist/index.js
```

### 4. Show a real tool call
```bash
printf '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"demo","version":"1.0.0"}}}\n{"jsonrpc":"2.0","method":"notifications/initialized"}\n{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"list_guides","arguments":{}}}\n' | node dist/index.js 2>/dev/null
```

### Optional: search demo
```bash
printf '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"demo","version":"1.0.0"}}}\n{"jsonrpc":"2.0","method":"notifications/initialized"}\n{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"search_docs","arguments":{"query":"button bridge api"}}}\n' | node dist/index.js 2>/dev/null
```

## Suggested voiceover
- “Это локальный MCP-сервер с документацией MAX Platform.”
- “Он поднимается через stdio и подключается в любой MCP-клиент.”
- “Вот сервер инициализировался.”
- “Вот реальный tool call по документации.”
- “То есть агент не галлюцинирует про MAX, а тянет локальный источник правды.”

## Screenshot / GIF checklist
- terminal with successful build
- config snippet with `max-docs`
- successful `initialize`
- successful `tools/call`
- one frame with returned docs content

## Good clips for README
- build → init → tool call
- or client config + grounded answer side-by-side

## Non-goals
- no long protocol explanation;
- no multi-client montage;
- no 5-minute tutorial.

Short, grounded, and visually obvious wins.
