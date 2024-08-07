'use server';

import * as fs from 'fs';

import { ConfigType } from 'vitnode-shared';

import { configPath, getConfigFile } from '../../../../../../../helpers/config';

export const mutationApi = async (variables: ConfigType['editor']) => {
  const config = await getConfigFile();
  const newData: ConfigType = {
    ...config,
    editor: variables,
  };

  fs.writeFileSync(configPath, JSON.stringify(newData, null, 2), 'utf8');
};
