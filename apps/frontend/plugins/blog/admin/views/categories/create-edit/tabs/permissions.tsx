import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';
import { FormField } from 'vitnode-frontend/components/ui/form';
import { PermissionsTable } from 'vitnode-frontend/components/ui/permissions-table';

export const PermissionsTabCreateEditCategoryBlogAdmin = () => {
  const t = useTranslations('blog.admin.categories');
  const form = useFormContext();

  return (
    <>
      <FormField
        control={form.control}
        name="permissions"
        render={({ field }) => {
          return (
            <PermissionsTable
              permissions={[
                {
                  id: 'read',
                  title: 'Read',
                },
                {
                  id: 'create',
                  title: 'Create',
                  disableForGuest: true,
                },
                {
                  id: 'reply',
                  title: 'Reply',
                  disableForGuest: true,
                },
                {
                  id: 'download_files',
                  title: 'Download Files',
                },
              ]}
              field={field}
            />
          );
        }}
      />
    </>
  );
};
