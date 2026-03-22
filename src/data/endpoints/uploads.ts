import type { EndpointDoc } from '../types.js';

export const uploadsEndpoints: EndpointDoc[] = [
  {
    method: 'POST',
    path: '/uploads',
    group: 'uploads',
    summary: 'Загрузить файл',
    description: 'Инициализирует загрузку файла и возвращает URL для последующей передачи контента. Поддерживаются multipart upload и resumable upload. Для некоторых типов медиа поле `token` может присутствовать уже на этом шаге.',
    parameters: [
      { name: 'type', location: 'query', type: 'string', required: true, description: 'Тип загружаемого файла', enumValues: ['image', 'video', 'audio', 'file'] },
    ],
    response: {
      description: 'Данные для следующего шага загрузки',
      fields: [
        { name: 'url', type: 'string', required: true, nullable: false, description: 'URL, по которому нужно загрузить файл' },
        { name: 'token', type: 'string', required: false, nullable: true, description: 'Токен вложения, если он уже возвращён на этапе инициализации загрузки' },
      ],
    },
    example: {
      curl: 'curl -X POST -H "Authorization: {access_token}" "https://platform-api.max.ru/uploads?type=file"',
    },
    notes: [
      'Максимальный размер файла: 4 ГБ.',
      'Значение `type=photo` больше не поддерживается, используйте `type=image`.',
      'Multipart upload использует `Content-Type: multipart/form-data`: можно загрузить только один файл, а прерванную загрузку нельзя продолжить.',
      'Resumable upload используется, если `Content-Type` не равен `multipart/form-data`, и позволяет загружать файл по частям.',
      'После успешной загрузки видео, аудио, изображения или файла нужно использовать полученный `token` или payload при отправке через `POST /messages`.',
      'Сразу после загрузки файл может быть ещё не готов к отправке: API может вернуть ошибку `attachment.not.ready`.',
      'Поддерживаемые форматы image: JPG, PNG, GIF, TIFF, BMP, HEIC',
      'Поддерживаемые форматы video: MP4, MOV, MKV, WEBM, MATROSKA',
      'Поддерживаемые форматы audio: MP3, WAV, M4A',
      'Тип file: любой формат',
    ],
  },
];
