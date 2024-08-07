'use client';

import { RefreshCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '../../../components/ui/alert';
import { CONFIG } from '../../../helpers/config-with-env';
import { useGlobals } from '../../../hooks/use-globals';
import { buttonVariants } from '../../../components/ui/button';

export const RebuildRequiredAdmin = () => {
  const t = useTranslations('admin.rebuild_required');
  const {
    config: { rebuild_required },
  } = useGlobals();

  if (
    (!rebuild_required.langs && !rebuild_required.plugins) ||
    CONFIG.node_development
  ) {
    return null;
  }

  return (
    <Alert className="my-2" variant="destructive">
      <RefreshCcw />

      <AlertTitle>{t('title')}</AlertTitle>
      <AlertDescription>{t('desc')}</AlertDescription>
      <AlertDescription className="my-4">
        <ul>
          {rebuild_required.langs && (
            <li>
              {t.rich('langs', {
                bold: text => <span className="font-bold">{text}</span>,
              })}
            </li>
          )}

          {rebuild_required.plugins && (
            <li>
              {t.rich('plugins', {
                bold: text => <span className="font-bold">{text}</span>,
              })}
            </li>
          )}
        </ul>
      </AlertDescription>

      <div className="mt-2">
        <a
          href="https://vitnode.com/help/rebuild"
          rel="noopener noreferrer"
          target="_blank"
          className={buttonVariants({
            variant: 'outline',
          })}
        >
          {t('submit')}
        </a>
      </div>
    </Alert>
  );
};
