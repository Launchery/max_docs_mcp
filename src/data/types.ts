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
