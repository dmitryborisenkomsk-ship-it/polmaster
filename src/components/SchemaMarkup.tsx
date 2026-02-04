import { useEffect, useId } from 'react';

interface SchemaMarkupProps {
  /** Один объект схемы или массив объектов для @graph */
  data: object | object[];
}

/**
 * Рендерит JSON-LD разметку в <head> для SEO.
 * При размонтировании скрипт удаляется (важно для SPA при смене страницы).
 */
const SchemaMarkup = ({ data }: SchemaMarkupProps) => {
  const id = useId();
  const scriptId = `schema-ld-${id.replace(/:/g, '')}`;

  useEffect(() => {
    const payload =
      Array.isArray(data) ? { '@context': 'https://schema.org', '@graph': data } : data;
    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(payload);
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [data, scriptId]);

  return null;
};

export default SchemaMarkup;
