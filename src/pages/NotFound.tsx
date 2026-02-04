import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { usePageMeta } from "@/hooks/usePageMeta";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";

const NotFound = () => {
  const location = useLocation();
  usePageMeta('Страница не найдена', 'Запрашиваемая страница не существует. Вернитесь на главную или воспользуйтесь меню.');

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-8">
      <PageBreadcrumbs
        items={[{ label: 'Главная', href: '/' }, { label: 'Страница не найдена' }]}
        currentPath={location.pathname}
        className="absolute left-8 top-8"
      />
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Страница не найдена</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          На главную
        </a>
      </div>
    </div>
  );
};

export default NotFound;
