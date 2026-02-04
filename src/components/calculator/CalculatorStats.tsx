import { Package, Ruler, Percent, Grid3X3 } from 'lucide-react';

export interface CalculatorStatsProps {
  roomWidth: number;
  roomLength: number;
  boardWidth: number;
  boardLength: number;
  layoutType: 'straight' | 'offset';
}

const CalculatorStats = ({
  roomWidth,
  roomLength,
  boardWidth,
  boardLength,
  layoutType,
}: CalculatorStatsProps) => {
  const roomArea = (roomWidth * roomLength) / 10000;
  const boardArea = (boardWidth * boardLength) / 10000;
  const wastePercentage = layoutType === 'offset' ? 12 : 8;
  const boardsNeeded = Math.ceil(
    (roomArea / boardArea) * (1 + wastePercentage / 100)
  );
  const boardsPerPack = 8;
  const packsNeeded = Math.ceil(boardsNeeded / boardsPerPack);
  const actualCoverage = boardsNeeded * boardArea;
  const waste = actualCoverage - roomArea;

  const stats = [
    {
      icon: Ruler,
      label: 'Площадь комнаты',
      value: `${roomArea.toFixed(2)} м²`,
      color: 'text-primary',
    },
    {
      icon: Grid3X3,
      label: 'Досок необходимо',
      value: `${boardsNeeded} шт`,
      color: 'text-accent',
    },
    {
      icon: Package,
      label: 'Упаковок',
      value: `${packsNeeded} уп.`,
      sublabel: `(по ${boardsPerPack} шт)`,
      color: 'text-primary',
    },
    {
      icon: Percent,
      label: 'Запас на отходы',
      value: `${wastePercentage}%`,
      sublabel: `≈ ${waste.toFixed(2)} м²`,
      color: 'text-muted-foreground',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="card-elevated p-4 rounded-xl border border-border"
        >
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg bg-primary/10 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="font-semibold text-foreground">{stat.value}</p>
              {stat.sublabel && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  {stat.sublabel}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CalculatorStats;
