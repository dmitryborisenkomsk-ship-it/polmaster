import { cn } from '@/lib/utils';

export type LayoutType = 'no-offset' | 'offset';

interface FloorLayoutPreviewProps {
  type: LayoutType;
  className?: string;
  /** Цвет «досок» — для визуального отличия по продукту не используется, оставлен на будущее */
  accentColor?: string;
}

/** По отчёту: calc.by — «размеры доски (мм)», «визуальная схема укладки», «со смещением на 1/2 длины». */
const ROWS = 5;
const PLANKS_PER_ROW = 4;
const GAP = 1.5;

const VIEW_WIDTH = 100;
const VIEW_HEIGHT = 58;

/**
 * Визуализация схемы укладки через SVG: доски — <rect>, смещение на 1/2 длины у нечётных рядов.
 */
const FloorLayoutPreview = ({ type, className }: FloorLayoutPreviewProps) => {
  const rowHeight = (VIEW_HEIGHT - (ROWS - 1) * GAP) / ROWS;
  const slotWidth =
    type === 'offset'
      ? VIEW_WIDTH / (PLANKS_PER_ROW + 0.5)
      : VIEW_WIDTH / PLANKS_PER_ROW;
  const plankWidth = slotWidth - GAP;
  const rowStartX = type === 'offset' ? slotWidth / 2 : 0;

  const rects: { x: number; y: number; width: number; height: number }[] = [];

  for (let row = 0; row < ROWS; row++) {
    const y = row * (rowHeight + GAP);
    const offsetX = type === 'offset' && row % 2 === 1 ? rowStartX : 0;

    for (let col = 0; col < PLANKS_PER_ROW; col++) {
      rects.push({
        x: offsetX + col * slotWidth + GAP / 2,
        y: y + GAP / 2,
        width: plankWidth,
        height: rowHeight - GAP,
      });
    }
  }

  return (
    <div
      className={cn('rounded-lg overflow-hidden border border-border bg-muted/30 p-2 w-full', className)}
      aria-label={type === 'offset' ? 'Укладка со смещением на половину длины доски' : 'Укладка прямая, без смещения'}
    >
      <svg
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        className="w-full h-auto block text-primary"
        aria-hidden
        preserveAspectRatio="xMidYMid meet"
      >
        <g fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeOpacity="0.35" strokeWidth="0.6">
          {rects.map((r, i) => (
            <rect key={i} x={r.x} y={r.y} width={r.width} height={r.height} rx="0.8" />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default FloorLayoutPreview;
