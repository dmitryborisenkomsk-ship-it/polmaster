import { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { categories, brands, wearClasses, thicknesses, ProductCategory, WearClass } from '@/data/products';

export interface FilterState {
  categories: ProductCategory[];
  brands: string[];
  wearClasses: WearClass[];
  waterResistant: boolean | null;
  thicknesses: number[];
  priceRange: [number, number];
  inStock: boolean | null;
}

interface ProductFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onReset: () => void;
}

const ProductFilters = ({ filters, onFiltersChange, onReset }: ProductFiltersProps) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    category: true,
    brand: true,
    wearClass: true,
    waterResistant: true,
    thickness: true,
    price: true,
    stock: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleCategory = (category: ProductCategory) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const toggleBrand = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    onFiltersChange({ ...filters, brands: newBrands });
  };

  const toggleWearClass = (wearClass: WearClass) => {
    const newWearClasses = filters.wearClasses.includes(wearClass)
      ? filters.wearClasses.filter(w => w !== wearClass)
      : [...filters.wearClasses, wearClass];
    onFiltersChange({ ...filters, wearClasses: newWearClasses });
  };

  const toggleThickness = (thickness: number) => {
    const newThicknesses = filters.thicknesses.includes(thickness)
      ? filters.thicknesses.filter(t => t !== thickness)
      : [...filters.thicknesses, thickness];
    onFiltersChange({ ...filters, thicknesses: newThicknesses });
  };

  const FilterSection = ({ 
    title, 
    sectionKey, 
    children 
  }: { 
    title: string; 
    sectionKey: string; 
    children: React.ReactNode;
  }) => (
    <div className="border-b border-border pb-4">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
      >
        {title}
        {expandedSections[sectionKey] ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>
      {expandedSections[sectionKey] && (
        <div className="mt-2 space-y-2">
          {children}
        </div>
      )}
    </div>
  );

  const hasActiveFilters = 
    filters.categories.length > 0 ||
    filters.brands.length > 0 ||
    filters.wearClasses.length > 0 ||
    filters.waterResistant !== null ||
    filters.thicknesses.length > 0 ||
    filters.priceRange[0] > 500 ||
    filters.priceRange[1] < 6000 ||
    filters.inStock !== null;

  return (
    <div className="bg-card rounded-xl p-5 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Фильтры</h3>
        </div>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onReset} className="text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4 mr-1" />
            Сбросить
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {/* Тип покрытия */}
        <FilterSection title="Тип покрытия" sectionKey="category">
          {categories.map(category => (
            <label key={category} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={filters.categories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <span className="text-sm text-muted-foreground">{category}</span>
            </label>
          ))}
        </FilterSection>

        {/* Бренд */}
        <FilterSection title="Бренд" sectionKey="brand">
          {brands.map(brand => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={filters.brands.includes(brand)}
                onCheckedChange={() => toggleBrand(brand)}
              />
              <span className="text-sm text-muted-foreground">{brand}</span>
            </label>
          ))}
        </FilterSection>

        {/* Класс износостойкости */}
        <FilterSection title="Класс износостойкости" sectionKey="wearClass">
          <div className="grid grid-cols-4 gap-2">
            {wearClasses.map(wearClass => (
              <label key={wearClass} className="flex items-center gap-1.5 cursor-pointer">
                <Checkbox
                  checked={filters.wearClasses.includes(wearClass)}
                  onCheckedChange={() => toggleWearClass(wearClass)}
                />
                <span className="text-sm text-muted-foreground">{wearClass}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Влагостойкость */}
        <FilterSection title="Влагостойкость" sectionKey="waterResistant">
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={filters.waterResistant === true}
                onCheckedChange={() => onFiltersChange({ 
                  ...filters, 
                  waterResistant: filters.waterResistant === true ? null : true 
                })}
              />
              <span className="text-sm text-muted-foreground">Влагостойкий</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={filters.waterResistant === false}
                onCheckedChange={() => onFiltersChange({ 
                  ...filters, 
                  waterResistant: filters.waterResistant === false ? null : false 
                })}
              />
              <span className="text-sm text-muted-foreground">Не влагостойкий</span>
            </label>
          </div>
        </FilterSection>

        {/* Толщина */}
        <FilterSection title="Толщина (мм)" sectionKey="thickness">
          <div className="grid grid-cols-4 gap-2">
            {thicknesses.map(thickness => (
              <label key={thickness} className="flex items-center gap-1.5 cursor-pointer">
                <Checkbox
                  checked={filters.thicknesses.includes(thickness)}
                  onCheckedChange={() => toggleThickness(thickness)}
                />
                <span className="text-sm text-muted-foreground">{thickness}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Цена */}
        <FilterSection title="Цена (₽/м²)" sectionKey="price">
          <div className="px-2">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => onFiltersChange({ 
                ...filters, 
                priceRange: value as [number, number] 
              })}
              min={500}
              max={6000}
              step={100}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{filters.priceRange[0].toLocaleString('ru-RU')} ₽</span>
              <span>{filters.priceRange[1].toLocaleString('ru-RU')} ₽</span>
            </div>
          </div>
        </FilterSection>

        {/* Наличие */}
        <FilterSection title="Наличие" sectionKey="stock">
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={filters.inStock === true}
                onCheckedChange={() => onFiltersChange({ 
                  ...filters, 
                  inStock: filters.inStock === true ? null : true 
                })}
              />
              <span className="text-sm text-muted-foreground">В наличии</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={filters.inStock === false}
                onCheckedChange={() => onFiltersChange({ 
                  ...filters, 
                  inStock: filters.inStock === false ? null : false 
                })}
              />
              <span className="text-sm text-muted-foreground">Под заказ</span>
            </label>
          </div>
        </FilterSection>
      </div>
    </div>
  );
};

export default ProductFilters;
