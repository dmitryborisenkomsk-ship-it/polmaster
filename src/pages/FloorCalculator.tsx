import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calculator, Send, Check, Ruler } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { products } from '@/data/products';
import FloorLayoutPreview, { LayoutType } from '@/components/calculator/FloorLayoutPreview';

const WASTE_NO_OFFSET = 7;
const WASTE_OFFSET = 10;

function formatPrice(value: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

const FloorCalculator = () => {
  const [areaM2, setAreaM2] = useState<string>('20');
  const [layoutType, setLayoutType] = useState<LayoutType>('no-offset');
  const [productId, setProductId] = useState<string>(products[0].id);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);

  const area = useMemo(() => {
    const n = parseFloat(areaM2.replace(',', '.'));
    return Number.isFinite(n) && n > 0 ? n : 0;
  }, [areaM2]);

  const product = useMemo(
    () => products.find((p) => p.id === productId) ?? products[0],
    [productId]
  );

  const wastePercent = layoutType === 'offset' ? WASTE_OFFSET : WASTE_NO_OFFSET;
  const materialM2 = area * (1 + wastePercent / 100);
  const packs = product.packAreaM2 > 0 ? Math.ceil(materialM2 / product.packAreaM2) : 0;
  const packPrice = product.price * product.packAreaM2;
  const totalCost = packs * packPrice;

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setContactLoading(false);
    setContactSubmitted(true);
    setContactName('');
    setContactPhone('');
  };

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) setContactSubmitted(false);
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-secondary to-background">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Calculator className="w-7 h-7 text-primary" />
              </div>
              <h1 className="heading-lg mb-4">Калькулятор укладки пола</h1>
              <p className="text-body">
                Введите площадь комнаты и выберите покрытие — получите примерный расход материалов и стоимость с учётом упаковок.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding pt-0">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
              {/* Форма */}
              <div className="card-elevated p-6 md:p-8 space-y-6">
                <h2 className="heading-md flex items-center gap-2">
                  <Ruler className="w-6 h-6 text-primary" />
                  Параметры расчёта
                </h2>

                <div>
                  <Label htmlFor="area" className="block text-sm font-medium mb-2">
                    Площадь комнаты, м²
                  </Label>
                  <input
                    id="area"
                    type="text"
                    inputMode="decimal"
                    value={areaM2}
                    onChange={(e) => setAreaM2(e.target.value)}
                    placeholder="Например: 20"
                    className="input-field"
                    aria-describedby="area-hint"
                  />
                  <p id="area-hint" className="text-xs text-muted-foreground mt-1">
                    Введите число, например 15 или 22,5
                  </p>
                </div>

                <div>
                  <Label className="block text-sm font-medium mb-3">Вариант укладки</Label>
                  <RadioGroup
                    value={layoutType}
                    onValueChange={(v) => setLayoutType(v as LayoutType)}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <label className="flex items-center gap-3 cursor-pointer rounded-lg border border-border p-4 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-colors">
                      <RadioGroupItem value="no-offset" id="no-offset" />
                      <span className="text-sm font-medium">Без смещения</span>
                      <span className="text-xs text-muted-foreground">(отходы ~{WASTE_NO_OFFSET}%)</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer rounded-lg border border-border p-4 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-colors">
                      <RadioGroupItem value="offset" id="offset" />
                      <span className="text-sm font-medium">Со смещением</span>
                      <span className="text-xs text-muted-foreground">(отходы ~{WASTE_OFFSET}%)</span>
                    </label>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="product" className="block text-sm font-medium mb-2">
                    Напольное покрытие из каталога
                  </Label>
                  <Select value={productId} onValueChange={setProductId}>
                    <SelectTrigger id="product" className="input-field h-12">
                      <SelectValue placeholder="Выберите покрытие" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.name} — {formatPrice(p.price)} ₽/м²
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Результаты + визуализация */}
              <div className="space-y-6">
                <div className="card-elevated p-6 md:p-8">
                  <h2 className="heading-md mb-4">Примерный расчёт</h2>
                  {area > 0 ? (
                    <div className="space-y-3 text-body">
                      <p className="flex justify-between">
                        <span className="text-muted-foreground">Площадь комнаты</span>
                        <span className="font-medium">{area} м²</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-muted-foreground">Отходы</span>
                        <span className="font-medium">{wastePercent}%</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-muted-foreground">Материал с запасом</span>
                        <span className="font-medium">{materialM2.toFixed(2)} м²</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-muted-foreground">Упаковок по {product.packAreaM2} м²</span>
                        <span className="font-medium">{packs} шт.</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-muted-foreground">Цена за упаковку</span>
                        <span className="font-medium">{formatPrice(packPrice)} ₽</span>
                      </p>
                      <p className="flex justify-between text-base font-semibold pt-2 border-t border-border">
                        <span>Итого (материал)</span>
                        <span className="text-primary">{formatPrice(totalCost)} ₽</span>
                      </p>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Введите площадь комнаты для расчёта.</p>
                  )}
                </div>

                <div className="card-elevated p-6 md:p-8">
                  <h2 className="heading-md mb-4">Схема укладки</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Без смещения</p>
                      <FloorLayoutPreview
                        type="no-offset"
                        className={layoutType === 'no-offset' ? 'ring-2 ring-primary' : ''}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Со смещением</p>
                      <FloorLayoutPreview
                        type="offset"
                        className={layoutType === 'offset' ? 'ring-2 ring-primary' : ''}
                      />
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => setIsDialogOpen(true)}
                  className="btn-primary w-full text-base py-4"
                >
                  Получить точный расчёт
                </Button>
              </div>
            </div>

            <p className="text-center text-small mt-8 space-x-4">
              <Link to="/catalog" className="text-primary font-medium hover:underline">
                Подбор покрытий в каталоге
              </Link>
              <Link to="/calculator/laminate" className="text-primary font-medium hover:underline">
                Калькулятор ламината по размерам
              </Link>
            </p>
          </div>
        </section>
      </main>

      <Footer />

      {/* Диалог: форма контактов для точного расчёта */}
      <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Заявка на точный расчёт</DialogTitle>
            <DialogDescription>
              Оставьте контакты — менеджер рассчитает стоимость под ваши размеры и выбранное покрытие и перезвонит.
            </DialogDescription>
          </DialogHeader>
          {contactSubmitted ? (
            <div className="py-6 text-center">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Check className="w-7 h-7 text-green-600" />
              </div>
              <p className="font-medium mb-1">Заявка отправлена</p>
              <p className="text-sm text-muted-foreground mb-4">
                Мы свяжемся с вами в ближайшее время.
              </p>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Закрыть
              </Button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4 pt-2">
              <div>
                <Label htmlFor="calc-name">Ваше имя</Label>
                <input
                  id="calc-name"
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Имя"
                  className="input-field mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="calc-phone">Телефон</Label>
                <input
                  id="calc-phone"
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="+7 (___) ___-__-__"
                  className="input-field mt-1"
                  required
                />
              </div>
              <Button type="submit" disabled={contactLoading} className="btn-primary w-full">
                {contactLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Отправка...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" />
                    Отправить заявку
                  </span>
                )}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FloorCalculator;
