export {routes as Routes} from './routes';
export const API_BASE_URL = process.env.REACT_APP_API_ENDPOINT;

export const coverImageTypes = {
    mimeTypes:[
      'image/jpeg',
      'image/x-citrix-jpeg',
      'image/pjpeg',
      'image/png',
      'image/x-citrix-png',
      'image/x-png'
    ],
    extensions:[
      '.jpeg',
      '.jpg',
      '.png'
    ]
  }