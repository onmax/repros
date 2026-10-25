import { defu } from 'defu';
export const config = defu({ port: 8080 }, { port: 3000, host: 'localhost' });

