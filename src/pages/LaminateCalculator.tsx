import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBreadcrumbs from '@/components/PageBreadcrumbs';
import SchemaMarkup from '@/components/SchemaMarkup';
import { usePageMeta } from '@/hooks/usePageMeta';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BASE_URL } from '@/data/organization';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Layers, Grid2X2, AlignJustify } from 'lucide-react';
import FloorVisualization from '@/components/calculator/FloorVisualization';
import CalculatorStats from '@/components/calculator/CalculatorStats';

const calculatorSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  url: `${BASE_URL}/calculator`,
  name: 'Калькулятор ламината',
  description:
    'Рассчитайте количество ламината для комнаты: размеры комнаты и доски, тип укладки (прямая / со смещением). Визуализация укладки и расчёт упаковок.',
  applicationCategory: 'UtilitiesApplication',
  browserRequirements: 'Требуется JavaScript',
};

const LaminateCalculator = () => {
  usePageMeta(
    'Калькулятор ламината',
    'Рассчитайте количество ламината для комнаты: размеры комнаты и доски, тип укладки (прямая / со смещением). Визуализация укладки и расчёт упаковок.'
  );
  const [roomWidth, setRoomWidth] = useState(400);
  const [roomLength, setRoomLength] = useState(500);
  const [boardWidth, setBoardWidth] = useState(20);
  const [boardLength, setBoardLength] = useState(120);
  const [layoutType, setLayoutType] = useState<'straight' | 'offset'>('offset');

  const handleNumberInput = (
    value: string,
    setter: (val: number) => void,
    min: number = 1
  ) => {
    const num = parseFloat(value);
    if (!isNaN(num) && num >= min) {
      setter(num);
    }
  };

  return (
    <div className="min-h-screen">
      <SchemaMarkup data={calculatorSchema} />
      <Header />

      <main className="pt-24 pb-16">
        <div className="container-custom">
          <PageBreadcrumbs
            items={[{ label: 'Главная', href: '/' }, { label: 'Калькулятор ламината' }]}
            currentPath="/calculator"
            className="mb-6"
          />
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-primary/10">
                <Layers className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="heading-lg mb-2">Калькулятор ламината</h1>
            <p className="text-body max-w-md mx-auto">
              Рассчитайте количество ламината для вашей комнаты с визуализацией укладки
            </p>
          </div>

          <div className="grid lg:grid-cols-[380px,1fr] gap-8">
            <div className="space-y-6">
              <Card className="card-elevated">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Grid2X2 className="w-5 h-5 text-primary" />
                    Размеры комнаты
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="room-width">Ширина (см)</Label>
                    <Input
                      id="room-width"
                      type="number"
                      value={roomWidth}
                      onChange={(e) =>
                        handleNumberInput(e.target.value, setRoomWidth, 50)
                      }
                      min={50}
                      max={2000}
                      className="input-field"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="room-length">Длина (см)</Label>
                    <Input
                      id="room-length"
                      type="number"
                      value={roomLength}
                      onChange={(e) =>
                        handleNumberInput(e.target.value, setRoomLength, 50)
                      }
                      min={50}
                      max={2000}
                      className="input-field"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlignJustify className="w-5 h-5 text-primary" />
                    Размеры доски
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="board-width">Ширина доски (см)</Label>
                    <Input
                      id="board-width"
                      type="number"
                      value={boardWidth}
                      onChange={(e) =>
                        handleNumberInput(e.target.value, setBoardWidth, 5)
                      }
                      min={5}
                      max={50}
                      className="input-field"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="board-length">Длина доски (см)</Label>
                    <Input
                      id="board-length"
                      type="number"
                      value={boardLength}
                      onChange={(e) =>
                        handleNumberInput(e.target.value, setBoardLength, 30)
                      }
                      min={30}
                      max={300}
                      className="input-field"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Тип укладки</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs
                    value={layoutType}
                    onValueChange={(v) =>
                      setLayoutType(v as 'straight' | 'offset')
                    }
                  >
                    <TabsList className="w-full grid grid-cols-2">
                      <TabsTrigger value="straight" className="flex items-center gap-2">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          aria-hidden
                        >
                          <rect x="0" y="0" width="7" height="4" rx="0.5" />
                          <rect x="8" y="0" width="7" height="4" rx="0.5" />
                          <rect x="0" y="6" width="7" height="4" rx="0.5" />
                          <rect x="8" y="6" width="7" height="4" rx="0.5" />
                          <rect x="0" y="12" width="7" height="4" rx="0.5" />
                          <rect x="8" y="12" width="7" height="4" rx="0.5" />
                        </svg>
                        Прямая
                      </TabsTrigger>
                      <TabsTrigger value="offset" className="flex items-center gap-2">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          aria-hidden
                        >
                          <rect x="0" y="0" width="7" height="4" rx="0.5" />
                          <rect x="8" y="0" width="7" height="4" rx="0.5" />
                          <rect x="3" y="6" width="7" height="4" rx="0.5" />
                          <rect x="11" y="6" width="5" height="4" rx="0.5" />
                          <rect x="0" y="12" width="7" height="4" rx="0.5" />
                          <rect x="8" y="12" width="7" height="4" rx="0.5" />
                        </svg>
                        Со смещением
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <p className="text-xs text-muted-foreground mt-3">
                    {layoutType === 'offset'
                      ? 'Каждый ряд смещён на 1/3 длины доски. Больше отходов, но красивее.'
                      : 'Все ряды выровнены. Меньше отходов, проще укладка.'}
                  </p>
                </CardContent>
              </Card>

              <CalculatorStats
                roomWidth={roomWidth}
                roomLength={roomLength}
                boardWidth={boardWidth}
                boardLength={boardLength}
                layoutType={layoutType}
              />
            </div>

            <Card className="card-elevated h-fit">
              <CardHeader>
                <CardTitle className="text-lg">Визуализация укладки</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center pb-8">
                <FloorVisualization
                  roomWidth={roomWidth}
                  roomLength={roomLength}
                  boardWidth={boardWidth}
                  boardLength={boardLength}
                  layoutType={layoutType}
                />
              </CardContent>
            </Card>
          </div>

          <Card className="card-elevated mt-8">
            <CardContent className="py-6">
              <h3 className="font-semibold mb-3 text-foreground">
                Советы по укладке
              </h3>
              <ul className="grid md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Оставляйте зазор 8–10 мм от стен для расширения
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Дайте ламинату акклиматизироваться 48 часов перед укладкой
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Укладывайте по направлению света из окна
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Покупайте на 10–15% больше для запаса
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LaminateCalculator;
