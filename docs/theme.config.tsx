import React from 'react';
import { DocsThemeConfig } from 'nextra-theme-docs';

const config: DocsThemeConfig = {
  logo: <span>VitNode</span>,
  footer: {
    text: 'VitNode © 2023'
  },
  project: {
    link: 'https://github.com/aXenDeveloper/vitnode/'
  },
  docsRepositoryBase: 'https://github.com/aXenDeveloper/vitnode/tree/canary/docs',
  useNextSeoProps() {
    return {
      titleTemplate: '%s - VitNode'
    };
  }
};

export default config;
