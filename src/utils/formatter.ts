import type {
  EndpointDoc, ModelDoc, SchemaField, EndpointParameter, OverviewDoc,
  GuideDoc, GuideSection,
  BridgeApiDoc, BridgeObject, BridgeMethod, BridgeEvent, BridgeErrorCode,
  UILibraryDoc, ComponentDoc,
} from '../data/types.js';

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

// ========== Guide Formatting ==========

export function formatGuidesTable(guides: GuideDoc[], category?: string): string {
  const lines: string[] = [
    `# MAX Документация — Руководства${category ? ` (${category})` : ''}`,
    '',
    `Всего: ${guides.length} руководств`,
    '',
    '| # | ID | Категория | Название | Описание |',
    '|---|----|-----------|---------|-----------| ',
    ...guides.map((g, i) =>
      `| ${i + 1} | ${g.id} | ${g.category} | ${g.title} | ${g.summary} |`
    ),
  ];
  return lines.join('\n');
}

export function formatGuide(guide: GuideDoc): string {
  const lines: string[] = [
    `## ${guide.title}`,
    '',
    `**Категория:** ${guide.category}`,
    '',
    guide.summary,
  ];

  function renderSections(sections: GuideSection[], depth: number): void {
    for (const s of sections) {
      const hashes = '#'.repeat(Math.min(depth + 3, 6));
      lines.push('', `${hashes} ${s.heading}`, '', s.content);
      if (s.subsections) renderSections(s.subsections, depth + 1);
    }
  }

  renderSections(guide.sections, 0);

  if (guide.codeExamples && guide.codeExamples.length > 0) {
    lines.push('', '### Примеры кода', '');
    for (const ex of guide.codeExamples) {
      if (ex.description) lines.push(ex.description, '');
      lines.push(`**${ex.title}:**`, '', `\`\`\`${ex.language}`, ex.code, '```', '');
    }
  }

  if (guide.relatedGuides && guide.relatedGuides.length > 0) {
    lines.push('', `**Связанные руководства:** ${guide.relatedGuides.join(', ')}`);
  }
  if (guide.relatedEndpoints && guide.relatedEndpoints.length > 0) {
    lines.push(`**Связанные эндпоинты:** ${guide.relatedEndpoints.join(', ')}`);
  }
  if (guide.relatedModels && guide.relatedModels.length > 0) {
    lines.push(`**Связанные модели:** ${guide.relatedModels.join(', ')}`);
  }

  return lines.join('\n');
}

// ========== Bridge API Formatting ==========

export function formatBridgeApiOverview(api: BridgeApiDoc): string {
  const lines: string[] = [
    '# MAX Bridge API (window.WebApp)',
    '',
    api.overview,
    '',
    `**Подключение:** \`<script src="${api.scriptUrl}"></script>\``,
    '',
    '## Свойства',
    '',
    '| Свойство | Тип | Описание |',
    '|----------|-----|----------|',
    ...api.mainProperties.map(p =>
      `| ${p.name} | ${p.type} | ${p.description} |`
    ),
    '',
    '## Основные методы',
    '',
    ...api.coreMethods.map(m => formatBridgeMethodShort(m)),
    '',
    '## Объекты',
    '',
    ...api.objects.map(o => `- **${o.name}** — ${o.description}`),
    '',
    '## Хранилища',
    '',
    ...api.storageApi.map(o => `- **${o.name}** — ${o.description}`),
    '',
    '## События',
    '',
    `Всего: ${api.events.length} событий`,
    '',
    '| Событие | Описание |',
    '|---------|----------|',
    ...api.events.map(e => `| ${e.name} | ${e.description} |`),
    '',
    '## Коды ошибок',
    '',
    ...formatBridgeErrorCodes(api.errorCodes),
  ];
  return lines.join('\n');
}

function formatBridgeMethodShort(m: BridgeMethod): string {
  const params = m.params.map(p => p.name).join(', ');
  return `- **${m.name}(${params})** — ${m.description}`;
}

export function formatBridgeObject(obj: BridgeObject): string {
  const lines: string[] = [
    `## ${obj.name}`,
    '',
    obj.description,
  ];

  if (obj.properties.length > 0) {
    lines.push(
      '',
      '### Свойства',
      '',
      '| Свойство | Тип | Описание | Только чтение |',
      '|----------|-----|----------|---------------|',
      ...obj.properties.map(p =>
        `| ${p.name} | ${p.type} | ${p.description} | ${p.readonly ? 'Да' : 'Нет'} |`
      ),
    );
  }

  if (obj.methods.length > 0) {
    lines.push('', '### Методы', '');
    for (const m of obj.methods) {
      lines.push(...formatBridgeMethodDetail(m));
    }
  }

  return lines.join('\n');
}

