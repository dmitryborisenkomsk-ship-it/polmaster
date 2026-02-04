import * as React from 'react';
import { Link } from 'react-router-dom';
import SchemaMarkup from '@/components/SchemaMarkup';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { BASE_URL } from '@/data/organization';

export interface BreadcrumbItemType {
  label: string;
  href?: string;
}

interface PageBreadcrumbsProps {
  /** Последовательность пунктов; у последнего href нет (текущая страница). */
  items: BreadcrumbItemType[];
  /** Путь текущей страницы для схемы (например "/catalog"). */
  currentPath: string;
  /** Дополнительный класс для обёртки. */
  className?: string;
}

/**
 * Хлебные крошки с микроразметкой BreadcrumbList (schema.org).
 */
const PageBreadcrumbs = ({ items, currentPath, className }: PageBreadcrumbsProps) => {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem' as const,
      position: index + 1,
      name: item.label,
      item: index < items.length - 1 && item.href != null
        ? `${BASE_URL}${item.href}`
        : `${BASE_URL}${currentPath}`,
    })),
  };

  return (
    <div className={className}>
      <SchemaMarkup data={breadcrumbSchema} />
      <Breadcrumb>
        <BreadcrumbList>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {item.href != null ? (
                  <BreadcrumbLink asChild>
                    <Link to={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default PageBreadcrumbs;
