import type {
  EndpointDoc, ModelDoc, GuideDoc, GuideSection,
  BridgeApiDoc, BridgeMethod, BridgeEvent,
  ComponentDoc,
} from '../data/types.js';

export interface SearchResult {
  type: 'endpoint' | 'model' | 'guide' | 'bridge-method' | 'bridge-event' | 'component';
  score: number;
  title: string;
  description: string;
  endpoint?: EndpointDoc;
  model?: ModelDoc;
  guide?: GuideDoc;
  bridgeMethod?: BridgeMethod;
  bridgeEvent?: BridgeEvent;
  component?: ComponentDoc;
}

function buildEndpointSearchableText(ep: EndpointDoc): string {
  const parts: string[] = [
    ep.method,
    ep.path,
    ep.group,
    ep.summary,
    ep.description,
    ...ep.parameters.map(p => `${p.name} ${p.description}`),
  ];
  if (ep.requestBody) {
    parts.push(ep.requestBody.description);
    parts.push(...ep.requestBody.fields.map(f => `${f.name} ${f.description}`));
  }
  parts.push(...ep.response.fields.map(f => `${f.name} ${f.description}`));
  if (ep.notes) parts.push(...ep.notes);
  return parts.join(' ').toLowerCase();
}

function buildModelSearchableText(model: ModelDoc): string {
  const parts: string[] = [
    model.name,
    model.description,
    ...model.fields.map(f => `${f.name} ${f.type} ${f.description}`),
  ];
  if (model.relatedModels) parts.push(...model.relatedModels);
  return parts.join(' ').toLowerCase();
}

function extractSectionText(sections: GuideSection[]): string[] {
  const parts: string[] = [];
  for (const s of sections) {
    parts.push(s.heading, s.content);
    if (s.subsections) parts.push(...extractSectionText(s.subsections));
  }
  return parts;
}

function buildGuideSearchableText(guide: GuideDoc): string {
  const parts: string[] = [
    guide.id,
    guide.category,
    guide.title,
    guide.summary,
    ...extractSectionText(guide.sections),
  ];
  if (guide.codeExamples) {
    parts.push(...guide.codeExamples.map(e => `${e.title} ${e.language} ${e.code}`));
  }
  if (guide.relatedEndpoints) parts.push(...guide.relatedEndpoints);
  if (guide.relatedModels) parts.push(...guide.relatedModels);
  if (guide.relatedGuides) parts.push(...guide.relatedGuides);
  return parts.join(' ').toLowerCase();
}

function buildBridgeMethodSearchableText(method: BridgeMethod): string {
  const parts: string[] = [
    method.name,
    method.description,
    ...method.params.map(p => `${p.name} ${p.description}`),
  ];
  if (method.notes) parts.push(...method.notes);
  return parts.join(' ').toLowerCase();
}

function buildBridgeEventSearchableText(event: BridgeEvent): string {
  const parts: string[] = [event.name, event.description];
  if (event.dataFields) parts.push(...event.dataFields.map(f => `${f.name} ${f.description}`));
  return parts.join(' ').toLowerCase();
}

function buildComponentSearchableText(comp: ComponentDoc): string {
  const parts: string[] = [
    comp.name,
    comp.category,
    comp.description,
    ...comp.props.map(p => `${p.name} ${p.type} ${p.description}`),
  ];
  if (comp.features) parts.push(...comp.features);
  if (comp.notes) parts.push(...comp.notes);
  return parts.join(' ').toLowerCase();
}

function scoreText(text: string, terms: string[]): number {
  let score = 0;
  for (const term of terms) {
    let idx = 0;
    while ((idx = text.indexOf(term, idx)) !== -1) {
      score++;
      idx += term.length;
    }
  }
  return score;
}

export function searchDocs(
  query: string,
  endpoints: EndpointDoc[],
  models: ModelDoc[],
  guides: GuideDoc[] = [],
  bridgeApi?: BridgeApiDoc,
  uiComponents: ComponentDoc[] = [],
  maxResults: number = 10,
): SearchResult[] {
  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .filter(t => t.length > 0);

  if (terms.length === 0) return [];

  const results: SearchResult[] = [];

  for (const ep of endpoints) {
    const text = buildEndpointSearchableText(ep);
    const score = scoreText(text, terms);
    if (score > 0) {
      results.push({
        type: 'endpoint',
        score,
        title: `${ep.method} ${ep.path}`,
        description: ep.summary,
        endpoint: ep,
      });
    }
  }

  for (const model of models) {
    const text = buildModelSearchableText(model);
    const score = scoreText(text, terms);
    if (score > 0) {
      results.push({
        type: 'model',
        score,
        title: model.name,
        description: model.description,
        model,
      });
    }
  }

  for (const guide of guides) {
    const text = buildGuideSearchableText(guide);
    const score = scoreText(text, terms);
    if (score > 0) {
      results.push({
        type: 'guide',
        score,
        title: guide.title,
        description: guide.summary,
        guide,
      });
    }
  }

  if (bridgeApi) {
    const allMethods = [
      ...bridgeApi.coreMethods,
      ...bridgeApi.objects.flatMap(o => o.methods),
      ...bridgeApi.storageApi.flatMap(o => o.methods),
    ];
    for (const method of allMethods) {
      const text = buildBridgeMethodSearchableText(method);
      const score = scoreText(text, terms);
      if (score > 0) {
        results.push({
          type: 'bridge-method',
          score,
          title: method.name,
          description: method.description,
          bridgeMethod: method,
        });
      }
    }

    for (const event of bridgeApi.events) {
      const text = buildBridgeEventSearchableText(event);
      const score = scoreText(text, terms);
      if (score > 0) {
        results.push({
          type: 'bridge-event',
          score,
          title: event.name,
          description: event.description,
          bridgeEvent: event,
        });
      }
    }
  }

  for (const comp of uiComponents) {
    const text = buildComponentSearchableText(comp);
    const score = scoreText(text, terms);
    if (score > 0) {
      results.push({
        type: 'component',
        score,
        title: comp.name,
        description: comp.description,
        component: comp,
      });
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, maxResults);
}
