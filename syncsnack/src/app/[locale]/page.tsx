import {useTranslations} from 'next-intl';
import {Link} from '@/routing';
import Counter from '../components/Counter';
 
export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <h1>{t('title')}</h1>
  );
}