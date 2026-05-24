import type { Lang } from './ui';

const locales: Record<Lang, string> = {
  pt: 'pt-BR',
  en: 'en-US',
  es: 'es-ES',
};

export function formatDate(date: Date, lang: Lang, opts: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }): string {
  return new Intl.DateTimeFormat(locales[lang], opts).format(date);
}

export function formatMonthDay(date: Date, lang: Lang): { day: string; month: string } {
  const day = new Intl.DateTimeFormat(locales[lang], { day: '2-digit' }).format(date);
  const month = new Intl.DateTimeFormat(locales[lang], { month: 'short' }).format(date).replace('.', '').toUpperCase();
  return { day, month };
}

export function pickLocalized<T extends Record<string, unknown>>(
  data: T,
  base: keyof T,
  lang: Lang,
): string {
  if (lang === 'pt') return String(data[base] ?? '');
  const suffix = lang === 'en' ? 'En' : 'Es';
  const localizedKey = `${String(base)}${suffix}` as keyof T;
  return String(data[localizedKey] ?? data[base] ?? '');
}