function formatBridgeMethodDetail(m: BridgeMethod): string[] {
  const params = m.params.map(p => p.name).join(', ');
  const lines: string[] = [
    `#### ${m.name}(${params})`,
    '',
    m.description,
  ];

  if (m.params.length > 0) {
    lines.push(
      '',
      '| Параметр | Тип | Обязательный | Описание |',
      '|----------|-----|-------------|----------|',
      ...m.params.map(p => {
        let desc = p.description;
        if (p.enumValues) desc += ` Значения: ${p.enumValues.join(', ')}`;
        return `| ${p.name} | ${p.type} | ${p.required ? 'Да' : 'Нет'} | ${desc} |`;
      }),
    );
  }

  if (m.returnType !== 'void') {
    lines.push('', `**Возвращает:** ${m.returnType}`);
  }

  if (m.example) {
    lines.push('', '```javascript', m.example, '```');
  }

  if (m.notes && m.notes.length > 0) {
    lines.push('', ...m.notes.map(n => `> ${n}`));
  }

  if (m.availablePlatforms) {
    lines.push('', `**Платформы:** ${m.availablePlatforms.join(', ')}`);
  }

  lines.push('');
  return lines;
}

export function formatBridgeEvents(events: BridgeEvent[]): string {
  const lines: string[] = [
    '# MAX Bridge — События',
    '',
    `Всего: ${events.length} событий`,
  ];

  for (const e of events) {
    lines.push('', `## ${e.name}`, '', e.description);
    if (e.dataFields && e.dataFields.length > 0) {
      lines.push('', '| Поле | Тип | Описание |', '|------|-----|----------|');
      for (const f of e.dataFields) {
        lines.push(`| ${f.name} | ${f.type} | ${f.description} |`);
      }
    }
  }

  return lines.join('\n');
}

export function formatBridgeErrorCodes(codes: BridgeErrorCode[]): string[] {
  return [
    '| Код | Описание |',
    '|----|----------|',
    ...codes.map(c => `| ${c.code} | ${c.description} |`),
  ];
}

// ========== UI Components Formatting ==========

export function formatComponentsOverview(lib: UILibraryDoc): string {
  const categories = new Map<string, ComponentDoc[]>();
  for (const c of lib.components) {
    const list = categories.get(c.category) ?? [];
    list.push(c);
    categories.set(c.category, list);
  }

  const lines: string[] = [
    '# MAX UI — Библиотека компонентов',
    '',
    lib.overview,
    '',
    `**Установка:** \`${lib.installInstructions}\``,
    '',
    '## Темы',
    lib.themeDescription,
    '',
    '## Адаптация под платформу',
    lib.platformAdaptation,
    '',
    `## Компоненты (${lib.components.length})`,
    '',
  ];

  for (const [cat, comps] of categories) {
    lines.push(`### ${cat}`, '');
    for (const c of comps) {
      lines.push(`- **${c.name}** — ${c.description}`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

export function formatComponent(comp: ComponentDoc): string {
  const lines: string[] = [
    `## ${comp.name}`,
    '',
    `**Категория:** ${comp.category}`,
    '',
    comp.description,
  ];

  if (comp.props.length > 0) {
    lines.push(
      '',
      '### Props',
      '',
      '| Prop | Тип | Обязательный | По умолчанию | Описание |',
      '|------|-----|-------------|-------------|----------|',
      ...comp.props.map(p =>
        `| ${p.name} | ${p.type} | ${p.required ? 'Да' : 'Нет'} | ${p.defaultValue ?? '—'} | ${p.description} |`
      ),
    );
  }

  if (comp.features && comp.features.length > 0) {
    lines.push('', '### Особенности', '', ...comp.features.map(f => `- ${f}`));
  }

  if (comp.example) {
    lines.push('', '### Пример', '', '```tsx', comp.example, '```');
  }

  if (comp.notes && comp.notes.length > 0) {
    lines.push('', '### Заметки', '', ...comp.notes.map(n => `- ${n}`));
  }

  return lines.join('\n');
}
