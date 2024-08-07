import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../../../../../components/ui/form';
import { TextLanguageInput } from '../../../../../../../components/ui/text-language-input';
import { Separator } from '../../../../../../../components/ui/separator';
import { IconInput } from '../../../../../../../components/icon/input/icon-input';
import { ColorInput } from '../../../../../../../components/ui/color-input';

export const MainContentCreateEditFormGroupsMembersAdmin = () => {
  const t = useTranslations('admin.members.groups.create_edit');
  const form = useFormContext();

  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('name')}</FormLabel>
            <FormControl>
              <TextLanguageInput {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Separator />

      <FormField
        control={form.control}
        name="icon"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Icon</FormLabel>
            <FormControl>
              <IconInput {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="color"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Color</FormLabel>
            <FormControl>
              <ColorInput {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
