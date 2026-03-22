export interface SchemaField {
  name: string;
  type: string;
  required: boolean;
  nullable: boolean;
  description: string;
  constraints?: string;
  defaultValue?: string;
  enumValues?: string[];
}

export interface EndpointParameter {
  name: string;
  location: 'query' | 'path' | 'header';
  type: string;
  required: boolean;
  description: string;
  constraints?: string;
  defaultValue?: string;
  enumValues?: string[];
}

export interface EndpointDoc {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  group: EndpointGroup;
  summary: string;
  description: string;
  parameters: EndpointParameter[];
  requestBody?: {
    description: string;
    fields: SchemaField[];
  };
  response: {
    description: string;
    fields: SchemaField[];
  };
  example?: {
    curl: string;
    responseJson?: string;
  };
  notes?: string[];
}

export type EndpointGroup =
  | 'bot'
  | 'chats'
  | 'pinned-messages'
  | 'members'
  | 'messages'
  | 'subscriptions'
  | 'uploads'
  | 'callbacks';

export interface ModelDoc {
  name: string;
  description: string;
  fields: SchemaField[];
  relatedModels?: string[];
}

export interface OverviewDoc {
  baseUrl: string;
  authDescription: string;
  rateLimitDescription: string;
  httpStatusCodes: Array<{ code: number; description: string }>;
  generalNotes: string[];
}

// ========== Guide Documentation ==========

export type GuideCategory =
  | 'platform'
  | 'chatbot'
  | 'tutorials'
  | 'sdk'
  | 'mini-apps'
  | 'channels'
  | 'partners'
  | 'legal';

export interface GuideSection {
  heading: string;
  content: string;
  subsections?: GuideSection[];
}

export interface CodeExample {
  language: string;
  title: string;
  code: string;
  description?: string;
}

export interface GuideDoc {
  id: string;
  category: GuideCategory;
  title: string;
  summary: string;
  sections: GuideSection[];
  codeExamples?: CodeExample[];
  relatedGuides?: string[];
  relatedEndpoints?: string[];
  relatedModels?: string[];
}

// ========== MAX Bridge API (Mini-Apps) ==========

export interface BridgeProperty {
  name: string;
  type: string;
  description: string;
  readonly: boolean;
}

export interface BridgeMethodParam {
  name: string;
  type: string;
  required: boolean;
  description: string;
  enumValues?: string[];
}

export interface BridgeMethod {
  name: string;
  description: string;
  params: BridgeMethodParam[];
  returnType: string;
  example?: string;
  notes?: string[];
  availablePlatforms?: string[];
}

export interface BridgeEvent {
  name: string;
  description: string;
  dataFields?: SchemaField[];
}

export interface BridgeErrorCode {
  code: string;
  description: string;
}

export interface BridgeObject {
  name: string;
  description: string;
  properties: BridgeProperty[];
  methods: BridgeMethod[];
}

export interface BridgeApiDoc {
  overview: string;
  scriptUrl: string;
  mainProperties: BridgeProperty[];
  coreMethods: BridgeMethod[];
  objects: BridgeObject[];
  events: BridgeEvent[];
  errorCodes: BridgeErrorCode[];
  storageApi: BridgeObject[];
}

// ========== UI Components ==========

export interface ComponentProp {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: string;
  description: string;
}

export interface ComponentDoc {
  name: string;
  category: string;
  description: string;
  props: ComponentProp[];
  features?: string[];
  example?: string;
  notes?: string[];
}

export interface UILibraryDoc {
  overview: string;
  installInstructions: string;
  components: ComponentDoc[];
  themeDescription: string;
  platformAdaptation: string;
}
