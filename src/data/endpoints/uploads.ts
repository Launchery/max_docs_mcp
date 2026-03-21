import type { EndpointDoc } from '../types.js';

export const uploadsEndpoints: EndpointDoc[] = [
  {
    method: 'POST',
    path: '/uploads',
    group: 'uploads',
    summary: 'Загрузить файл',
    description: 'Загружает файл на сервер MAX. Поддерживает multipart и resumable загрузку. Максимальный размер: 4 ГБ. Возвращает URL и токен, которые можно использовать в сообщениях.',
    parameters: [
      { name: 'type', location: 'query', type: 'string', required: true, description: 'Тип загружаемого файла', enumValues: ['image', 'video', 'audio', 'file'] },
    ],
    requestBody: {
      description: 'Файл в формате multipart/form-data',
      fields: [
        { name: 'data', type: 'binary', required: true, nullable: false, description: 'Содержимое файла' },
      ],
    },
    response: {
      description: 'Результат загрузки',
      fields: [
        { name: 'url', type: 'string', required: true, nullable: false, description: 'URL загруженного файла' },
        { name: 'token', type: 'string', required: true, nullable: false, description: 'Токен для использования файла в сообщениях' },
      ],
    },
    example: {
      curl: 'curl -X POST -H "Authorization: {access_token}" -F "data=@photo.jpg" "https://platform-api.max.ru/uploads?type=image"',
    },
    notes: [
      'Максимальный размер файла: 4 ГБ',
      'Поддерживаемые форматы image: JPG, PNG, GIF, TIFF, BMP, HEIC',
      'Поддерживаемые форматы video: MP4, MOV, MKV, WEBM, MATROSKA',
      'Поддерживаемые форматы audio: MP3, WAV, M4A',
      'Тип file: любой формат',
      'Поддерживает multipart и resumable загрузку',
    ],
  },
];
