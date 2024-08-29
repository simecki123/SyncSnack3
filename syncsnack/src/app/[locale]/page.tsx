import {useTranslations} from 'next-intl';
import {Link} from '@/routing';
import Counter from '../components/Counter';
 
export default function RootPage() {
  const t = useTranslations('HomePage');
  return (
    <div>
      <h1>{t('title')}</h1>
      <Link href="/about">{t('about')}</Link>
      <Counter></Counter>
    </div>
  );
}