import type { EndpointDoc, ModelDoc, SchemaField, EndpointParameter, OverviewDoc } from '../data/types.js';

export function formatOverview(overview: OverviewDoc): string {
  const lines: string[] = [
    '# MAX Bot API — Обзор',
    '',
    `**Base URL:** \`${overview.baseUrl}\``,
    '',
    '## Авторизация',
    overview.authDescription,
    '',
    '## Ограничения',
    overview.rateLimitDescription,
    '',
    '## HTTP статус-коды',
    '| Код | Описание |',
    '|-----|----------|',
    ...overview.httpStatusCodes.map(s => `| ${s.code} | ${s.description} |`),
    '',
    '## Общие замечания',
    ...overview.generalNotes.map(n => `- ${n}`),
  ];
  return lines.join('\n');
}

export function formatEndpoint(ep: EndpointDoc): string {
  const lines: string[] = [
    `## ${ep.method} ${ep.path}`,
    '',
    `**Группа:** ${ep.group}`,
    '',
    `**${ep.summary}**`,
    '',
    ep.description,
  ];

  if (ep.parameters.length > 0) {
    lines.push('', '### Параметры', '');
    lines.push(...formatParameters(ep.parameters));
  }

  if (ep.requestBody) {
    lines.push('', '### Тело запроса', '', ep.requestBody.description, '');
    lines.push(...formatFields(ep.requestBody.fields));
  }

  lines.push('', '### Ответ', '', ep.response.description, '');
  lines.push(...formatFields(ep.response.fields));

  if (ep.example) {
    lines.push('', '### Пример', '', '```bash', ep.example.curl, '```');
    if (ep.example.responseJson) {
      lines.push('', 'Ответ:', '', '```json', ep.example.responseJson, '```');
    }
  }

  if (ep.notes && ep.notes.length > 0) {
    lines.push('', '### Заметки', '', ...ep.notes.map(n => `- ${n}`));
  }

  return lines.join('\n');
}

export function formatEndpointSummary(ep: EndpointDoc): string {
  return `${ep.method} ${ep.path} — ${ep.summary}`;
}

export function formatEndpointsTable(endpoints: EndpointDoc[]): string {
  const lines: string[] = [
    '# MAX Bot API — Все эндпоинты',
    '',
    `Всего: ${endpoints.length} эндпоинтов`,
    '',
    '| # | Метод | Путь | Группа | Описание |',
    '|---|-------|------|--------|----------|',
    ...endpoints.map((ep, i) =>
      `| ${i + 1} | ${ep.method} | ${ep.path} | ${ep.group} | ${ep.summary} |`
    ),
  ];
  return lines.join('\n');
}

export function formatModel(model: ModelDoc): string {
  const lines: string[] = [
    `## ${model.name}`,
    '',
    model.description,
    '',
    '### Поля',
    '',
    ...formatFields(model.fields),
  ];

  if (model.relatedModels && model.relatedModels.length > 0) {
    lines.push('', `**Связанные модели:** ${model.relatedModels.join(', ')}`);
  }

  return lines.join('\n');
}

export function formatModelsOverview(models: ModelDoc[]): string {
  const lines: string[] = [
    '# MAX Bot API — Модели данных',
    '',
    `Всего: ${models.length} моделей`,
    '',
    '| Модель | Описание |',
    '|--------|----------|',
    ...models.map(m => `| ${m.name} | ${m.description} |`),
  ];
  return lines.join('\n');
}

function formatParameters(params: EndpointParameter[]): string[] {
  const lines = [
    '| Имя | Расположение | Тип | Обязательный | Описание |',
    '|-----|-------------|-----|-------------|----------|',
  ];
  for (const p of params) {
    let desc = p.description;
    if (p.constraints) desc += ` (${p.constraints})`;
    if (p.defaultValue) desc += ` [по умолчанию: ${p.defaultValue}]`;
    if (p.enumValues) desc += ` Значения: ${p.enumValues.join(', ')}`;
    lines.push(`| ${p.name} | ${p.location} | ${p.type} | ${p.required ? 'Да' : 'Нет'} | ${desc} |`);
  }
  return lines;
}

function formatFields(fields: SchemaField[]): string[] {
  const lines = [
    '| Поле | Тип | Обязательное | Nullable | Описание |',
    '|------|-----|-------------|----------|----------|',
  ];
  for (const f of fields) {
    let desc = f.description;
    if (f.constraints) desc += ` (${f.constraints})`;
    if (f.defaultValue) desc += ` [по умолчанию: ${f.defaultValue}]`;
    if (f.enumValues) desc += ` Значения: ${f.enumValues.join(', ')}`;
    lines.push(`| ${f.name} | ${f.type} | ${f.required ? 'Да' : 'Нет'} | ${f.nullable ? 'Да' : 'Нет'} | ${desc} |`);
  }
  return lines;
}
