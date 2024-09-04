import { useTranslations } from "next-intl";

export function formatDate(dateString: string): string {

    const t = useTranslations('OrdersPage');
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
  
    if (diff < oneDay) return `${t('Today')}`;
    if (diff < 2 * oneDay) return `${t('Yesterday')}`;
    if (diff < 7 * oneDay) return `${t('A-few-days-ago')}`;
    if (diff < 14 * oneDay) return `${t('Last-week')}`;
    if (diff < 30 * oneDay) return `${t('Last-month')}`;
    if (diff < 90 * oneDay) return `${t('More-than-a-month-ago')}`;
    if (diff < 140 * oneDay) return `${t('More-than-3-months-ago')}`;
    if (diff < 365 * oneDay) return `${t('More-than-6-months-ago')}`;
    return `${t('More-than-a-year-ago')}`;
  }