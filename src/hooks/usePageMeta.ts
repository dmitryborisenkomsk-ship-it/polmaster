import { useEffect } from 'react';

const SITE_NAME = 'ПолМастер';

/**
 * Устанавливает уникальные title и meta description для страницы (SEO).
 */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

    let metaEl = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) {
      if (metaEl) {
        metaEl.setAttribute('content', description);
      } else {
        metaEl = document.createElement('meta');
        metaEl.name = 'description';
        metaEl.content = description;
        document.head.appendChild(metaEl);
      }
    }
  }, [title, description]);
}
