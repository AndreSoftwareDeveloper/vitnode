import type { ColumnDef } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { DataTable } from '@/components/data-table/data-table';
import { HeaderSortingDataTable } from '@/components/data-table/header';
import { DateFormat } from '@/components/date-format/date-format';
import { Badge } from '@/components/ui/badge';
import type { Core_Themes__Admin__ShowQuery, ShowAdminThemes } from '@/graphql/hooks';

export const ContentTableThemesAdmin = ({
  core_themes__admin__show: { edges, pageInfo }
}: Core_Themes__Admin__ShowQuery) => {
  const t = useTranslations('admin.core.styles.themes');
  const tCore = useTranslations('core');

  const columns: ColumnDef<ShowAdminThemes>[] = useMemo(
    () => [
      {
        header: t('table.name'),
        accessorKey: 'name',
        cell: ({ row }) => {
          const data = row.original;

          return (
            <div className="flex gap-2 items-center">
              <span className="font-semibold">{data.name}</span>
              {data.default && <Badge variant="outline">{tCore('default')}</Badge>}
            </div>
          );
        }
      },
      {
        header: t('table.version'),
        accessorKey: 'version'
      },
      {
        header: val => {
          return <HeaderSortingDataTable {...val}>{t('table.created')}</HeaderSortingDataTable>;
        },
        accessorKey: 'created',
        cell: ({ row }) => {
          const data = row.original;

          return <DateFormat date={data.created} />;
        }
      },
      {
        id: 'actions',
        cell: () => {
          return 'actions';
        }
      }
    ],
    []
  );

  return (
    <DataTable
      data={edges}
      pageInfo={pageInfo}
      defaultPageSize={10}
      columns={columns}
      // searchPlaceholder={t('search_placeholder')}
      defaultSorting={{
        sortBy: 'created',
        sortDirection: 'desc'
      }}
    />
  );
};
