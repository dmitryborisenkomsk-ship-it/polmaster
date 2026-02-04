import { useState, useMemo } from 'react';
import { LayoutGrid, List, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/catalog/ProductCard';
import ProductFilters, { FilterState } from '@/components/catalog/ProductFilters';
import PageBreadcrumbs from '@/components/PageBreadcrumbs';
import SchemaMarkup from '@/components/SchemaMarkup';
import { products, Product } from '@/data/products';
import { usePageMeta } from '@/hooks/usePageMeta';
import { BASE_URL } from '@/data/organization';

const initialFilters: FilterState = {
  categories: [],
  brands: [],
  wearClasses: [],
  waterResistant: null,
  thicknesses: [],
  priceRange: [500, 6000],
  inStock: null,
};

const Catalog = () => {
  usePageMeta(
    'Каталог напольных покрытий',
    'Ламинат, паркетная доска, виниловый пол, кварц-винил, инженерная доска, пробка. Фильтры по бренду, цене, классу износостойкости. ПолМастер, Москва.'
  );
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product: Product) => {
      // Категория
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false;
      }
      // Бренд
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
        return false;
      }
      // Класс износостойкости
      if (filters.wearClasses.length > 0 && !filters.wearClasses.includes(product.wearClass)) {
        return false;
      }
      // Влагостойкость
      if (filters.waterResistant !== null && product.waterResistant !== filters.waterResistant) {
        return false;
      }
      // Толщина
      if (filters.thicknesses.length > 0 && !filters.thicknesses.includes(product.thickness)) {
        return false;
      }
      // Цена
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }
      // Наличие
      if (filters.inStock !== null && product.inStock !== filters.inStock) {
        return false;
      }
      return true;
    });
  }, [filters]);

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.categories.length > 0) count++;
    if (filters.brands.length > 0) count++;
    if (filters.wearClasses.length > 0) count++;
    if (filters.waterResistant !== null) count++;
    if (filters.thicknesses.length > 0) count++;
    if (filters.priceRange[0] > 500 || filters.priceRange[1] < 6000) count++;
    if (filters.inStock !== null) count++;
    return count;
  }, [filters]);

  const catalogSchema = useMemo(
    () => [
      {
        '@type': 'CollectionPage',
        url: `${BASE_URL}/catalog`,
        name: 'Каталог напольных покрытий',
        description:
          'Ламинат, паркетная доска, виниловый пол, кварц-винил, инженерная доска, пробка. Фильтры по бренду и цене.',
        publisher: { '@id': `${BASE_URL}/#organization` },
      },
      {
        '@type': 'ItemList',
        itemListElement: products.slice(0, 8).map((product, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${BASE_URL}/catalog#${product.id}`,
          name: product.name,
        })),
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-background">
      <SchemaMarkup data={catalogSchema} />
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container-custom">
          {/* Breadcrumb & Title */}
          <div className="mb-8">
            <PageBreadcrumbs
              items={[{ label: 'Главная', href: '/' }, { label: 'Каталог' }]}
              currentPath="/catalog"
              className="mb-4"
            />
            <h1 className="heading-lg">Каталог напольных покрытий</h1>
            <p className="text-body mt-2">
              Найдено {filteredProducts.length} {getProductWord(filteredProducts.length)}
            </p>
          </div>

          <div className="flex gap-8">
            {/* Desktop Filters Sidebar */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-28">
                <ProductFilters 
                  filters={filters} 
                  onFiltersChange={setFilters} 
                  onReset={resetFilters}
                />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Mobile Filter Button */}
              <div className="lg:hidden mb-4">
                <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <SlidersHorizontal className="w-4 h-4 mr-2" />
                      Фильтры
                      {activeFiltersCount > 0 && (
                        <span className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                          {activeFiltersCount}
                        </span>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-full sm:w-80 p-0 overflow-y-auto">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="font-semibold text-lg">Фильтры</h2>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => setIsMobileFiltersOpen(false)}
                        >
                          <X className="w-5 h-5" />
                        </Button>
                      </div>
                      <ProductFilters 
                        filters={filters} 
                        onFiltersChange={setFilters} 
                        onReset={resetFilters}
                      />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-lg text-muted-foreground mb-4">
                    По вашим фильтрам товары не найдены
                  </p>
                  <Button onClick={resetFilters}>
                    Сбросить фильтры
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// Helper function for Russian word declension
function getProductWord(count: number): string {
  const lastTwo = count % 100;
  const lastOne = count % 10;
  
  if (lastTwo >= 11 && lastTwo <= 19) {
    return 'товаров';
  }
  
  if (lastOne === 1) {
    return 'товар';
  }
  
  if (lastOne >= 2 && lastOne <= 4) {
    return 'товара';
  }
  
  return 'товаров';
}

export default Catalog;
