# MCP Registry Submission Checklist — max_docs_mcp

## Status: READY (needs npm publish + Anton's approval for external actions)

## Prerequisites
- [x] GitHub repo public: https://github.com/Launchery/max_docs_mcp
- [x] `server.json` prepared (see `server.json` in repo root)
- [x] MCP server works (initialize + list_guides verified)
- [ ] **npm publish** — `max-docs-mcp-server` must be on npmjs.org
- [ ] GitHub authentication for MCP Registry (via GitHub namespace `io.github.launchery`)

## Steps for Anton

### 1. npm publish
```bash
cd github-growth-launchery/work/max_docs_mcp
npm publish --access public
```
Requires: npm account with publish rights for `max-docs-mcp-server` package.

### 2. Authenticate with MCP Registry
Follow https://modelcontextprotocol.io/registry/authentication
- GitHub-based auth: the namespace `io.github.launchery` must match the GitHub org
- Run the auth flow to get a publish token

### 3. Publish to MCP Registry
```bash
curl -X POST https://registry.modelcontextprotocol.io/v0/publish \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d @server.json
```

### 4. Verify
```bash
# Check listing
curl https://registry.modelcontextprotocol.io/v0/servers/io.github.launchery/max-docs-mcp-server
```

## Notes
- MCP Registry is currently in preview (v0 API)
- Registry stores metadata only — it points to npm for the actual package
- Authentication ties to GitHub namespace (io.github.launchery → Launchery org)
- After publish, users can discover max_docs_mcp via the registry
