import { useTranslations } from 'next-intl';

import { DateFormat } from '@/components/date-format/date-format';
import type { ShowTopicsForums } from '@/graphql/hooks';
import { useTextLang } from '@/hooks/core/use-text-lang';
import { Link } from '@/i18n';

export interface ItemTopicListForumProps
  extends Pick<ShowTopicsForums, 'title' | 'user' | 'id' | 'created'> {}

export const ItemTopicListForum = ({ created, id, title, user }: ItemTopicListForumProps) => {
  const t = useTranslations('forum');
  const { convertNameToLink, convertText } = useTextLang();

  return (
    <div className="px-6 py-4 hover:bg-muted/50 cursor-pointer">
      <div className="flex flex-col">
        <h3 className="font-semibold text-base">
          <Link
            href={`/topic/${convertNameToLink({ id, name: title })}`}
            className="text-foreground no-underline"
          >
            {convertText(title)}
          </Link>
        </h3>
        <span className="text-sm text-muted-foreground">
          {t.rich('by', {
            user: () => <Link href={`/profile/${user.name_seo}`}>{user.name}</Link>,
            date: () => <DateFormat date={created} />
          })}
        </span>
      </div>
    </div>
  );
};