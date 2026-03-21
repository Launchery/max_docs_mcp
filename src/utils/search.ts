import type { EndpointDoc, ModelDoc } from '../data/types.js';

export interface SearchResult {
  type: 'endpoint' | 'model';
  score: number;
  title: string;
  description: string;
  endpoint?: EndpointDoc;
  model?: ModelDoc;
}

function buildSearchableText(ep: EndpointDoc): string {
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
  maxResults: number = 10,
): SearchResult[] {
  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .filter(t => t.length > 0);

  if (terms.length === 0) return [];

  const results: SearchResult[] = [];

  for (const ep of endpoints) {
    const text = buildSearchableText(ep);
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

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, maxResults);
}
