import { createTinaSearch } from '@tinacms/search';
import database from '../../../tina/__generated__/database';
import config from '../../../tina/config';

// This is a temporary workaround to remove the search property from the config
// to avoid a circular dependency issue.
const { search, ...rest } = config;

export const { GET, POST } = createTinaSearch({
  config: rest,
  database,
  isLocal: process.env.TINA_PUBLIC_IS_LOCAL === 'true',
});
