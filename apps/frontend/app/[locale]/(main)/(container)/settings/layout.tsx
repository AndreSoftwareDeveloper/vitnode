import * as React from 'react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getConfigFile } from 'vitnode-frontend/helpers/config';
import { LayoutSettingsView } from 'vitnode-frontend/theme-tsx/settings/layout-settings-view';

interface Props {
  children: React.ReactNode;
}

export async function generateMetadata(): Promise<Metadata> {
  const config = await getConfigFile();
  const t = await getTranslations('core.settings');

  return {
    title: {
      default: t('title'),
      template: `%s - ${t('title')} - ${config.settings.general.site_name}`,
    },
    robots: 'noindex, nofollow',
  };
}

export default function Layout({ children }: Props) {
  return <LayoutSettingsView>{children}</LayoutSettingsView>;
}
