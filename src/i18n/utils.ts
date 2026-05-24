import { ui, defaultLang, type Lang, type UIKey } from './ui';

export function getLangFromUrl(url: URL): Lang {
  const [, segment] = url.pathname.split('/');
  if (segment === 'en' || segment === 'es') return segment;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

export function localizedPath(lang: Lang, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === defaultLang) return clean === '/' ? '/' : clean;
  return clean === '/' ? `/${lang}/` : `/${lang}${clean}`;
}

export function switchLangPath(currentUrl: URL, targetLang: Lang): string {
  const parts = currentUrl.pathname.split('/').filter(Boolean);
  if (parts[0] === 'en' || parts[0] === 'es') parts.shift();
  const rest = parts.join('/');
  if (targetLang === defaultLang) return rest ? `/${rest}` : '/';
  return rest ? `/${targetLang}/${rest}` : `/${targetLang}/`;
}
