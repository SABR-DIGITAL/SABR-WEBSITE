import { useEffect } from 'react';

const SITE_URL = 'https://sabrdigital.co.uk/ai-optimisation';

interface SeoArgs {
  title: string;
  description: string;
  path: string;
}

// Mirrors the web design app's useSeoMeta (title, description, canonical, OG)
// but scoped to the /ai-optimisation basename.
export const useAIOSeo = ({ title, description, path }: SeoArgs) => {
  useEffect(() => {
    document.title = title;
    const url = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;

    const setMeta = (selector: string, attr: string, name: string, content: string) => {
      let tag = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', url);

    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  }, [title, description, path]);
};
