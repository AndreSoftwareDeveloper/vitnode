'use client';

import { useTranslations } from 'next-intl';
import { removeSpecialCharacters } from 'vitnode-shared';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'vitnode-frontend/components/ui/form';
import { Button } from 'vitnode-frontend/components/ui/button';
import { Input } from 'vitnode-frontend/components/ui/input';
import { CardContent, CardFooter } from 'vitnode-frontend/components/ui/card';
import { Checkbox } from 'vitnode-frontend/components/ui/checkbox';
import { Progress } from 'vitnode-frontend/components/ui/progress';

import { useSignUpView } from '@/plugins/core/hooks/sign/up/use-sign-up-view';
import { SuccessFormSignUp } from './success';

export const FormSignUp = () => {
  const t = useTranslations('core');
  const { form, onSubmit } = useSignUpView();

  if (form.formState.isSubmitSuccessful) {
    return <SuccessFormSignUp name={form.watch('name')} />;
  }

  return (
    <Form {...form} disableBeforeUnload>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('sign_up.form.name.label')}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>{t('sign_up.form.name.desc')}</FormDescription>
                {field.value.length > 0 && (
                  <FormDescription>
                    {t.rich('sign_up.form.name.your_id', {
                      id: () => (
                        <span className="font-medium">
                          {removeSpecialCharacters(
                            field.value.trimStart().trimEnd(),
                          )}
                        </span>
                      ),
                    })}
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('sign_up.form.email.label')}</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => {
              const value = field.value;
              const regexArray = [
                /^.{8,}$/, // Min 8 characters
                /[a-z]/, // Min 1 lowercase
                /[A-Z]/, // Min 1 uppercase
                /\d/, // Min 1 digit
                /\W|_/, // Min 1 special character
              ];

              const passRegexPassword = regexArray.reduce((acc, regex) => {
                return acc + Number(regex.test(value));
              }, 0);

              return (
                <FormItem>
                  <FormLabel>{t('sign_up.form.password.label')}</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  {(fieldState.invalid || value.length > 0) && (
                    <div className="mt-1">
                      <div className="mb-2 flex justify-between text-xs font-semibold">
                        <span>{t('week')}</span>
                        <span>{t('strong')}</span>
                      </div>
                      <Progress
                        value={(100 / regexArray.length) * passRegexPassword}
                      />
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>{t('sign_up.form.terms.label')}</FormLabel>
                  <FormDescription>
                    {t('sign_up.form.terms.desc')}
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newsletter"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel optional>
                    {t('sign_up.form.newsletter.label')}
                  </FormLabel>
                  <FormDescription>
                    {t('sign_up.form.newsletter.desc')}
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </CardContent>

        <CardFooter>
          <Button
            type="submit"
            className="w-full"
            disabled={!form.formState.isValid}
            loading={form.formState.isSubmitting}
          >
            {t('sign_up.form.submit')}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};
