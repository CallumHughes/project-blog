import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  experimental: {
    globalNotFound: true,
  },
  outputFileTracingIncludes: {
    '/*': ['./content/**/*'],
  },
  outputFileTracingRoot: __dirname,
};