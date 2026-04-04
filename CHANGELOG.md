# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-04-04

### Added
- 29 MAX Bot API endpoints with full documentation
- 26 data models
- 20 guides across 8 categories
- MAX Bridge API: 6 objects + 17 events
- 35 MAX UI components
- 7 MCP tools: `list_endpoints`, `get_endpoint`, `search_docs`, `list_guides`, `get_guide`, `get_bridge_api`, `get_component`
- Resource-based access via `max-docs://` URI scheme
- stdio transport for MCP client integration
- Quickstart guides for Claude Desktop, Cursor, OpenCode, Codex, and other MCP clients
- TypeScript source with build pipeline (`npm run build`)
- `.mcp.json` for local development testing

### Technical
- Node.js >= 18 support
- TypeScript with strict compilation
- Modular architecture: `src/data/`, `src/tools/`, `src/resources/`, `src/utils/`
- Search utility with fuzzy matching across all data sources
