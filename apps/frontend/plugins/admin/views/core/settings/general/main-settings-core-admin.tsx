'use client';

import { useTranslations } from 'next-intl';
import {
  Form,
  FormField,
  FormFieldRender,
  FormWrapper,
} from 'vitnode-frontend/components/ui/form';
import { Input } from 'vitnode-frontend/components/ui/input';
import { Button } from 'vitnode-frontend/components/ui/button';
import { TextLanguageInput } from 'vitnode-frontend/components/ui/text-language-input';

import { useSettingsCoreAdmin } from './hooks/use-settings-core-admin';
import { Core_Main_Settings__ShowQuery } from '@/graphql/hooks';

export const GeneralSettingsCoreAdmin = (
  props: Core_Main_Settings__ShowQuery,
) => {
  const t = useTranslations('admin.core.settings.main');
  const tCore = useTranslations('core');
  const { form, onSubmit } = useSettingsCoreAdmin(props);

  return (
    <Form {...form}>
      <FormWrapper onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormFieldRender label={t('name.label')}>
              <Input {...field} />
            </FormFieldRender>
          )}
        />

        <FormField
          control={form.control}
          name="short_name"
          render={({ field }) => (
            <FormFieldRender label={t('short_name.label')}>
              <Input {...field} />
            </FormFieldRender>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormFieldRender label={t('description.label')} optional>
              <TextLanguageInput {...field} />
            </FormFieldRender>
          )}
        />

        <FormField
          control={form.control}
          name="copyright"
          render={({ field }) => (
            <FormFieldRender label={t('copyright.label')}>
              <TextLanguageInput {...field} />
            </FormFieldRender>
          )}
        />

        <Button
          type="submit"
          disabled={!form.formState.isValid}
          loading={form.formState.isSubmitting}
        >
          {tCore('save')}
        </Button>
      </FormWrapper>
    </Form>
  );
};
